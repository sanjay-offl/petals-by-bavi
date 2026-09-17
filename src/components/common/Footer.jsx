import React from 'react'
import { Link } from 'react-router-dom'
import { openInstagram, openWhatsAppOrder } from '../../utils/share'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-order-text">
        Instagram @petals_by_bavi · WhatsApp 8883537574 · DM to order
      </p>
      <div className="footer-social-row">
        <button
          type="button"
          onClick={openInstagram}
          className="btn btn-primary"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem' }}
        >
          Follow us on Instagram
        </button>
        <button
          type="button"
          onClick={openWhatsAppOrder}
          className="btn btn-secondary"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem' }}
        >
          Order on WhatsApp
        </button>
      </div>
      <p>
        <Link to="/privacy-policy" className="footer-privacy-link">
          privacy policy
        </Link>
      </p>
    </footer>
  )
}
