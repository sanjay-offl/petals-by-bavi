import React from 'react'
import { Link } from 'react-router-dom'
import { openInstagram } from '../utils/share'

export default function PrivacyPolicy() {
  return (
    <div className="page-container" style={{ maxWidth: '720px', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Link to="/" className="nav-link" style={{ fontSize: '0.8rem', display: 'inline-block', marginBottom: '1rem' }}>
          ← Back to Petals by Bavi
        </Link>
        <h1 style={{ fontSize: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Last updated: September 17, 2026
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
        <p>
          <strong>Petals by Bavi</strong> is a digital platform for creating and sharing digital flower bouquets. This Privacy Policy explains what information may be collected when you use the website, how that information is used, and your available choices.
        </p>

        <section>
          <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: '0.75rem' }}>
            Petals by Bavi does not require users to create an account to create or share digital bouquets. When you use the site, the following information may be collected or stored:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <strong>Bouquet Content:</strong> When you design and create a bouquet, the selected flowers, layout, card recipient, message, and sender name are stored so that your bouquet can be viewed via its unique link and optionally shown in our community garden. Please avoid including sensitive or private personal information.
            </li>
            <li>
              <strong>Local Preferences:</strong> Your selected bouquet mode (Color or Black &amp; White) and recent creations may be cached in your browser's local storage for your convenience.
            </li>
            <li>
              <strong>Usage Information:</strong> Standard anonymized traffic metrics (such as page visits, device type, and browser) may be processed to ensure website stability.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            2. How We Use Information
          </h2>
          <p>
            We use the stored bouquet design solely to deliver the bouquet viewing and sharing features of the service. We do not sell, rent, or trade your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            3. Public Sharing
          </h2>
          <p>
            Bouquets shared through public links are accessible to anyone who has the link. Some creations may also appear in our public garden gallery. Please ensure any note you write is suitable for public viewing.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            4. Contact Us
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy or wish to request the removal of a public bouquet, please reach out to Petals by Bavi via Instagram:{' '}
            <button
              type="button"
              onClick={openInstagram}
              style={{
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                padding: 0
              }}
            >
              @petals_by_bavi
            </button>.
          </p>
        </section>
      </div>
    </div>
  )
}
