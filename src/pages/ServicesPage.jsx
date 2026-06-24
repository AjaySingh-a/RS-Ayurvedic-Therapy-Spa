import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

const WA_NUMBER = '919528683405'
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'full-body', label: 'Full Body' },
  { key: 'relaxation', label: 'Relaxation' },
  { key: 'pain-relief', label: 'Pain Relief' },
  { key: 'head-foot', label: 'Head & Foot' },
  { key: 'couples', label: 'Couples' },
]

const ALL_SERVICES = [
  {
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop',
    alt: 'Warm oil full body back massage',
    sk: 'Signature · Full body',
    title: 'Full Body Oil Massage',
    desc: 'Our signature head-to-toe massage with warm oil. Long, rhythmic strokes melt away tension, improve circulation and leave the whole body relaxed and recharged.',
    duration: '60–90 min', price: '₹1,200 – ₹1,800', category: 'full-body',
    wa: 'Full Body Oil Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
    alt: 'Gentle relaxation oil massage',
    sk: 'Classic · Relaxation',
    title: 'Swedish Massage',
    desc: 'A gentle, flowing full-body massage with light-to-medium pressure and warm oils. The easiest, most comfortable way to unwind — perfect for first-time guests.',
    duration: '60 min', price: '₹1,000 – ₹1,400', category: 'relaxation',
    wa: 'Swedish Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    alt: 'Deep tissue massage on back and shoulders',
    sk: 'Therapeutic · Firm pressure',
    title: 'Deep Tissue Massage',
    desc: 'Focused, firm-pressure work on knots and chronic tightness in the back, neck and shoulders. Ideal if you sit long hours at a desk or train hard at the gym.',
    duration: '60–90 min', price: '₹1,200 – ₹1,600', category: 'pain-relief',
    wa: 'Deep Tissue Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
    alt: 'Aromatherapy massage with essential oils and candles',
    sk: 'Aroma · Relaxation',
    title: 'Aromatherapy Massage',
    desc: 'A soothing full-body massage with fragrant essential oil blends chosen for your mood — calming, uplifting or refreshing. Soft music, warm oils, pure relaxation.',
    duration: '60 min', price: '₹1,100 – ₹1,500', category: 'relaxation',
    wa: 'Aromatherapy Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop',
    alt: 'Balinese deep relaxation oil massage',
    sk: 'Full body · Deep relax',
    title: 'Balinese Massage',
    desc: 'A rich full-body massage blending long strokes, gentle acupressure and warm oil. Releases deep tension while leaving you calm, loose and completely at ease.',
    duration: '60–90 min', price: '₹1,400 – ₹1,900', category: 'full-body',
    wa: 'Balinese Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=900&auto=format&fit=crop',
    alt: 'Thai oil massage with assisted stretching',
    sk: 'Stretch · Energising',
    title: 'Thai Oil Massage',
    desc: 'Warm-oil massage combined with gentle assisted stretches. Eases stiffness, improves flexibility and leaves the whole body feeling longer, lighter and energised.',
    duration: '60–90 min', price: '₹1,300 – ₹1,800', category: 'full-body',
    wa: 'Thai Oil Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=900&auto=format&fit=crop',
    alt: 'Hot stone massage therapy',
    sk: 'Warmth · Deep relief',
    title: 'Hot Stone Massage',
    desc: 'Smooth heated stones placed along the body and used with warm oil to massage tired muscles. The deep warmth melts tension faster and deeper than hands alone.',
    duration: '60–75 min', price: '₹1,300 – ₹1,800', category: 'pain-relief',
    wa: 'Hot Stone Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    alt: 'Back, neck and shoulder massage',
    sk: 'Targeted · Quick relief',
    title: 'Back, Neck & Shoulder',
    desc: 'A focused massage on the most stubborn problem areas — upper back, neck and shoulders. The perfect quick reset for desk strain, screen time and daily stress.',
    duration: '30–45 min', price: '₹700 – ₹1,100', category: 'pain-relief',
    wa: 'Back, Neck & Shoulder Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=900&auto=format&fit=crop',
    alt: 'Head and scalp champi oil massage',
    sk: 'Express · Head',
    title: 'Head & Champi Massage',
    desc: 'A classic oil champi for the scalp, neck and shoulders. Relieves headaches, calms the mind and is wonderful for hair and sleep. A complete reset in 30 minutes.',
    duration: '30 min', price: '₹500 – ₹800', category: 'head-foot',
    wa: 'Head & Champi Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop',
    alt: 'Foot reflexology pressure point massage',
    sk: 'Reflex · Foot points',
    title: 'Foot Reflexology',
    desc: 'Targeted pressure on the reflex points of the feet that connect to the rest of the body. Improves energy, eases tension and leaves you walking on air.',
    duration: '45 min', price: '₹600 – ₹900', category: 'head-foot',
    wa: 'Foot Reflexology',
  },
  {
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
    alt: 'Couple oil massage in a private room',
    sk: 'Couples · Private room',
    title: 'Couple Massage',
    desc: 'Share a relaxing oil massage side by side in our dedicated couples\' room. Both guests receive the same therapy together — perfect for anniversaries or a shared treat.',
    duration: '60–90 min', price: '₹2,000 – ₹3,200', category: 'couples',
    wa: 'Couple Massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop',
    alt: 'Four hand massage by two therapists',
    sk: 'Luxury · Two therapists',
    title: 'Four-Hand Massage',
    desc: 'Two therapists work in perfect sync for a full-body oil massage. Double the strokes, double the relaxation — our most indulgent way to switch off completely.',
    duration: '60 min', price: '₹2,200 – ₹3,000', category: 'full-body',
    wa: 'Four-Hand Massage',
  },
]

const CAT_LABELS = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]))

export default function ServicesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const filtered = useMemo(() => ALL_SERVICES.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory
    const q = search.toLowerCase()
    const matchSearch = !q ||
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.sk.toLowerCase().includes(q)
    return matchCat && matchSearch
  }), [search, activeCategory])

  const handleTiltMove = e => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`
  }
  const handleTiltLeave = e => { e.currentTarget.style.transform = '' }

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Full Menu</span>
          <h1>All Massages</h1>
          <p className="lead">Our full range of oil massages — from a relaxing full-body session to focused pain relief. Filter by what you need or search by name.</p>
        </div>
      </div>

      <section className="section svc-page-section">
        <div className="wrap">

          <div className="svc-controls rv">
            <div className="svc-search-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                className="svc-search-input"
                placeholder="Search massages…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="svc-search-clear" onClick={() => setSearch('')} aria-label="Clear">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="svc-filter-row">
              {CATEGORIES.map(c => (
                <button
                  key={c.key}
                  className={`fchip${activeCategory === c.key ? ' active' : ''}`}
                  onClick={() => setActiveCategory(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="svc-results-meta rv">
            <span>{filtered.length} {filtered.length === 1 ? 'massage' : 'massages'} found</span>
          </div>

          {filtered.length > 0 ? (
            <div className="svc-grid svc-grid-page">
              {filtered.map(svc => (
                <article
                  key={svc.title}
                  className="svc"
                  onPointerMove={handleTiltMove}
                  onPointerLeave={handleTiltLeave}
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  <div className="svc-img">
                    <img loading="lazy" src={svc.img} alt={svc.alt} />
                    <span className="svc-cat-badge">{CAT_LABELS[svc.category]}</span>
                  </div>
                  <div className="svc-body">
                    <span className="svc-sk">{svc.sk}</span>
                    <h3>{svc.title}</h3>
                    <p>{svc.desc}</p>
                    <div className="svc-foot">
                      <div>
                        <span className="chip">{svc.duration}</span>
                        <span className="svc-price">{svc.price}</span>
                      </div>
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
          ) : (
            <div className="svc-empty">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <p>No massages match your search. Try a different keyword or category.</p>
              <button className="btn btn-ghost" onClick={() => { setSearch(''); setActiveCategory('all') }}>
                Clear filters
              </button>
            </div>
          )}

          <div className="svc-book-cta rv">
            <h3>Not sure which massage is right for you?</h3>
            <p>Message us on WhatsApp — our therapists will suggest the ideal massage based on how you're feeling.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                className="btn btn-gold"
                href="https://wa.me/919528683405?text=Hi!%20I%20need%20help%20choosing%20the%20right%20massage.%20Can%20you%20suggest%20one%20for%20me%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
              <Link to="/booking" className="btn btn-ghost">Book a Session</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
