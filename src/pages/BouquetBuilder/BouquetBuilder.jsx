import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useBouquet } from '../../context/BouquetContext'
import { saveBouquet } from '../../utils/storage'
import StepPickFlowers from './StepPickFlowers'
import StepCustomize from './StepCustomize'
import StepWriteCard from './StepWriteCard'
import StepShare from './StepShare'
import Toast from '../../components/common/Toast'

const STEPS = [
  { label: 'Pick Flowers', icon: '🌸' },
  { label: 'Customise', icon: '✂️' },
  { label: 'Write Card', icon: '💌' },
  { label: 'Share', icon: '✨' },
]

export default function BouquetBuilder() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { bouquet, setMode, canProceed, totalFlowers } = useBouquet()

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg, duration = 2400) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), duration)
  }

  // Sync query param `mode` with state
  useEffect(() => {
    const urlMode = searchParams.get('mode')
    if (urlMode === 'mono' || urlMode === 'color') {
      setMode(urlMode)
    }
  }, [searchParams, setMode])

  const handleModeToggle = (newMode) => {
    setMode(newMode)
    setSearchParams({ mode: newMode })
  }

  const handleNext = async () => {
    // Step 0 validation: 6-10 blooms required
    if (currentStep === 0 && !canProceed) {
      if (totalFlowers < 6) {
        showToast(`You need ${6 - totalFlowers} more bloom${6 - totalFlowers === 1 ? '' : 's'} to continue!`)
      } else if (totalFlowers > 10) {
        showToast(`You have ${totalFlowers} blooms — please remove ${totalFlowers - 10} to continue.`)
      }
      return
    }

    // If on final step, submit to save bouquet
    if (currentStep === STEPS.length - 1) {
      setIsSubmitting(true)
      try {
        const result = await saveBouquet(bouquet)
        if (result && result.id) {
          navigate(`/bouquet/${result.id}`)
        } else {
          showToast('Could not save bouquet. Please try again.')
          setIsSubmitting(false)
        }
      } catch (err) {
        console.error('Save error:', err)
        showToast('Something went wrong. Please try again.')
        setIsSubmitting(false)
      }
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page-container">
      <Toast message={toastMessage} />

      {/* Page Heading */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1
          className="petals-logo"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '0.25rem auto 0.75rem' }}
        >
          Build a Bouquet
        </h1>

        {/* Mode Switcher Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => handleModeToggle('color')}
            className={`btn-outline-pill ${bouquet.mode === 'color' ? 'btn-primary' : ''}`}
            style={{ padding: '0.4rem 1.1rem' }}
          >
            🌸 Full Color
          </button>
          <button
            type="button"
            onClick={() => handleModeToggle('mono')}
            className={`btn-outline-pill ${bouquet.mode === 'mono' ? 'btn-primary' : ''}`}
            style={{ padding: '0.4rem 1.1rem' }}
          >
            🖤 Black &amp; White
          </button>
        </div>
      </div>

      {/* Progress Steps Bar */}
      <div className="wizard-progress-bar">
        {STEPS.map((step, idx) => (
          <div
            key={step.label}
            className={`wizard-step-dot ${
              currentStep === idx ? 'active' : currentStep > idx ? 'completed' : ''
            }`}
          >
            <span className="wizard-step-num">
              {currentStep > idx ? '✓' : idx + 1}
            </span>
            <span>
              <span style={{ marginRight: '0.2rem' }}>{step.icon}</span>
              {step.label}
            </span>
            {idx < STEPS.length - 1 && (
              <span style={{ color: 'var(--border-light)', margin: '0 0.25rem' }}>›</span>
            )}
          </div>
        ))}
      </div>

      {/* Bloom counter badge (step 0 only) */}
      {currentStep === 0 && (
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              backgroundColor: canProceed ? 'var(--accent-green)' : totalFlowers > 10 ? '#c0392b' : 'var(--bg-card)',
              color: canProceed || totalFlowers > 10 ? '#FFF' : 'var(--text-muted)',
              border: '1px solid var(--border-light)',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 300ms ease'
            }}
          >
            {totalFlowers} / 6–10 blooms selected
          </span>
        </div>
      )}

      {/* Wizard Step Content */}
      <div style={{ minHeight: '440px', padding: '1rem 0' }}>
        {currentStep === 0 && <StepPickFlowers />}
        {currentStep === 1 && <StepCustomize />}
        {currentStep === 2 && <StepWriteCard />}
        {currentStep === 3 && <StepShare />}
      </div>

      {/* Wizard Footer Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '540px',
          margin: '2rem auto 1rem',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.25rem'
        }}
      >
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="btn btn-secondary"
          >
            ← BACK
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting || (currentStep === 0 && !canProceed)}
          className="btn btn-primary"
        >
          {isSubmitting
            ? 'CREATING…'
            : currentStep === STEPS.length - 1
            ? 'FINISH & VIEW BOUQUET →'
            : 'NEXT →'}
        </button>
      </div>
    </div>
  )
}
