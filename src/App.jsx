import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { BouquetProvider } from './context/BouquetContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import BouquetBuilder from './pages/BouquetBuilder/BouquetBuilder'
import BouquetView from './pages/BouquetView'
import Garden from './pages/Garden'
import PrivacyPolicy from './pages/PrivacyPolicy'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BouquetProvider>
      <ScrollToTop />
      <div className="app-container">
        {/* Navbar on all pages */}
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bouquet" element={<BouquetBuilder />} />
            <Route path="/bouquet/:id" element={<BouquetView />} />
            <Route path="/garden" element={<Garden />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BouquetProvider>
  )
}
