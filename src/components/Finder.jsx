import { useState, useRef } from 'react'

const WA_NUMBER = '919528683405'
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const FINDER_DATA = {
  stress: {
    tag: 'Recommended for stress & sleep',
    title: 'Shirodhara',
    desc: 'A warm, steady stream of medicated oil over the forehead quiets the nervous system within minutes. Most guests describe it as the deepest calm they\'ve ever felt — and report far better sleep that night.',
  },
  pain: {
    tag: 'Recommended for pain & stiffness',
    title: 'Potli + Deep Tissue',
    desc: 'Heated herbal compresses loosen stiff joints, followed by focused deep-tissue work on stubborn knots. The combination our therapists trust most for chronic back, neck and shoulder pain.',
  },
  tired: {
    tag: 'Recommended for low energy',
    title: 'Abhyanga',
    desc: 'The classic warm-oil full-body ritual. Long, rhythmic strokes boost circulation and lymphatic flow — guests typically leave feeling lighter, looser and genuinely recharged.',
  },
  quick: {
    tag: 'Recommended when short on time',
    title: 'Head, Neck & Foot Therapy',
    desc: 'An express champi-style head massage with shoulder release and foot reflexology. A complete reset in 30–45 minutes — perfect between trains, meetings or sightseeing.',
  },
  first: {
    tag: 'Recommended for first-timers',
    title: 'Swedish Relaxation',
    desc: 'Gentle, flowing strokes with aromatic oils and light-to-medium pressure. The easiest, most comfortable introduction to spa therapy — and you can always go deeper next visit.',
  },
}

const CHIPS = [
  { key: 'stress', label: '😮‍💨 Stress & poor sleep' },
  { key: 'pain', label: '💢 Body pain & stiffness' },
  { key: 'tired', label: '🔋 Tired & low energy' },
  { key: 'quick', label: '⏱️ Only 30–45 minutes' },
  { key: 'first', label: '🌿 First time at a spa' },
]

export default function Finder() {
  const [active, setActive] = useState('stress')
  const boxRef = useRef(null)

  const data = FINDER_DATA[active]

  const handleChip = key => {
    setActive(key)
    if (boxRef.current) {
      boxRef.current.classList.remove('fade-swap')
      void boxRef.current.offsetWidth
      boxRef.current.classList.add('fade-swap')
    }
  }

  return (
    <section className="finder section" id="finder">
      <div className="wrap finder-grid">
        <div className="rv-l">
          <span className="eyebrow">Not sure where to start?</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.8vw,2.7rem)', margin: '.85rem 0 1rem' }}>
            Tell us how you feel.<br />We'll suggest the therapy.
          </h2>
          <p style={{ color: 'var(--cream-dim)', maxWidth: '44ch' }}>
            Pick what describes you best today, and we'll recommend the ritual our therapists would suggest — then send your choice straight to us on WhatsApp.
          </p>
          <div className="chips">
            {CHIPS.map(c => (
              <button
                key={c.key}
                className={`fchip${active === c.key ? ' active' : ''}`}
                onClick={() => handleChip(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="finder-result rv-r" ref={boxRef}>
          <span className="svc-sk">{data.tag}</span>
          <h3>{data.title}</h3>
          <p>{data.desc}</p>
          <a
            className="btn btn-gold"
            target="_blank"
            rel="noopener noreferrer"
            href={waLink(`Hi! Your website recommended ${data.title} for me. Could you share details and availability?`)}
          >
            Ask about {data.title} on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
