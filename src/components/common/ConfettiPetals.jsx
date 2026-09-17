import React, { useEffect, useRef } from 'react'

export default function ConfettiPetals() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = [
      '#fafaf5',
      '#e8f0e8',
      '#f5ecd2',
      '#fce4ec',
      '#e0f0f8',
      '#f0e6e8',
      '#e5ebe0',
      '#f8f4e8'
    ]

    const spawns = [
      { x: 0.2, y: 0.45 },
      { x: 0.4, y: 0.5 },
      { x: 0.5, y: 0.45 },
      { x: 0.6, y: 0.5 },
      { x: 0.8, y: 0.45 }
    ]

    const particles = Array.from({ length: 150 }, () => {
      const sp = spawns[Math.floor(Math.random() * spawns.length)]
      const angle = Math.random() * Math.PI * 2
      const speed = (2 + 3 * Math.random()) * (0.6 + 0.8 * Math.random())
      return {
        x: sp.x * canvas.width + (Math.random() - 0.5) * 40,
        y: sp.y * canvas.height + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2.5 + 2.5 * Math.random()
      }
    })

    const startTime = performance.now()
    let animationFrameId

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000
      const alphaMultiplier = elapsed < 3.2 ? 1 : Math.max(0, 1 - (elapsed - 3.2) / 0.8)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.vx *= 0.998

        if (alphaMultiplier > 0) {
          ctx.globalAlpha = 0.85 * alphaMultiplier
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1

      if (elapsed < 4.2) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animationFrameId = requestAnimationFrame(render)

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999
      }}
    />
  )
}
