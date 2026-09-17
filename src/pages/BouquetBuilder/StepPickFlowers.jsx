import React, { useState } from 'react'
import { FLOWERS, getFlowerImagePath } from '../../data/flowers'
import { useBouquet } from '../../context/BouquetContext'

export default function StepPickFlowers() {
  const { bouquet, addFlower, removeFlower, totalFlowers } = useBouquet()
  const [hoveredFlower, setHoveredFlower] = useState(null)

  // Map flowers to count lookup
  const countMap = {}
  bouquet.flowers.forEach((f) => {
    countMap[f.id] = f.count
  })

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        Pick 6 to 10 BLOOMS
      </h2>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        {totalFlowers > 0
          ? `${totalFlowers} bloom${totalFlowers === 1 ? '' : 's'} selected. Click on a flower tag below to deselect.`
          : 'Hover or tap a flower to discover its birth month & symbolic meaning.'}
      </p>

      {/* Flower Grid */}
      <div className="flower-picker-grid">
        {FLOWERS.map((flower) => {
          const count = countMap[flower.id] || 0
          const isSelected = count > 0

          return (
            <div
              key={flower.id}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredFlower(flower)}
              onMouseLeave={() => setHoveredFlower(null)}
            >
              <button
                type="button"
                className={`flower-item-btn ${isSelected ? 'selected' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  addFlower(flower)
                }}
                aria-label={`Add ${flower.displayName}`}
              >
                <div className="flower-img-wrap">
                  <img
                    src={getFlowerImagePath(flower.name, bouquet.mode)}
                    alt={flower.displayName}
                    loading="eager"
                  />
                  {count > 0 && (
                    <div className="flower-badge-counter">
                      {count}
                    </div>
                  )}
                </div>
                <span className="flower-name-label">{flower.displayName}</span>
              </button>

              {/* Tooltip on hover/focus */}
              {hoveredFlower?.id === flower.id && (
                <div className="flower-tooltip">
                  <h4>{flower.displayName}</h4>
                  <p><strong>Meaning:</strong> {flower.meaning}</p>
                  <p><strong>Month:</strong> {flower.birthMonth}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Blooms Pills List */}
      {totalFlowers > 0 && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px dashed var(--border-dashed)' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Selected Blooms (Click to remove):
          </p>
          <div className="selected-pills-bar">
            {bouquet.flowers.map((f) => {
              const info = FLOWERS.find((item) => item.id === f.id)
              if (!info) return null
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => removeFlower(f.id)}
                  className="flower-pill"
                  title="Click to remove one bloom"
                >
                  <span>{info.displayName.toUpperCase()} ×{f.count}</span>
                  <span style={{ fontSize: '0.9rem', marginLeft: '2px', lineHeight: 1 }}>×</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
