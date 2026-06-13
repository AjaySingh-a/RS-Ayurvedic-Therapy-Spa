import { useEffect } from 'react'

const WA_NUMBER = '918920826570'
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const SERVICES = [
  {
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
    alt: 'Spa setting with towels, candles and oils',
    sk: 'अभ्यंग · Full body',
    title: 'Abhyanga',
    desc: 'Our signature full-body massage with warm, dosha-balancing herbal oils. Long rhythmic strokes ease tension, improve circulation and deeply nourish the skin.',
    duration: '60–90 min',
    wa: 'Abhyanga (warm oil full-body massage)',
  },
  {
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=900&auto=format&fit=crop',
    alt: 'Herbal oil being poured',
    sk: 'शिरोधारा · Mind & sleep',
    title: 'Shirodhara',
    desc: 'A steady stream of warm medicated oil poured gently over the forehead. Deeply calming — loved by guests dealing with stress, anxiety and restless sleep.',
    duration: '45–60 min',
    wa: 'Shirodhara (forehead oil-stream therapy)',
  },
  {
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop',
    alt: 'Warm herbal compress and spa stones',
    sk: 'पोटली · Pain relief',
    title: 'Potli Massage',
    desc: 'Heated herbal pouches pressed along the body\'s marma points. Wonderful for joint pain, stiffness and muscle recovery after long days on your feet.',
    duration: '60 min',
    wa: 'Potli (herbal compress) massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    alt: 'Deep tissue massage on shoulders',
    sk: 'Therapeutic · Firm pressure',
    title: 'Deep Tissue',
    desc: 'Focused, firm-pressure work on knots and chronic tightness in the back, neck and shoulders. Ideal if you sit long hours or train hard.',
    duration: '60–90 min',
    wa: 'Deep Tissue massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
    alt: 'Relaxing aromatherapy oils',
    sk: 'Classic · Relaxation',
    title: 'Swedish Relaxation',
    desc: 'A gentle, flowing aromatherapy massage for pure unwinding. Light-to-medium pressure, soft music and warm oils — perfect for first-time spa guests.',
    duration: '60 min',
    wa: 'Swedish relaxation massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=900&auto=format&fit=crop',
    alt: 'Head and shoulder massage',
    sk: 'Express · Quick reset',
    title: 'Head, Neck & Foot Therapy',
    desc: 'Express champi-style head massage with neck, shoulder and foot reflexology. A 30-minute reset between meetings, trains or sightseeing in Pahar Ganj.',
    duration: '30–45 min',
    wa: 'Head, neck & foot therapy',
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
          <span className="eyebrow">Our therapies</span>
          <h2>Rituals rooted in Ayurveda</h2>
          <p>Every session begins with a short consultation, so the therapy, oils and pressure are matched to your body — not the other way around.</p>
        </div>
        <div className="svc-grid stagger">
          {SERVICES.map((svc, i) => (
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
                    href={waLink(`Hi RS Ayurvedic Therapy Spa! I'd like to know more about the ${svc.wa}. Could you share details and availability?`)}
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
      </div>
    </section>
  )
}
