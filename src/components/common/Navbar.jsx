import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="site-header">
      <Link to="/" className="petals-logo petals-logo-nav">
        Petals by Bavi
      </Link>
      <nav className="site-nav-links">
        <Link
          to="/bouquet?mode=color"
          className={`nav-link ${location.pathname.startsWith('/bouquet') ? 'active' : ''}`}
        >
          Build Bouquet
        </Link>
        <Link
          to="/garden"
          className={`nav-link ${location.pathname === '/garden' ? 'active' : ''}`}
        >
          View Garden
        </Link>
      </nav>
    </header>
  )
}
