import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

const WA_NUMBER = '919528683405'
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'relaxation', label: 'Relaxation' },
  { key: 'pain-relief', label: 'Pain Relief' },
  { key: 'mind-sleep', label: 'Mind & Sleep' },
  { key: 'detox', label: 'Detox' },
  { key: 'face-beauty', label: 'Face & Beauty' },
  { key: 'couples', label: 'Couples' },
]

const ALL_SERVICES = [
  {
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
    alt: 'Spa setting with towels, candles and oils',
    sk: 'अभ्यंग · Full body',
    title: 'Abhyanga',
    desc: 'Our signature full-body massage with warm, dosha-balancing herbal oils. Long rhythmic strokes ease tension, improve circulation and deeply nourish the skin.',
    duration: '60–90 min', price: '₹1,200 – ₹1,800', category: 'relaxation',
    wa: 'Abhyanga (warm oil full-body massage)',
  },
  {
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=900&auto=format&fit=crop',
    alt: 'Herbal oil being poured over forehead',
    sk: 'शिरोधारा · Mind & sleep',
    title: 'Shirodhara',
    desc: 'A steady stream of warm medicated oil poured gently over the forehead. Deeply calming — loved by guests dealing with stress, anxiety and restless sleep.',
    duration: '45–60 min', price: '₹1,500 – ₹2,000', category: 'mind-sleep',
    wa: 'Shirodhara (forehead oil-stream therapy)',
  },
  {
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop',
    alt: 'Warm herbal compress pouches',
    sk: 'पोटली · Pain relief',
    title: 'Potli Massage',
    desc: 'Heated herbal pouches pressed along the body\'s marma points. Wonderful for joint pain, stiffness and muscle recovery after long days on your feet.',
    duration: '60 min', price: '₹1,100 – ₹1,500', category: 'pain-relief',
    wa: 'Potli (herbal compress) massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    alt: 'Deep tissue massage on back and shoulders',
    sk: 'Therapeutic · Firm pressure',
    title: 'Deep Tissue',
    desc: 'Focused, firm-pressure work on knots and chronic tightness in the back, neck and shoulders. Ideal if you sit long hours or train hard.',
    duration: '60–90 min', price: '₹1,000 – ₹1,500', category: 'pain-relief',
    wa: 'Deep Tissue massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
    alt: 'Aromatherapy relaxation massage',
    sk: 'Classic · Relaxation',
    title: 'Swedish Relaxation',
    desc: 'A gentle, flowing aromatherapy massage for pure unwinding. Light-to-medium pressure, soft music and warm oils — perfect for first-time spa guests.',
    duration: '60 min', price: '₹900 – ₹1,200', category: 'relaxation',
    wa: 'Swedish relaxation massage',
  },
  {
    img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=900&auto=format&fit=crop',
    alt: 'Head and shoulder champi massage',
    sk: 'Express · Quick reset',
    title: 'Head, Neck & Foot',
    desc: 'Express champi-style head massage with neck, shoulder and foot reflexology. A 30-minute reset between meetings, trains or sightseeing in Pahar Ganj.',
    duration: '30–45 min', price: '₹600 – ₹900', category: 'relaxation',
    wa: 'Head, neck & foot therapy',
  },
  {
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop',
    alt: 'Panchakarma Ayurvedic detox session',
    sk: 'पंचकर्म · Deep cleanse',
    title: 'Panchakarma Detox',
    desc: 'The cornerstone of Ayurvedic medicine — a comprehensive internal cleansing programme with specialised therapies and herbal preparations to completely reset the body.',
    duration: '90–120 min', price: '₹2,500 – ₹4,000', category: 'detox',
    wa: 'Panchakarma detox treatment',
  },
  {
    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=900&auto=format&fit=crop',
    alt: 'Herbal powder dry massage',
    sk: 'उद्वर्तन · Toning',
    title: 'Udvartana',
    desc: 'A vigorous dry herbal powder massage that exfoliates dead skin, stimulates lymph drainage and tones the body. Leaves skin smooth, bright and deeply refreshed.',
    duration: '45–60 min', price: '₹1,000 – ₹1,400', category: 'detox',
    wa: 'Udvartana (herbal powder massage)',
  },
  {
    img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=900&auto=format&fit=crop',
    alt: 'Kizhi herbal bolus therapy',
    sk: 'किझि · Heat therapy',
    title: 'Kizhi',
    desc: 'Warm herbal pouches filled with medicinal leaves and rice rhythmically applied over the body. Highly effective for arthritis, neurological issues and sports injuries.',
    duration: '60 min', price: '₹1,200 – ₹1,800', category: 'pain-relief',
    wa: 'Kizhi herbal pouch therapy',
  },
  {
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop',
    alt: 'Nasal Ayurvedic cleanse therapy',
    sk: 'नस्यम · Nasal cleanse',
    title: 'Nasyam',
    desc: 'Medicated oils and herbal preparations administered through the nostrils to clear sinus congestion, relieve headaches and sharpen mental clarity.',
    duration: '30–45 min', price: '₹800 – ₹1,200', category: 'detox',
    wa: 'Nasyam (nasal cleanse therapy)',
  },
  {
    img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=900&auto=format&fit=crop',
    alt: 'Eye treatment with medicated ghee',
    sk: 'नेत्र तर्पण · Eye care',
    title: 'Netra Tarpana',
    desc: 'Warm medicated ghee pooled around the eyes in a dough ring. Relieves digital eye strain, dryness and blurred vision — ideal for those on screens all day.',
    duration: '30 min', price: '₹800 – ₹1,000', category: 'face-beauty',
    wa: 'Netra Tarpana (eye treatment)',
  },
  {
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop',
    alt: 'Lower back oil pool therapy',
    sk: 'कटि वस्ति · Back care',
    title: 'Kati Vasti',
    desc: 'Warm medicated oil retained in a dough ring placed on the lower back. Highly targeted relief for lumbar pain, disc complaints and sciatica.',
    duration: '45 min', price: '₹900 – ₹1,300', category: 'pain-relief',
    wa: 'Kati Vasti (lower back oil therapy)',
  },
  {
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
    alt: 'Royal continuous oil bath therapy',
    sk: 'पिझिचिल · Royal bath',
    title: 'Pizhichil',
    desc: 'Warm medicated oil poured in continuous streams while two therapists massage simultaneously. Called the "King of Ayurvedic therapies" — the ultimate luxury ritual.',
    duration: '60–90 min', price: '₹2,200 – ₹3,000', category: 'relaxation',
    wa: 'Pizhichil (royal oil bath)',
  },
  {
    img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=900&auto=format&fit=crop',
    alt: 'Ayurvedic herbal facial treatment',
    sk: 'मुख लेपम · Glow facial',
    title: 'Mukha Lepam',
    desc: 'An Ayurvedic face mask using herb pastes matched to your skin type, combined with a soothing face massage with herbal oils. Natural radiance, no harsh chemicals.',
    duration: '45–60 min', price: '₹900 – ₹1,400', category: 'face-beauty',
    wa: 'Mukha Lepam (Ayurvedic facial)',
  },
  {
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=900&auto=format&fit=crop',
    alt: 'Foot reflexology pressure point treatment',
    sk: 'Reflexology · Foot points',
    title: 'Reflexology',
    desc: 'Targeted pressure on reflex points of the feet corresponding to organs and body systems. Improves energy flow, reduces tension and leaves you walking on air.',
    duration: '45–60 min', price: '₹700 – ₹1,000', category: 'relaxation',
    wa: 'Reflexology (foot point therapy)',
  },
  {
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop',
    alt: 'Hot basalt stone massage therapy',
    sk: 'Hot Stone · Deep warmth',
    title: 'Hot Stone Therapy',
    desc: 'Smooth heated basalt stones placed on energy centres and used to massage the body. The deep warmth melts muscle tension faster than hands alone.',
    duration: '60–75 min', price: '₹1,200 – ₹1,800', category: 'pain-relief',
    wa: 'Hot Stone therapy',
  },
  {
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
    alt: 'Couple spa massage in private room',
    sk: 'Couples · Together',
    title: 'Couple Massage',
    desc: 'Share a rejuvenating session in our dedicated couples\' room. Both guests receive the same therapy side by side — perfect for anniversaries, honeymoons or a shared reset.',
    duration: '60–90 min', price: '₹2,000 – ₹3,200', category: 'couples',
    wa: 'Couple massage session',
  },
  {
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    alt: 'Marma vital energy point stimulation',
    sk: 'मर्म · Energy points',
    title: 'Marma Therapy',
    desc: 'Gentle stimulation of the 107 vital energy points of the body. Releases blocked prana, sharpens focus and creates a sense of calm alertness that lasts for days.',
    duration: '60–75 min', price: '₹1,400 – ₹1,900', category: 'mind-sleep',
    wa: 'Marma therapy (energy point stimulation)',
  },
  {
    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=900&auto=format&fit=crop',
    alt: 'Navarakizhi medicated rice pouch massage',
    sk: 'नवरकिझि · Nourishing',
    title: 'Navarakizhi',
    desc: 'Warm boluses of cooked medicated rice massaged over the body. Deeply nourishing for muscles and nerves — recommended for weakness, muscle wasting and post-illness recovery.',
    duration: '60–75 min', price: '₹1,500 – ₹2,200', category: 'relaxation',
    wa: 'Navarakizhi (milk rice pouch massage)',
  },
  {
    img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=900&auto=format&fit=crop',
    alt: 'Neck and upper back oil pool therapy',
    sk: 'ग्रीवा वस्ति · Neck care',
    title: 'Greeva Vasti',
    desc: 'Warm medicated oil retained in a dough frame placed on the neck and upper back. Gold standard for cervical spondylosis, neck stiffness and upper back tension.',
    duration: '45 min', price: '₹900 – ₹1,300', category: 'pain-relief',
    wa: 'Greeva Vasti (neck oil therapy)',
  },
  {
    img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=900&auto=format&fit=crop',
    alt: 'Knee joint oil pool therapy',
    sk: 'जानु वस्ति · Knee care',
    title: 'Janu Vasti',
    desc: 'Warm medicated oil pooled on the knees in a specially crafted dough ring. Highly effective for knee arthritis, ligament issues and pain from prolonged sitting or standing.',
    duration: '45 min', price: '₹900 – ₹1,300', category: 'pain-relief',
    wa: 'Janu Vasti (knee oil therapy)',
  },
  {
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop',
    alt: 'Chakra balancing meditation and massage',
    sk: 'Chakra · Energy balance',
    title: 'Chakra Balancing',
    desc: 'A meditative session combining essential oil blends, warm stones on the seven chakra points and rhythmic massage. Leaves you centred, grounded and emotionally clear.',
    duration: '60–75 min', price: '₹1,300 – ₹1,800', category: 'mind-sleep',
    wa: 'Chakra balancing massage',
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
          <h1>All Therapies</h1>
          <p className="lead">22 traditional Ayurvedic and wellness treatments — each personalised to your body and needs. Filter by concern or search by name.</p>
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
                placeholder="Search therapies…"
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
            <span>{filtered.length} {filtered.length === 1 ? 'therapy' : 'therapies'} found</span>
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
          ) : (
            <div className="svc-empty">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <p>No therapies match your search. Try a different keyword or category.</p>
              <button className="btn btn-ghost" onClick={() => { setSearch(''); setActiveCategory('all') }}>
                Clear filters
              </button>
            </div>
          )}

          <div className="svc-book-cta rv">
            <h3>Not sure which therapy is right for you?</h3>
            <p>Message us on WhatsApp — our therapists will suggest the ideal ritual based on your concerns.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                className="btn btn-gold"
                href="https://wa.me/919528683405?text=Hi!%20I%20need%20help%20choosing%20the%20right%20therapy.%20Can%20you%20suggest%20one%20for%20me%3F"
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
