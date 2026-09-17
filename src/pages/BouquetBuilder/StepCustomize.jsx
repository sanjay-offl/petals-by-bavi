import React from 'react'
import { useBouquet } from '../../context/BouquetContext'
import BouquetCanvas from '../../components/bouquet/BouquetCanvas'

export default function StepCustomize() {
  const { bouquet, shuffleOrder, cycleGreenery } = useBouquet()

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        Customize Your Bouquet
      </h2>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
        Adjust the greenery wrap and shuffle the flower stems until your bouquet is perfect.
      </p>

      {/* Customization Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={shuffleOrder}
          className="btn btn-primary"
        >
          Try a new Arrangement
        </button>
        <button
          type="button"
          onClick={cycleGreenery}
          className="btn btn-secondary"
        >
          Change Greenery ({((bouquet.greenery ?? 0) % 3) + 1}/3)
        </button>
      </div>

      {/* Live Bouquet Preview Stage */}
      <BouquetCanvas bouquet={bouquet} />
    </div>
  )
}
