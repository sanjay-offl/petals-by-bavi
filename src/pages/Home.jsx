import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FLOWERS, getFlowerImagePath } from '../data/flowers'

const HERO_FLOWERS = [1, 12, 11, 8, 9, 10, 2, 7] // orchid, rose, peony, sunflower, lily, daisy, tulip, ranunculus

export default function Home() {
  const [activeFlowerIdx, setActiveFlowerIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlowerIdx((prev) => (prev + 1) % HERO_FLOWERS.length)
    }, 1400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="page-container"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}
    >
      {/* Rotating Flower Row */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {HERO_FLOWERS.map((id, idx) => {
          const flower = FLOWERS.find((f) => f.id === id)
          if (!flower) return null
          const isActive = idx === activeFlowerIdx
          return (
            <div
              key={id}
              style={{
                width: isActive ? '88px' : '68px',
                height: isActive ? '88px' : '68px',
                transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                opacity: isActive ? 1 : 0.55,
                filter: isActive ? 'drop-shadow(0 6px 14px rgba(0,0,0,0.15))' : 'none',
              }}
            >
              <img
                src={getFlowerImagePath(flower.name, 'color')}
                alt={flower.displayName}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )
        })}
      </div>

      <div style={{ maxWidth: '640px', textAlign: 'center', margin: '0 auto' }}>
        {/* Brand Header */}
        <h1 className="petals-logo petals-logo-hero">
          Petals by Bavi
        </h1>

        {/* Tagline */}
        <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0.75rem 0 0.35rem', fontWeight: 500 }}>
          Soft stems &amp; fuzzy blooms
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Real floral bouquets, handmade pipe cleaner crafts &amp; anti-tarnish jewellery. Build your own digital bouquet and share the love.
        </p>

        {/* Navigation CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'center', maxWidth: '360px', margin: '0 auto' }}>
          <Link
            to="/bouquet?mode=color"
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem 2rem' }}
          >
            🌸 BUILD A COLOUR BOUQUET
          </Link>
          <Link
            to="/bouquet?mode=mono"
            className="btn btn-secondary"
            style={{ width: '100%', padding: '1rem 2rem' }}
          >
            🖤 BUILD IN BLACK &amp; WHITE
          </Link>
          <Link
            to="/garden"
            className="btn"
            style={{
              width: '100%',
              padding: '0.75rem',
              textDecoration: 'underline',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem',
              letterSpacing: '0.04em'
            }}
          >
            VIEW THE GARDEN →
          </Link>
        </div>

        {/* Flower Meanings Strip */}
        <div style={{
          marginTop: '3rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          textAlign: 'center'
        }}>
          {(() => {
            const flower = FLOWERS.find((f) => f.id === HERO_FLOWERS[activeFlowerIdx])
            if (!flower) return null
            return (
              <div style={{ transition: 'opacity 300ms ease' }}>
                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  Currently showing
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                  {flower.displayName}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {flower.meaning} · Birth month: {flower.birthMonth}
                </p>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
