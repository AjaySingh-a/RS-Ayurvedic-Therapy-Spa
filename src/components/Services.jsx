import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const WA_NUMBER = '919528683405'
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const FEATURED = [
  {
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop',
    alt: 'Warm oil full body back massage',
    sk: 'Signature · Full body',
    title: 'Full Body Oil Massage',
    desc: 'Our signature head-to-toe massage with warm oil. Long, rhythmic strokes ease tension, improve circulation and leave the whole body relaxed and recharged.',
    duration: '60–90 min',
    wa: 'Full Body Oil Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    alt: 'Deep tissue massage on back and shoulders',
    sk: 'Therapeutic · Pain relief',
    title: 'Deep Tissue Massage',
    desc: 'Focused, firm-pressure work on knots and chronic tightness in the back, neck and shoulders. Ideal if you sit long hours at a desk or train hard.',
    duration: '60–90 min',
    wa: 'Deep Tissue Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
    alt: 'Aromatherapy relaxation oil massage',
    sk: 'Aroma · Relaxation',
    title: 'Aromatherapy Massage',
    desc: 'A soothing full-body massage with fragrant essential oil blends chosen for your mood. Soft music, warm oils and pure relaxation from start to finish.',
    duration: '60 min',
    wa: 'Aromatherapy Massage',
  },
]

export default function Services() {
  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const cards = document.querySelectorAll('.tilt')
    const handlers = []
    cards.forEach(card => {
      const move = e => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        card.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`
      }
      const leave = () => { card.style.transform = '' }
      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', leave)
      handlers.push({ card, move, leave })
    })
    return () => handlers.forEach(({ card, move, leave }) => {
      card.removeEventListener('pointermove', move)
      card.removeEventListener('pointerleave', leave)
    })
  }, [])

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Our massages</span>
          <h2>Massage, made simple</h2>
          <p>Every session begins with a quick chat, so the massage, oil and pressure are matched to your body — not the other way around.</p>
        </div>

        <div className="svc-grid stagger">
          {FEATURED.map((svc, i) => (
            <article key={i} className="svc rv tilt">
              <div className="svc-img">
                <img loading="lazy" src={svc.img} alt={svc.alt} />
              </div>
              <div className="svc-body">
                <span className="svc-sk">{svc.sk}</span>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <div className="svc-foot">
                  <span className="chip">{svc.duration}</span>
                  <a
                    href={waLink(`Hi RS Therapy Spa! I'd like to know more about the ${svc.wa}. Could you share details and availability?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enquire →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="svc-view-all rv">
          <p>Explore our full menu of relaxing &amp; therapeutic oil massages</p>
          <Link to="/services" className="btn btn-gold">
            View All Massages
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
