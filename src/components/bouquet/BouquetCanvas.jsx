import React, { useMemo } from 'react'
import {
  getFlowerById,
  getFlowerImagePath,
  getBushBgPath,
  getBushTopPath
} from '../../data/flowers'

export default function BouquetCanvas({
  bouquet,
  isCompact = false,
  className = ''
}) {
  const mode = bouquet?.mode || 'color'
  const greenery = bouquet?.greenery ?? 0
  const flowers = bouquet?.flowers || []
  const flowerOrder = bouquet?.flowerOrder || []

  const bushBgUrl = getBushBgPath(greenery, mode)
  const bushTopUrl = getBushTopPath(greenery, mode)

  // Expand flowers by counts with order & rotation
  const renderedFlowerList = useMemo(() => {
    const list = []
    flowers.forEach((group, groupIdx) => {
      const flower = getFlowerById(group.id)
      if (!flower) return
      for (let i = 0; i < group.count; i++) {
        const globalIdx = list.length
        const orderVal =
          flowerOrder.length > globalIdx && flowerOrder[globalIdx] !== undefined
            ? flowerOrder[globalIdx]
            : globalIdx
        // Deterministic rotational jitter (-5deg to +5deg)
        const rot = ((groupIdx * 9 + i * 13) % 11) - 5

        list.push({
          key: `${group.id}-${i}`,
          flower,
          order: orderVal,
          rotate: rot,
          size: flower.size
        })
      }
    })

    list.sort((a, b) => a.order - b.order)
    return list
  }, [flowers, flowerOrder])

  const getWidthForSize = (size) => {
    if (isCompact) {
      switch (size) {
        case 'small':
          return 48
        case 'large':
          return 74
        case 'medium':
        default:
          return 60
      }
    }
    switch (size) {
      case 'small':
        return 88
      case 'large':
        return 140
      case 'medium':
      default:
        return 112
    }
  }

  return (
    <div
      className={`bouquet-display-stage ${className}`}
      style={isCompact ? { height: '220px', maxWidth: '300px', margin: '0 auto' } : {}}
    >
      {/* 1. Bush Background Layer */}
      <img
        src={bushBgUrl}
        alt="bush background"
        className="bush-bg-layer"
        style={isCompact ? { width: '280px', height: '220px' } : {}}
        loading="eager"
      />

      {/* 2. Layered Arranged Flowers */}
      <div
        className="bush-flowers-container"
        style={
          isCompact
            ? {
                width: '220px',
                marginTop: '-15px',
                marginLeft: '-4px'
              }
            : {}
        }
      >
        {renderedFlowerList.map((item) => {
          const w = getWidthForSize(item.size)
          return (
            <div
              key={item.key}
              className="bouquet-flower-stem"
              style={{
                order: item.order,
                margin: isCompact ? '-10px -8px' : '-16px -12px'
              }}
            >
              <img
                src={getFlowerImagePath(item.flower.name, mode)}
                alt={item.flower.displayName}
                style={{
                  width: `${w}px`,
                  height: `${w}px`,
                  transform: `rotate(${item.rotate}deg)`
                }}
                loading="eager"
              />
            </div>
          )
        })}
      </div>

      {/* 3. Color mode uses a separate front sleeve; mono assets are complete illustrations. */}
      {bushTopUrl && (
        <img
          src={bushTopUrl}
          alt="bush top"
          className="bush-top-layer"
          style={isCompact ? { width: '280px', height: '220px' } : {}}
          loading="eager"
        />
      )}
    </div>
  )
}
