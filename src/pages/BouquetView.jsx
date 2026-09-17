import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBouquetById } from '../utils/storage'
import { generateBouquetImage, downloadBlob } from '../utils/exportImage'
import {
  copyToClipboard,
  shareToWhatsApp,
  shareToInstagram
} from '../utils/share'
import BouquetCanvas from '../components/bouquet/BouquetCanvas'
import CardPreview from '../components/bouquet/CardPreview'
import ConfettiPetals from '../components/common/ConfettiPetals'
import Toast from '../components/common/Toast'

export default function BouquetView() {
  const { id } = useParams()
  const [bouquet, setBouquet] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg, duration = 2800) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), duration)
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await fetchBouquetById(id)
      setBouquet(data)
      setIsLoading(false)
    }
    load()
  }, [id])

  const handleDownload = async () => {
    if (!bouquet) return
    setIsDownloading(true)
    showToast('Generating high-resolution bouquet image...')
    try {
      const blob = await generateBouquetImage(bouquet)
      downloadBlob(blob, 'petals-by-bavi-bouquet.png')
      showToast('Bouquet image downloaded! 🌸')
    } catch (err) {
      console.error('Download error:', err)
      showToast('Could not download image. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(window.location.href)
      showToast('Bouquet link copied to clipboard! 💐')
    } catch {
      showToast('Please copy the URL directly from the address bar.')
    }
  }

  const handleWhatsApp = () => {
    shareToWhatsApp(window.location.href, bouquet)
  }

  const handleInstagram = () => {
    shareToInstagram(bouquet, window.location.href, showToast)
  }

  if (isLoading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Loading your bouquet…
        </p>
      </div>
    )
  }

  if (!bouquet) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Bouquet Not Found</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          This bouquet may have expired or the link is incomplete.
        </p>
        <Link to="/bouquet?mode=color" className="btn btn-primary">
          Create a New Bouquet
        </Link>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Shower of gentle flower petals animation */}
      <ConfettiPetals />
      <Toast message={toastMessage} />

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1
          className="petals-logo"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '0.5rem auto' }}
        >
          A Bouquet for You
        </h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Handcrafted with Petals by Bavi
        </p>
      </div>

      {/* Main 3D Layered Bouquet Stage */}
      <BouquetCanvas bouquet={bouquet} />

      {/* Handwritten Letter Note Card */}
      <div style={{ maxWidth: '560px', margin: '0 auto 2.5rem' }}>
        <CardPreview letter={bouquet.letter} isEditable={false} />
      </div>

      {/* Sharing & Export Actions Panel */}
      <section
        style={{
          maxWidth: '560px',
          margin: '0 auto 3rem',
          backgroundColor: 'var(--bg-card)',
          border: '1.5px solid var(--border-dark)',
          padding: '1.75rem 1.5rem',
          textAlign: 'center'
        }}
      >
        <h2
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.4rem'
          }}
        >
          Share Your Bouquet
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
          Send this digital arrangement to friends, post on stories, or download to save forever.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Primary: High-res Download */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.9rem' }}
          >
            {isDownloading ? 'Generating Image…' : 'Download Bouquet Image'}
          </button>

          {/* Social Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 0.5rem', fontSize: '0.75rem' }}
            >
              Share on WhatsApp
            </button>
            <button
              type="button"
              onClick={handleInstagram}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 0.5rem', fontSize: '0.75rem' }}
            >
              Share on Instagram
            </button>
          </div>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '0.75rem' }}
          >
            Copy Bouquet Link
          </button>

          {/* Build Another */}
          <Link
            to="/bouquet?mode=color"
            className="btn"
            style={{
              textDecoration: 'underline',
              color: 'var(--text-main)',
              fontSize: '0.75rem',
              padding: '0.5rem'
            }}
          >
            Create Another Bouquet
          </Link>
        </div>
      </section>
    </div>
  )
}
