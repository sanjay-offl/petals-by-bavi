export const FLOWERS = [
  {
    id: 1,
    name: 'orchid',
    displayName: 'Orchid',
    meaning: 'Beauty & Luxury',
    birthMonth: 'October',
    size: 'medium',
    color: '#b274d1'
  },
  {
    id: 2,
    name: 'tulip',
    displayName: 'Tulip',
    meaning: 'Perfect Love',
    birthMonth: 'April',
    size: 'medium',
    color: '#e8a33d'
  },
  {
    id: 3,
    name: 'dahlia',
    displayName: 'Dahlia',
    meaning: 'Elegance & Dignity',
    birthMonth: 'August',
    size: 'small',
    color: '#d96f8f'
  },
  {
    id: 4,
    name: 'anemone',
    displayName: 'Anemone',
    meaning: 'Anticipation & Protection',
    birthMonth: 'September',
    size: 'medium',
    color: '#9d6bbf'
  },
  {
    id: 5,
    name: 'carnation',
    displayName: 'Carnation',
    meaning: 'Fascination & Devotion',
    birthMonth: 'January',
    size: 'large',
    color: '#e06666'
  },
  {
    id: 6,
    name: 'zinnia',
    displayName: 'Zinnia',
    meaning: 'Lasting Affection',
    birthMonth: 'July',
    size: 'medium',
    color: '#e97451'
  },
  {
    id: 7,
    name: 'ranunculus',
    displayName: 'Ranunculus',
    meaning: 'Radiant Charm',
    birthMonth: 'March',
    size: 'medium',
    color: '#e9b0c4'
  },
  {
    id: 8,
    name: 'sunflower',
    displayName: 'Sunflower',
    meaning: 'Adoration & Loyalty',
    birthMonth: 'August',
    size: 'large',
    color: '#f2b01e'
  },
  {
    id: 9,
    name: 'lily',
    displayName: 'Lily',
    meaning: 'Purity & Rebirth',
    birthMonth: 'May',
    size: 'large',
    color: '#f2d98a'
  },
  {
    id: 10,
    name: 'daisy',
    displayName: 'Daisy',
    meaning: 'Innocence & Cheerfulness',
    birthMonth: 'April',
    size: 'small',
    color: '#f2f0e6'
  },
  {
    id: 11,
    name: 'peony',
    displayName: 'Peony',
    meaning: 'Romance & Good Fortune',
    birthMonth: 'May',
    size: 'medium',
    color: '#f0a6c4'
  },
  {
    id: 12,
    name: 'rose',
    displayName: 'Rose',
    meaning: 'Love & Deep Passion',
    birthMonth: 'June',
    size: 'medium',
    color: '#e56b7f'
  }
]

export function getFlowerById(id) {
  return FLOWERS.find((f) => f.id === Number(id)) || null
}

export function getFlowerImagePath(flowerName, mode = 'color') {
  return `/assets/flowers/${mode}/${flowerName}.webp`
}

export function getBushBgPath(greeneryIndex = 0, mode = 'color') {
  const num = (greeneryIndex % 3) + 1
  return `/assets/bush/${mode}/bush-${num}.png`
}

export function getBushTopPath(greeneryIndex = 0, mode = 'color') {
  const num = (greeneryIndex % 3) + 1
  return `/assets/bush/${mode}/bush-${num}-top.png`
}

export function getFlowerPixelSize(size) {
  switch (size) {
    case 'small':
      return 90
    case 'large':
      return 170
    case 'medium':
    default:
      return 130
  }
}
