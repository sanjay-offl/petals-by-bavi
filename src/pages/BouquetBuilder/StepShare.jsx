import React from 'react'
import { useBouquet } from '../../context/BouquetContext'
import BouquetCanvas from '../../components/bouquet/BouquetCanvas'

export default function StepShare() {
  const { bouquet, totalFlowers } = useBouquet()

  return (
    <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', fontWeight: 700 }}>
        Share Your Bouquet
      </h2>
      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
        Your arrangement of <strong>{totalFlowers} blooms</strong> is ready!
      </p>

      {/* Mini Bouquet Preview */}
      <div style={{ margin: '1rem 0' }}>
        <BouquetCanvas bouquet={bouquet} isCompact={true} />
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dark)', padding: '1.25rem', margin: '1.5rem 0', textAlign: 'left' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          Card Recipient
        </p>
        <p className="font-serif" style={{ fontStyle: 'italic', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
          Dear {bouquet.letter?.recipient || 'Beloved'}
        </p>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          Message
        </p>
        <p className="font-serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {bouquet.letter?.message || '(No note written)'}
        </p>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Click <strong>CONTINUE TO BOUQUET</strong> below to open your finished bouquet, generate a high-res downloadable image, share it to WhatsApp or Instagram, or copy the share link!
      </p>
    </div>
  )
}
