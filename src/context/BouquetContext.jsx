import React, { createContext, useContext, useState, useMemo } from 'react'

const BouquetContext = createContext(null)

export function BouquetProvider({ children }) {
  const [mode, setMode] = useState('color')
  const [greenery, setGreenery] = useState(0)
  const [flowers, setFlowers] = useState([])
  const [flowerOrder, setFlowerOrder] = useState([])
  const [letter, setLetter] = useState({
    recipient: '',
    message: '',
    sender: ''
  })
  const [timestamp, setTimestamp] = useState(Date.now())

  // Total flower count
  const totalFlowers = useMemo(() => {
    return flowers.reduce((sum, f) => sum + (f.count || 0), 0)
  }, [flowers])

  // Valid bloom count (6 to 10)
  const canProceed = useMemo(() => {
    return totalFlowers >= 6 && totalFlowers <= 10
  }, [totalFlowers])

  // Build a default order array matching the current expanded flowers
  const rebuildOrder = (newFlowers) => {
    const total = newFlowers.reduce((sum, f) => sum + f.count, 0)
    return Array.from({ length: total }, (_, i) => i)
  }

  // Add a flower
  const addFlower = (flower) => {
    setFlowers((prev) => {
      const curTotal = prev.reduce((sum, f) => sum + f.count, 0)
      if (curTotal >= 10) {
        return prev // max 10 flowers allowed
      }
      const existing = prev.find((f) => f.id === flower.id)
      let next
      if (existing) {
        next = prev.map((f) =>
          f.id === flower.id ? { ...f, count: f.count + 1 } : f
        )
      } else {
        next = [...prev, { id: flower.id, count: 1 }]
      }
      setFlowerOrder(rebuildOrder(next))
      return next
    })
  }

  // Remove one instance of a flower
  const removeFlower = (flowerId) => {
    setFlowers((prev) => {
      const existing = prev.find((f) => f.id === flowerId)
      if (!existing) return prev
      let next
      if (existing.count <= 1) {
        next = prev.filter((f) => f.id !== flowerId)
      } else {
        next = prev.map((f) =>
          f.id === flowerId ? { ...f, count: f.count - 1 } : f
        )
      }
      setFlowerOrder(rebuildOrder(next))
      return next
    })
  }

  // Shuffle flower arrangement order (Fisher-Yates)
  const shuffleOrder = () => {
    setFlowerOrder((prev) => {
      const arr = [...prev]
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    })
  }

  // Cycle greenery (0, 1, 2)
  const cycleGreenery = () => {
    setGreenery((prev) => (prev + 1) % 3)
  }

  // Update letter field
  const updateLetter = (field, val) => {
    setLetter((prev) => ({ ...prev, [field]: val }))
  }

  // Reset bouquet to clean state
  const resetBouquet = (newMode = 'color') => {
    setMode(newMode)
    setGreenery(0)
    setFlowers([])
    setFlowerOrder([])
    setLetter({ recipient: '', message: '', sender: '' })
    setTimestamp(Date.now())
  }

  // Load a bouquet state (e.g. from an existing shared bouquet)
  const loadBouquet = (data) => {
    if (!data) return
    if (data.mode) setMode(data.mode)
    if (typeof data.greenery === 'number') setGreenery(data.greenery)
    if (Array.isArray(data.flowers)) setFlowers(data.flowers)
    if (Array.isArray(data.flowerOrder)) setFlowerOrder(data.flowerOrder)
    if (data.letter) setLetter(data.letter)
    if (data.timestamp) setTimestamp(data.timestamp)
  }

  const value = {
    bouquet: {
      mode,
      greenery,
      flowers,
      flowerOrder,
      letter,
      timestamp
    },
    mode,
    setMode,
    greenery,
    setGreenery,
    flowers,
    flowerOrder,
    letter,
    totalFlowers,
    canProceed,
    addFlower,
    removeFlower,
    shuffleOrder,
    cycleGreenery,
    updateLetter,
    resetBouquet,
    loadBouquet
  }

  return (
    <BouquetContext.Provider value={value}>
      {children}
    </BouquetContext.Provider>
  )
}

export function useBouquet() {
  const context = useContext(BouquetContext)
  if (!context) {
    throw new Error('useBouquet must be used within a BouquetProvider')
  }
  return context
}
