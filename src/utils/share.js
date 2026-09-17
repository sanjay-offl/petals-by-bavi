import { generateBouquetImage, downloadBlob } from './exportImage'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/petals_by_bavi/'
const WHATSAPP_NUMBER = '918883537574'

export async function copyToClipboard(text) {
  if (!text) throw new Error('Empty text')
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // fallback
    }
  }

  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      ta.style.pointerEvents = 'none'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      ok ? resolve(true) : reject(new Error('Copy failed'))
    } catch (e) {
      reject(e)
    }
  })
}

export function shareToWhatsApp(url, bouquet) {
  const recipient = bouquet?.letter?.recipient ? ` for ${bouquet.letter.recipient}` : ''
  const msg = `I created a digital flower bouquet${recipient} with Petals by Bavi! 🌸✨\n\nTake a look at my bouquet:\n${url}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`
  window.open(waUrl, '_blank', 'noopener,noreferrer')
}

export async function shareToInstagram(bouquet, url, onToast) {
  onToast?.('Preparing high-res bouquet image...')
  try {
    const blob = await generateBouquetImage(bouquet)
    const fileName = 'petals-by-bavi-bouquet.png'

    // Try Web Share API with file first (works great on iOS Safari / Android Chrome)
    let file = null
    try {
      file = new File([blob], fileName, { type: 'image/png' })
    } catch {
      file = null
    }

    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My Petals by Bavi Bouquet',
          text: `I made a digital flower bouquet with Petals by Bavi! 🌸 ${url}`
        })
        onToast?.('Shared successfully! 💐')
        return
      } catch (err) {
        if (err && err.name === 'AbortError') return
      }
    }

    // Fallback: download image + copy link + show clear Instagram Story instructions
    downloadBlob(blob, fileName)
    await copyToClipboard(url).catch(() => {})
    onToast?.(
      'Image saved! Bouquet link copied. Share the image to your Instagram Story and tag @petals_by_bavi! 🌸',
      5000
    )
  } catch (err) {
    console.error('Instagram share failed:', err)
    onToast?.('Could not export image. Please try copying the link!')
  }
}

export function openInstagram() {
  window.open(INSTAGRAM_PROFILE, '_blank', 'noopener,noreferrer')
}

export function openWhatsAppOrder() {
  const msg = 'Hi Petals by Bavi! I would like to inquire about ordering custom bouquets / crafts.'
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
}
