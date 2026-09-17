import React from 'react'

export default function CardPreview({
  letter = {},
  isEditable = false,
  onChange
}) {
  const recipient = letter?.recipient || ''
  const message = letter?.message || ''
  const sender = letter?.sender || ''

  return (
    <div className="letter-card-wrapper">
      <div className="card-field-row">
        <label className="card-label">Dear</label>
        {isEditable ? (
          <input
            type="text"
            className="card-input"
            value={recipient}
            onChange={(e) => onChange?.('recipient', e.target.value)}
            placeholder="Beloved,"
            maxLength={60}
          />
        ) : (
          <p
            className="font-serif"
            style={{
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: '1.25rem'
            }}
          >
            {recipient || 'Someone Special'}
          </p>
        )}
      </div>

      <div className="card-field-row">
        {isEditable ? (
          <textarea
            className="card-textarea"
            value={message}
            onChange={(e) => onChange?.('message', e.target.value)}
            placeholder="I have so much to tell you, but only this much space on this card! Still, you must know..."
            maxLength={350}
          />
        ) : (
          <p
            className="font-serif"
            style={{
              fontStyle: 'italic',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              whiteSpace: 'pre-line',
              textAlign: 'center',
              padding: '0.75rem 0'
            }}
          >
            {message || 'Sending you a gentle bundle of blooms to brighten your day.'}
          </p>
        )}
      </div>

      <div className="card-sender-align">
        <label className="card-label">Sincerely,</label>
        {isEditable ? (
          <input
            type="text"
            className="card-input"
            value={sender}
            onChange={(e) => onChange?.('sender', e.target.value)}
            placeholder="Secret Admirer"
            maxLength={60}
          />
        ) : (
          <p
            className="font-serif"
            style={{
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: '1.15rem'
            }}
          >
            {sender || 'A Friend'}
          </p>
        )}
      </div>
    </div>
  )
}
