import React from 'react'

export default function Toast({ message }) {
  if (!message) return null

  return (
    <div className="toast-container">
      <div className="toast-bubble">
        {message}
      </div>
    </div>
  )
}
