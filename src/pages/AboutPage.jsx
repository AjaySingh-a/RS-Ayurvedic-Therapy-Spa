import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const VALUES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 21c6-2 8-7 8-13-6 0-11 2-13 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 21c-1-4-1-7 2-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Quality Oils',
    desc: 'We use warm, skin-friendly massage oils and gentle aroma blends — never cheap mineral-oil mixes or harsh synthetic fragrances.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Personalised Care',
    desc: 'Every session begins with a quick chat. We ask about your problem areas, comfort and goals before choosing the right oil, technique and pressure for you.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Clean & Private',
    desc: 'Hygienic private therapy rooms, fresh linen for every guest, and complete privacy throughout your session — guaranteed.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: '2 Min from Metro',
    desc: 'On Nalwa Street near Imperial Cinema — a short walk from Ramakrishna Ashram Marg metro station, Pahar Ganj.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Experienced Therapists',
    desc: 'Trained male and female therapists who understand pressure points, massage techniques and your comfort above all.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Open 24 Hours',
    desc: 'We are open round the clock, every day of the week. Walk-ins welcome any time, advance booking preferred for your preferred slot.',
  },
]

const STATS = [
  { value: '10+', label: 'Years of healing' },
  { value: '12+', label: 'Massage styles' },
  { value: '4.9★', label: 'Google rating' },
  { value: '24/7', label: 'Always open' },
]

export default function AboutPage() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Our Story</span>
          <h1>About RS Therapy Spa</h1>
          <p className="lead">A neighbourhood massage spa with a singular purpose — bringing genuine relaxation and relief to the heart of Pahar Ganj.</p>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="wrap about-grid">
          <div className="rv-l">
            <span className="eyebrow">Who we are</span>
            <h2 style={{ marginTop: '.85rem', fontSize: 'clamp(1.8rem,3.8vw,2.8rem)' }}>Rooted in tradition.<br />Built for today.</h2>
            <p style={{ color: 'var(--cream-dim)', marginTop: '1rem', lineHeight: 1.8 }}>
              RS Therapy Spa was founded with one mission: to make a genuinely good massage accessible in the heart of New Delhi. Nestled on Nalwa Street in Pahar Ganj — just steps from the Ramakrishna Ashram Marg metro — we have been caring for locals, working professionals and travellers from across the world.
            </p>
            <p style={{ color: 'var(--cream-dim)', marginTop: '1rem', lineHeight: 1.8 }}>
              We believe no two bodies are the same, so no two massages should be either. Every visit begins with a quick chat to understand your <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>problem areas</em>, comfort and goals — only then does your therapist choose the right oil, technique and pressure for you.
            </p>
            <p style={{ color: 'var(--cream-dim)', marginTop: '1rem', lineHeight: 1.8 }}>
              We use warm, skin-friendly massage oils and gentle aroma blends for every session. No cheap mineral-oil mixes. No harsh synthetic fragrances. Just a clean, relaxing massage done well.
            </p>
          </div>
          <div className="about-img-wrap rv-r">
            <img
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1000&auto=format&fit=crop"
              alt="Relaxing oil massage session at the spa"
              style={{ width: '100%', borderRadius: 'var(--radius)', objectFit: 'cover', aspectRatio: '4/5', border: '1px solid var(--line)' }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="about-stats-bar">
        <div className="wrap about-stats">
          {STATS.map((s, i) => (
            <div key={i} className="about-stat rv">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow">Why guests choose us</span>
            <h2>Small spa. Serious care.</h2>
          </div>
          <div className="why-grid stagger">
            {VALUES.map((v, i) => (
              <div key={i} className="why rv">
                <div className="ic">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--ink-2)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Ready to experience it?</span>
          <h2 style={{ marginTop: '.85rem', fontSize: 'clamp(1.8rem,3.8vw,2.6rem)' }}>Your healing begins here</h2>
          <p style={{ color: 'var(--cream-dim)', marginTop: '.8rem', maxWidth: '44ch', margin: '.8rem auto 0' }}>
            Book your session online or walk in — we're open 24 hours, every day of the week.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/booking" className="btn btn-gold">
              Book a Session
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/services" className="btn btn-ghost">View All Massages</Link>
          </div>
        </div>
      </section>
    </>
  )
}
