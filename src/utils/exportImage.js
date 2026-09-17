import { getFlowerById, getFlowerImagePath, getBushBgPath, getBushTopPath } from '../data/flowers'

function loadImage(src, timeout = 7000) {
  return new Promise((resolve) => {
    if (!src) return resolve(null)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    let done = false
    const timer = setTimeout(() => {
      if (!done) {
        done = true
        resolve(null)
      }
    }, timeout)
    img.onload = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      resolve(img)
    }
    img.onerror = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      resolve(null)
    }
    img.src = src
  })
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return
  const words = String(text).split(/\s+/)
  let line = ''
  let cy = y
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + ' ' + words[i] : words[i]
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

/**
 * Generate a high-resolution 900x1200 PNG blob for a bouquet
 */
export async function generateBouquetImage(bouquet) {
  const WIN_W = 900
  const WIN_H = 1200

  const mode = bouquet.mode || 'color'
  const greenery = bouquet.greenery ?? 0
  const bushBgUrl = getBushBgPath(greenery, mode)
  const bushTopUrl = getBushTopPath(greenery, mode)

  // Expand flowers according to count and order
  const expandedFlowers = []
  if (Array.isArray(bouquet.flowers)) {
    bouquet.flowers.forEach((f, groupIdx) => {
      const info = getFlowerById(f.id)
      if (info) {
        for (let i = 0; i < f.count; i++) {
          const rawOrder =
            bouquet.flowerOrder && bouquet.flowerOrder[expandedFlowers.length] !== undefined
              ? bouquet.flowerOrder[expandedFlowers.length]
              : expandedFlowers.length

          // Deterministic rotation jitter based on index
          const rot = ((groupIdx * 7 + i * 13) % 11) - 5
          expandedFlowers.push({
            info,
            order: rawOrder,
            rotate: rot,
            src: getFlowerImagePath(info.name, mode)
          })
        }
      }
    })
  }

  expandedFlowers.sort((a, b) => a.order - b.order)

  // Load all images in parallel
  const urlsToLoad = [bushBgUrl, bushTopUrl, ...expandedFlowers.map((f) => f.src)]
  const loadedImages = await Promise.all(urlsToLoad.map((u) => loadImage(u)))

  const bushImg = loadedImages[0]
  const bushTopImg = loadedImages[1]
  const flowerImgs = loadedImages.slice(2)

  // Setup Canvas
  const canvas = document.createElement('canvas')
  canvas.width = WIN_W
  canvas.height = WIN_H
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#F9F9EE'
  ctx.fillRect(0, 0, WIN_W, WIN_H)

  // Decorative soft upper band
  ctx.fillStyle = '#F5F5DC'
  ctx.fillRect(0, 0, WIN_W, 900)

  // Draw Bush Background
  const bushW = 600
  const bushH = 500
  const bushX = (WIN_W - bushW) / 2
  const bushY = 110
  if (bushImg) {
    ctx.drawImage(bushImg, bushX, bushY, bushW, bushH)
  }

  // Draw Layered Flowers
  const count = expandedFlowers.length
  const flowerScale = 1.35
  let totalFlowersWidth = 0
  const flowerWidths = expandedFlowers.map((f) => {
    const baseW = f.info.size === 'small' ? 90 : f.info.size === 'large' ? 160 : 130
    return baseW * flowerScale
  })

  totalFlowersWidth = flowerWidths.reduce((acc, w) => acc + w, 0) - (count > 1 ? (count - 1) * 22 : 0)
  let cursorX = Math.max(80, (WIN_W - Math.min(totalFlowersWidth, 740)) / 2)

  expandedFlowers.forEach((f, idx) => {
    const w = flowerWidths[idx]
    const fImg = flowerImgs[idx]
    const cx = cursorX + w / 2
    const cy = 460 + (idx % 2 === 0 ? -15 : 15)

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(((f.rotate || 0) * Math.PI) / 180)

    if (fImg) {
      const ratio = fImg.naturalHeight && fImg.naturalWidth ? fImg.naturalHeight / fImg.naturalWidth : 1
      ctx.drawImage(fImg, -w / 2, -(w * ratio) / 2, w, w * ratio)
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, w * 0.35, 0, Math.PI * 2)
      ctx.fillStyle = f.info.color || '#e56b7f'
      ctx.fill()
    }
    ctx.restore()

    cursorX += Math.max(30, (Math.min(totalFlowersWidth, 740) - w) / Math.max(1, count - 1))
  })

  // Draw Bush Top Sleeve Overlay (front tuck)
  if (bushTopImg) {
    ctx.drawImage(bushTopImg, bushX, bushY, bushW, bushH)
  }

  // Draw Handwritten Letter Card
  const letter = bouquet.letter || {}
  const cardW = 680
  const cardH = 320
  const cardX = (WIN_W - cardW) / 2
  const cardY = 750

  ctx.save()
  // Slight playful tilt
  ctx.translate(WIN_W / 2, cardY + cardH / 2)
  ctx.rotate((-2 * Math.PI) / 180)
  ctx.translate(-WIN_W / 2, -(cardY + cardH / 2))

  // Card shadow & fill
  ctx.shadowColor = 'rgba(0,0,0,0.08)'
  ctx.shadowBlur = 18
  ctx.shadowOffsetY = 6
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(cardX, cardY, cardW, cardH)
  ctx.shadowColor = 'transparent'

  // Card border
  ctx.strokeStyle = '#121212'
  ctx.lineWidth = 2.5
  ctx.strokeRect(cardX, cardY, cardW, cardH)

  // Card typography
  const pad = 44
  ctx.fillStyle = '#121212'

  // Dear [recipient]
  ctx.font = 'italic 600 28px "Playfair Display", Georgia, serif'
  ctx.textAlign = 'left'
  ctx.fillText(`Dear ${letter.recipient || 'Special Someone'},`, cardX + pad, cardY + 56)

  // Letter message
  ctx.font = 'italic 400 24px "Playfair Display", Georgia, serif'
  ctx.textAlign = 'center'
  const messageText = letter.message || 'Sending you blooms of warmth and joy today!'
  wrapText(ctx, messageText, WIN_W / 2, cardY + 120, cardW - pad * 2, 34)

  // Sincerely, [sender]
  ctx.font = 'italic 600 24px "Playfair Display", Georgia, serif'
  ctx.textAlign = 'right'
  ctx.fillText('Sincerely,', cardX + cardW - pad, cardY + cardH - 52)
  if (letter.sender) {
    ctx.fillText(letter.sender, cardX + cardW - pad, cardY + cardH - 22)
  }
  ctx.restore()

  // Footer Branding: Pacifico / Martian Mono
  ctx.textAlign = 'center'
  ctx.font = '600 20px "Martian Mono", monospace'
  ctx.fillStyle = '#444444'
  ctx.fillText('Petals by Bavi · soft stems & fuzzy blooms', WIN_W / 2, WIN_H - 36)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to generate image blob'))
    }, 'image/png')
  })
}

/**
 * Trigger browser file download of the bouquet PNG
 */
export function downloadBlob(blob, filename = 'petals-by-bavi-bouquet.png') {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 1000)
}
