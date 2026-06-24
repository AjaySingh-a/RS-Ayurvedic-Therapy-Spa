import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const LEAVES = [
  { left: '8%', top: '24%', t: '14s', dl: '0s', size: 26 },
  { left: '30%', top: '70%', t: '18s', dl: '3s', size: 20 },
  { left: '55%', top: '18%', t: '16s', dl: '6s', size: 18 },
  { left: '72%', top: '78%', t: '20s', dl: '1.5s', size: 24 },
]

const PETAL_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

export default function Hero() {
  useEffect(() => {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        cio.unobserve(e.target)
        const to = +e.target.dataset.to
        const dur = 1200, t0 = performance.now()
        ;(function tick(t) {
          const p = Math.min((t - t0) / dur, 1)
          e.target.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)))
          if (p < 1) requestAnimationFrame(tick)
        })(t0)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.count').forEach(el => cio.observe(el))
    return () => cio.disconnect()
  }, [])

  return (
    <header className="hero" id="top">
      <svg className="mandala" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <g stroke="#E2A93B" strokeWidth="1" opacity=".55">
          <circle cx="300" cy="300" r="290" />
          <circle cx="300" cy="300" r="240" strokeDasharray="4 10" />
          <circle cx="300" cy="300" r="190" />
          <circle cx="300" cy="300" r="140" strokeDasharray="2 8" />
          <circle cx="300" cy="300" r="90" />
        </g>
        <g stroke="#8FBE7F" strokeWidth="1" opacity=".6">
          {PETAL_ANGLES.map(deg => (
            <path
              key={deg}
              d="M300 60c30 60 30 120 0 180-30-60-30-120 0-180Z"
              transform={deg ? `rotate(${deg} 300 300)` : undefined}
            />
          ))}
        </g>
      </svg>

      {LEAVES.map((l, i) => (
        <svg
          key={i}
          className="flt"
          style={{ left: l.left, top: l.top, '--t': l.t, '--dl': l.dl }}
          width={l.size}
          height={l.size}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M12 21c6-2 8-7 8-13-6 0-11 2-13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ))}

      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow h-anim" style={{ '--d': '.1s' }}>Pahar Ganj · New Delhi</span>
          <h1 className="h-anim" style={{ '--d': '.22s' }}>
            Ancient healing,<br />for the <em>modern body</em>
          </h1>
          <p className="lead h-anim" style={{ '--d': '.38s' }}>
            Relaxing oil massage done right — warm oils, skilled hands and time-honoured techniques, two minutes from Ramakrishna Ashram Marg metro.
          </p>
          <div className="hero-ctas h-anim" style={{ '--d': '.52s' }}>
            <Link className="btn btn-gold" to="/booking">
              Book your session
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link className="btn btn-ghost" to="/services">Explore therapies</Link>
          </div>
          <div className="hero-stats h-anim" style={{ '--d': '.68s' }}>
            <div>
              <b><span className="count" data-to="12">0</span>+</b>
              <span>Massage styles</span>
            </div>
            <div>
              <b><span className="count" data-to="100">0</span>%</b>
              <span>Pure oils</span>
            </div>
            <div>
              <b><span className="count" data-to="24">0</span> hrs</b>
              <span>Open daily</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1100&auto=format&fit=crop"
            alt="Warm oil full body back massage"
          />
          <div className="hero-badge">
            <span>Signature</span>
            Full Body Oil Massage — warm oil, head to toe
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true" />
    </header>
  )
}
