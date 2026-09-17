import React from 'react'
import { useBouquet } from '../../context/BouquetContext'
import CardPreview from '../../components/bouquet/CardPreview'

export default function StepWriteCard() {
  const { bouquet, updateLetter } = useBouquet()

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        Write the Card
      </h2>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Add a heartfelt note to accompany your digital bouquet.
      </p>

      {/* Center card with decorative flowers */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        {/* Left decorative flower cluster */}
        <div className="desktop-card-flowers">
          <img
            src="/assets/flowers/full/daisy.webp"
            alt="Daisy"
            style={{ width: '90px', height: '130px', objectFit: 'contain', transform: 'rotate(-10deg)' }}
          />
          <img
            src="/assets/flowers/full/lily.webp"
            alt="Lily"
            style={{ width: '90px', height: '130px', objectFit: 'contain', transform: 'rotate(8deg)' }}
          />
        </div>

        {/* Note Card */}
        <div style={{ width: '100%', maxWidth: '540px' }}>
          <CardPreview
            letter={bouquet.letter}
            isEditable={true}
            onChange={updateLetter}
          />
        </div>

        {/* Right decorative flower cluster */}
        <div className="desktop-card-flowers">
          <img
            src="/assets/flowers/full/carnation.webp"
            alt="Carnation"
            style={{ width: '90px', height: '130px', objectFit: 'contain', transform: 'rotate(12deg)' }}
          />
          <img
            src="/assets/flowers/full/peony.webp"
            alt="Peony"
            style={{ width: '90px', height: '130px', objectFit: 'contain', transform: 'rotate(-6deg)' }}
          />
        </div>
      </div>
    </div>
  )
}
