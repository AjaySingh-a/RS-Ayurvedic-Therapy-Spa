import { useState } from 'react'
import { FAQS } from '../lib/schema'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Common questions</span>
          <h2>Frequently asked questions</h2>
          <p>Everything guests usually ask before their first visit to RS Therapy Spa in Pahar Ganj.</p>
        </div>

        <div className="faq-list rv" style={{ maxWidth: '52rem', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--ink-2)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.1rem 1.4rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--cream)',
                    textAlign: 'left',
                    font: 'inherit',
                    fontWeight: 600,
                  }}
                >
                  <span>{f.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    style={{ flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  >
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <p style={{ padding: '0 1.4rem 1.2rem', color: 'var(--cream-dim)', lineHeight: 1.7 }}>
                    {f.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
