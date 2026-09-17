/* Petals by Bavi — bouquet sharing helper (runs on the shared bouquet page) */
;(function () {
  'use strict'
  if (window.__petalsShareLoaded) return
  if (!/^\/bouquet\/[^/?#]+/.test(location.pathname)) return
  window.__petalsShareLoaded = true

  var SITE = 'Petals by Bavi'
  var INSTA_PROFILE = 'https://www.instagram.com/petals_by_bavi/'
  var FILE_NAME = 'petals-by-bavi-bouquet.png'
  var PANEL_ID = 'petals-share-panel'
  var TOAST_ID = 'petals-share-toast'
  var FLOWERS_CDN = 'https://assets.pauwee.com/'

  function toProxy(src) {
    if (src && src.indexOf(FLOWERS_CDN) === 0) return '/__petals/img/' + src.slice(FLOWERS_CDN.length)
    return src
  }

  function toast(msg, ms) {
    var old = document.getElementById(TOAST_ID)
    if (old) old.parentNode && old.parentNode.removeChild(old)
    var t = document.createElement('div')
    t.id = TOAST_ID
    t.textContent = msg
    document.body.appendChild(t)
    setTimeout(function () {
      t.className = 'petals-share-toast-hide'
      setTimeout(function () {
        if (t.parentNode) t.parentNode.removeChild(t)
      }, 300)
    }, ms || 2600)
  }

  function copyText(text) {
    if (!text) return Promise.reject(new Error('empty'))
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text)
      })
    }
    return legacyCopy(text)
  }

  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        var ok = document.execCommand('copy')
        document.body.removeChild(ta)
        ok ? resolve() : reject(new Error('copy failed'))
      } catch (e) {
        reject(e)
      }
    })
  }

  function findCard() {
    var nodes = document.querySelectorAll('div')
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i]
      if (!n.children || !n.children.length) continue
      var t = (n.textContent || '').indexOf('Dear') === 0
      if (n.textContent && n.textContent.indexOf('Dear') === 0 && /Sincerely|Sincerely,/.test(n.textContent)) return n
    }
    return null
  }

  function extractCard(card) {
    var out = { recipient: '', message: '', sender: '' }
    if (!card) return out
    var ps = card.querySelectorAll('p')
    for (var i = 0; i < ps.length; i++) {
      var txt = ps[i].textContent || ''
      if (txt.indexOf('Dear') === 0) {
        out.recipient = txt.replace(/^Dear\s*/, '').trim()
      } else if (/Sincerely/i.test(txt)) {
        var sibling = ps[i].nextElementSibling
        if (sibling && sibling.tagName === 'P') out.sender = (sibling.textContent || '').trim()
      } else if (!txt.trim() || txt.trim() === 'Sincerely,') {
        continue
      } else {
        // message paragraph: the one in a text-left container, not labels
        var pr = ps[i].closest && ps[i].closest('.text-left')
        if (pr) out.message = txt.trim()
      }
    }
    if (!out.message) {
      for (var j = 0; j < ps.length; j++) {
        var t2 = (ps[j].textContent || '').trim()
        if (t2 && t2.indexOf('Dear') !== 0 && !/Sincerely/i.test(t2)) out.message = t2
      }
    }
    return out
  }

  function gatherBouquet() {
    var bushBg = document.querySelector('img[alt="bush background"]')
    var bushTop = document.querySelector('img[alt="bush top"]')
    var flowerImgs = Array.prototype.slice.call(document.querySelectorAll('div.flex-wrap.reverse img')).filter(function (im) {
      var a = (im.getAttribute('alt') || '').toLowerCase()
      return a !== 'bush background' && a !== 'bush top'
    })
    var flowers = flowerImgs.map(function (im, idx) {
      var st = im.getAttribute('style') || ''
      var rot = 0
      var m = /rotate\((-?[0-9.]+)/.exec(st)
      if (m) rot = parseFloat(m[1])
      var parent = im.parentElement && im.parentElement.parentElement
      var order = 0
      if (parent) {
        var o = /order:([0-9]+)/.exec(parent.getAttribute('style') || '')
        if (o) order = parseInt(o[1], 10)
      }
      return {
        name: im.getAttribute('alt') || ('flower' + idx),
        src: im.getAttribute('src') || '',
        width: parseInt(im.getAttribute('width'), 10) || 120,
        rotate: rot,
        order: order
      }
    })
    flowers.sort(function (a, b) { return a.order - b.order })
    return {
      bushBg: bushBg ? bushBg.getAttribute('src') : '',
      bushTop: bushTop ? bushTop.getAttribute('src') : '',
      flowers: flowers
    }
  }

  function loadImage(src, timeout) {
    return new Promise(function (resolve) {
      var im = new Image()
      im.crossOrigin = 'anonymous'
      var done = false
      var timer = setTimeout(function () {
        if (!done) {
          done = true
          resolve(null)
        }
      }, timeout || 5000)
      im.onload = function () {
        if (done) return
        done = true
        clearTimeout(timer)
        resolve(im)
      }
      im.onerror = function () {
        if (done) return
        done = true
        clearTimeout(timer)
        resolve(null)
      }
      im.src = toProxy(src)
    })
  }

  var FALLBACK_COLORS = {
    rose: '#e56b7f', peony: '#f0a6c4', tulip: '#e8a33d', orchid: '#b274d1',
    lily: '#f2d98a', dahlia: '#d96f8f', daisy: '#f2f0e6', sunflower: '#f2b01e',
    anemone: '#9d6bbf', carnation: '#e06666', zinnia: '#e97451', ranunculus: '#e9b0c4'
  }

  function fallbackColor(name) {
    var n = (name || '').toLowerCase()
    if (FALLBACK_COLORS[n]) return FALLBACK_COLORS[n]
    var pal = ['#e8a3b6', '#f2c14e', '#9fb6d6', '#b2d8b2', '#d8a5c4', '#e59d77']
    var h = 0
    for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) >>> 0
    return pal[h % pal.length]
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    if (!text) return
    var words = String(text).split(/\s+/)
    var line = ''
    var cy = y
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i]
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, cy)
        line = words[i]
        cy += lineHeight
      } else {
        line = test
      }
    }
    if (line) ctx.fillText(line, x, cy)
  }

  function renderBouquetImage() {
    var WIN_W = 900
    var WIN_H = 1200
    var bouquet = gatherBouquet()

    return Promise.all(
      [bouquet.bushBg, bouquet.bushTop].concat(bouquet.flowers.map(function (f) { return f.src })).map(function (s) {
        return loadImage(s || '')
      })
    ).then(function (imgs) {
      var canvas = document.createElement('canvas')
      canvas.width = WIN_W
      canvas.height = WIN_H
      var ctx = canvas.getContext('2d')

      ctx.fillStyle = '#F9F9EE'
      ctx.fillRect(0, 0, WIN_W, WIN_H)

      // soft decorative band
      ctx.fillStyle = '#F5F5DC'
      ctx.fillRect(0, 0, WIN_W, 920)

      var bushImg = imgs[0]
      var bushTopImg = imgs[1]

      var bushW = 600
      var bushH = 500
      var bushX = (WIN_W - bushW) / 2
      var bushY = 120
      if (bushImg) ctx.drawImage(bushImg, bushX, bushY, bushW, bushH)

      // flowers
      var scale = 1.45
      var flowerCount = bouquet.flowers.length || 0
      var totalW = 0
      var centers = []
      for (var i = 0; i < flowerCount; i++) {
        var fw = bouquet.flowers[i].width * scale
        totalW += fw
      }
      totalW += (-16 * (flowerCount - 1))
      var cursorX = (WIN_W - totalW) / 2
      for (var j = 0; j < flowerCount; j++) {
        var fl = bouquet.flowers[j]
        var w = fl.width * scale
        var fimg = imgs[2 + j]
        centers.push({ cx: cursorX + w / 2, cy: 470, w: w, fl: fl, img: fimg })
        cursorX += w - 16
      }
      for (var k = 0; k < centers.length; k++) {
        var c = centers[k]
        ctx.save()
        ctx.translate(c.cx, c.cy)
        ctx.rotate((c.fl.rotate || 0) * Math.PI / 180)
        if (c.img) {
          var ratio = c.img.naturalHeight && c.img.naturalWidth ? c.img.naturalHeight / c.img.naturalWidth : 1
          ctx.drawImage(c.img, -c.w / 2, -(c.w * ratio) / 2, c.w, c.w * ratio)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, c.w * 0.42, 0, Math.PI * 2)
          ctx.fillStyle = fallbackColor(c.fl.name)
          ctx.fill()
        }
        ctx.restore()
      }

      if (bushTopImg) ctx.drawImage(bushTopImg, bushX, bushY, bushW, bushH)

      // card
      var card = findCard()
      var cardInfo = extractCard(card)
      var cardW = 700
      var cardH = 330
      var cardX = (WIN_W - cardW) / 2
      var cardY = 760
      ctx.save()
      ctx.translate(WIN_W / 2, cardY + cardH / 2)
      ctx.rotate(-2 * Math.PI / 180)
      ctx.translate(-WIN_W / 2, -(cardY + cardH / 2))
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(cardX, cardY, cardW, cardH)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 3
      ctx.strokeRect(cardX, cardY, cardW, cardH)
      ctx.restore()

      var pad = 48
      ctx.fillStyle = '#000000'
      ctx.textBaseline = 'alphabetic'

      ctx.font = 'italic 700 30px Georgia, "Times New Roman", serif'
      ctx.textAlign = 'left'
      ctx.fillText('Dear ' + (cardInfo.recipient || ''), cardX + pad, cardY + 66)

      ctx.font = 'italic 400 26px Georgia, "Times New Roman", serif'
      ctx.textAlign = 'center'
      if (cardInfo.message) {
        wrapText(ctx, cardInfo.message, WIN_W / 2, cardY + 150, cardW - pad * 2, 38)
      } else {
        ctx.fillText('', WIN_W / 2, cardY + 150)
      }

      ctx.textAlign = 'right'
      ctx.font = 'italic 700 26px Georgia, "Times New Roman", serif'
      ctx.fillText('Sincerely,', cardX + cardW - pad, cardY + cardH - 52)
      if (cardInfo.sender) ctx.fillText(cardInfo.sender, cardX + cardW - pad, cardY + cardH - 18)

      // brand line
      ctx.textAlign = 'center'
      ctx.font = '700 24px "Martian Mono", monospace'
      ctx.fillStyle = '#333333'
      ctx.fillText('Petals by Bavi · soft stems & fuzzy blooms', WIN_W / 2, WIN_H - 42)

      return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blob) {
          if (blob) resolve(blob)
          else reject(new Error('could not encode image'))
        }, 'image/png')
      })
    })
  }

  function triggerDownload(blob) {
    var url = URL.createObjectURL(blob)
    var a = document.createElement('a')
    a.href = url
    a.download = FILE_NAME
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 800)
  }

  function buildPanel() {
    var section = document.createElement('section')
    section.id = PANEL_ID
    section.setAttribute('data-petals-share', '1')

    var h = document.createElement('h2')
    h.className = 'petals-share-heading'
    h.textContent = 'SHARE YOUR BOUQUET'
    section.appendChild(h)

    var sub = document.createElement('p')
    sub.className = 'petals-share-sub'
    sub.textContent = 'Your bouquet is ready! Share your creation with someone special.'
    section.appendChild(sub)

    var actions = document.createElement('div')
    actions.className = 'petals-share-actions'

    var btnDownload = document.createElement('button')
    btnDownload.type = 'button'
    btnDownload.className = 'petals-share-primary'
    btnDownload.textContent = 'Download Bouquet Image'

    var btnWa = document.createElement('button')
    btnWa.type = 'button'
    btnWa.textContent = 'Share on WhatsApp'

    var btnIg = document.createElement('button')
    btnIg.type = 'button'
    btnIg.textContent = 'Share on Instagram'

    var btnCopy = document.createElement('button')
    btnCopy.type = 'button'
    btnCopy.textContent = 'Copy Bouquet Link'

    var btnAgain = document.createElement('a')
    btnAgain.href = '/bouquet?mode=color'
    btnAgain.className = 'petals-share-link petals-share-btn'
    btnAgain.textContent = 'Create Another Bouquet'

    var err = document.createElement('p')
    err.className = 'petals-share-error'
    err.style.display = 'none'

    btnDownload.addEventListener('click', function () {
      btnDownload.disabled = true
      renderBouquetImage().then(function (blob) {
        triggerDownload(blob)
        toast('Your bouquet image is downloading!')
        btnDownload.disabled = false
      }).catch(function () {
        toast('Sorry, we couldn\u2019t generate the image right now.')
        btnDownload.disabled = false
      })
    })

    btnWa.addEventListener('click', function () {
      var msg = 'I created a digital bouquet with Petals by Bavi! \uD83C\uDF38\n\nTake a look at my bouquet:\n' + location.href
      var url = 'https://wa.me/?text=' + encodeURIComponent(msg)
      var w = null
      try { w = window.open(url, '_blank', 'noopener') } catch (e) { w = null }
      if (!w) location.href = url
    })

    btnIg.addEventListener('click', function () {
      btnIg.disabled = true
      renderBouquetImage().then(function (blob) {
        return shareViaInstagram(blob).then(function () { btnIg.disabled = false })
      }).catch(function () {
        toast('Sorry, we couldn\u2019t prepare your bouquet image.')
        btnIg.disabled = false
      })
    })

    btnCopy.addEventListener('click', function () {
      copyText(location.href).then(function () {
        toast('Bouquet link copied!')
      }).catch(function () {
        toast('Couldn\u2019t copy the link automatically — please copy it from the address bar.')
      })
    })

    actions.appendChild(btnDownload)
    actions.appendChild(btnWa)
    actions.appendChild(btnIg)
    actions.appendChild(btnCopy)
    actions.appendChild(btnAgain)
    actions.appendChild(err)
    section.appendChild(actions)
    return section
  }

  function shareViaInstagram(blob) {
    // STEP 1-3: prepare the file + link, then prefer the native share sheet for files.
    return new Promise(function (resolve) {
      var file
      try {
        file = new File([blob], FILE_NAME, { type: 'image/png' })
      } catch (e) { file = null }

      var nb = !file ? false : (navigator.canShare && navigator.canShare({ files: [file] }))
      if (nb) {
        var shareData = {
          files: [file],
          title: 'My Petals by Bavi Bouquet',
          text: 'I created a digital bouquet with Petals by Bavi! \uD83C\uDF38 ' + location.href
        }
        navigator.share(shareData).then(function () {
          toast('Shared!')
          resolve()
        }).catch(function (e) {
          if (e && e.name === 'AbortError') {
            resolve()
          } else {
            instagramFallback(blob, resolve)
          }
        })
      } else {
        instagramFallback(blob, resolve)
      }
    })
  }

  function instagramFallback(blob, done) {
    // download the image + copy the link + clear instructions
    triggerDownload(blob)
    copyText(location.href).then(function () {
      toast('Your bouquet image is ready! Save the image and share it to your Instagram Story. Your bouquet link has also been copied.')
    }, function () {
      toast('Your bouquet image is ready! Save the image and share it to your Instagram Story.')
    })
    if (done) setTimeout(done, 1200)
  }

  function insertPanel(panel) {
    var btn = Array.prototype.filter.call(document.querySelectorAll('button'), function (b) {
      return (b.textContent || '').toLowerCase().indexOf('copy link') !== -1 && b.offsetParent !== null
    })[0]
    if (btn) {
      var row = btn.closest('div.flex-wrap') || btn.parentElement
      if (row && row.parentNode) {
        var existing = document.getElementById(PANEL_ID)
        if (existing && existing.parentNode === row.parentNode) return
        if (existing) existing.parentNode.removeChild(existing)
        row.parentNode.insertBefore(panel, row)
        return
      }
    }
    // fallback: append inside the main screen wrapper
    var root = document.querySelector('.min-h-screen')
    if (root) {
      var existing2 = document.getElementById(PANEL_ID)
      if (existing2 && existing2.parentNode === root) return
      if (existing2) existing2.parentNode.removeChild(existing2)
      root.appendChild(panel)
    } else {
      document.body.appendChild(panel)
    }
  }

  var panel = buildPanel()
  var started = false
  var retries = 0
  var timer = setInterval(function () {
    var copyBtn = Array.prototype.filter.call(document.querySelectorAll('button'), function (b) {
      return (b.textContent || '').toLowerCase().indexOf('copy link') !== -1
    })[0]
    var card = findCard()
    if ((copyBtn && (card || document.querySelector('img[alt="bush background"]'))) || retries > 80) {
      clearInterval(timer)
      insertPanel(panel)
    } else {
      retries++
    }
  }, 300)

  // keep the panel in place if React ever re-renders the page
  setInterval(function () {
    if (!document.getElementById(PANEL_ID)) {
      try { insertPanel(panel) } catch (e) { /* ignore */ }
    }
  }, 2000)
})()