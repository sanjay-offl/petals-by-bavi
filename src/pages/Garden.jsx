import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchGardenBouquets } from '../utils/storage'
import BouquetCanvas from '../components/bouquet/BouquetCanvas'

function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid var(--border-light)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div className="skeleton" style={{ width: '100%', height: '220px', borderRadius: '2px' }} />
      <div className="skeleton" style={{ width: '65%', height: '18px' }} />
      <div className="skeleton" style={{ width: '90%', height: '14px' }} />
      <div className="skeleton" style={{ width: '80%', height: '14px' }} />
    </div>
  )
}

export default function Garden() {
  const [bouquets, setBouquets] = useState([])
  const [filterMode, setFilterMode] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const list = await fetchGardenBouquets(40)
      setBouquets(list)
      setIsLoading(false)
    }
    load()
  }, [])

  const filteredList = bouquets.filter((b) => {
    if (filterMode === 'all') return true
    return b.mode === filterMode
  })

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1
          className="petals-logo"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', margin: '0.5rem auto' }}
        >
          The Garden
        </h1>
        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          A community collection of digital bouquets crafted with love
        </p>

        {/* Filter Pills & Build CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`btn-outline-pill ${filterMode === 'all' ? 'btn-primary' : ''}`}
          >
            All Blooms ({bouquets.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('color')}
            className={`btn-outline-pill ${filterMode === 'color' ? 'btn-primary' : ''}`}
          >
            Full Color ({bouquets.filter(b => b.mode === 'color').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('mono')}
            className={`btn-outline-pill ${filterMode === 'mono' ? 'btn-primary' : ''}`}
          >
            Black &amp; White ({bouquets.filter(b => b.mode === 'mono').length})
          </button>
          <Link
            to="/bouquet?mode=color"
            className="btn btn-primary"
            style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', marginLeft: '0.5rem' }}
          >
            + Build Yours
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="garden-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            No bouquets found in this category yet.
            {filterMode !== 'all' && ' Try switching to All Blooms.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {filterMode !== 'all' && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setFilterMode('all')}
              >
                View All
              </button>
            )}
            <Link to="/bouquet?mode=color" className="btn btn-primary">
              Build a Bouquet
            </Link>
          </div>
        </div>
      ) : (
        <div className="garden-grid">
          {filteredList.map((item) => {
            const letter = item.letter || {}
            const flowerCount = (item.flowers || []).reduce((sum, f) => sum + f.count, 0)
            const dateStr = item.created_at
              ? new Date(item.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : 'Recent'

            return (
              <Link
                key={item.id}
                to={`/bouquet/${item.id}`}
                className="garden-card"
              >
                {/* Mode badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: item.mode === 'mono' ? '#121212' : 'var(--accent-rose)',
                  color: '#FFF',
                  fontSize: '0.55rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.2rem 0.45rem',
                  fontFamily: 'var(--font-mono)',
                  pointerEvents: 'none'
                }}>
                  {item.mode === 'mono' ? 'B&W' : 'Color'}
                </div>

                {/* Visual Preview */}
                <div className="garden-card-preview">
                  <BouquetCanvas bouquet={item} isCompact={true} />
                </div>

                {/* Info & Card Message */}
                <div className="garden-card-info">
                  <p className="garden-card-recipient">
                    Dear {letter.recipient || 'Someone Special'}
                  </p>
                  <p className="garden-card-msg">
                    &ldquo;{letter.message || 'A gentle bundle of blooms.'}&rdquo;
                  </p>
                  <div className="garden-card-meta">
                    <span>
                      {letter.sender ? `From ${letter.sender}` : 'Petals by Bavi'}
                    </span>
                    <span>{flowerCount} blooms · {dateStr}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Bottom CTA */}
      {!isLoading && filteredList.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Add your bouquet to the garden — build one now!
          </p>
          <Link to="/bouquet?mode=color" className="btn btn-primary">
            Build a Bouquet
          </Link>
        </div>
      )}
    </div>
  )
}
