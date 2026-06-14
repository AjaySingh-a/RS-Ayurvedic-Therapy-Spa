const REVIEWS = [
  {
    name: 'Priya S.',
    location: 'New Delhi',
    rating: 5,
    date: '2 weeks ago',
    text: 'Best Ayurvedic spa in Pahar Ganj! The Shirodhara completely transformed my sleep. I had been struggling with insomnia for months and after just two sessions I was sleeping through the night. The therapists are skilled and genuinely caring.',
    avatar: 'P',
    color: '#c0392b',
  },
  {
    name: 'Rahul M.',
    location: 'Gurgaon',
    rating: 5,
    date: '1 month ago',
    text: 'Came in with severe lower back pain that had been bothering me for over a year. The Kati Vasti + Deep Tissue combination was incredible. After 3 sessions the pain is completely gone. Cannot recommend enough!',
    avatar: 'R',
    color: '#2980b9',
  },
  {
    name: 'Sarah T.',
    location: 'United Kingdom',
    rating: 5,
    date: '3 weeks ago',
    text: 'As a tourist near the metro, stumbling upon RS Ayurvedic was the highlight of my Delhi trip. The Abhyanga was absolutely authentic — nothing like the fake "Ayurvedic" massages I\'ve had elsewhere. Already planning my return!',
    avatar: 'S',
    color: '#8e44ad',
  },
  {
    name: 'Amit K.',
    location: 'Karol Bagh',
    rating: 5,
    date: '2 months ago',
    text: 'Regular customer for over 2 years. The quality has never dropped — same skilled therapists, same genuine oils. My monthly Abhyanga is now non-negotiable for managing stress. The staff even remembers my preferences!',
    avatar: 'A',
    color: '#27ae60',
  },
  {
    name: 'Deepika R.',
    location: 'Noida',
    rating: 5,
    date: '5 days ago',
    text: 'Got the Mukha Lepam facial and my skin has been glowing for weeks. They matched herb pastes to my skin type and explained every step. Completely natural, no harsh chemicals. This is my regular facial spot now.',
    avatar: 'D',
    color: '#e67e22',
  },
  {
    name: 'James W.',
    location: 'Australia',
    rating: 5,
    date: '1 week ago',
    text: 'Visited as a tourist and this place exceeded every expectation. Professional, hygienic and very affordable. The Potli massage for my sore legs after all the sightseeing was pure magic. An absolutely authentic experience.',
    avatar: 'J',
    color: '#16a085',
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#E2A93B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="wrap">
        <div className="testimonials-head rv">
          <div>
            <span className="eyebrow">What guests say</span>
            <h2 style={{ marginTop: '.85rem' }}>Loved by locals &amp; travellers</h2>
            <p style={{ color: 'var(--cream-dim)', marginTop: '.6rem', maxWidth: '42ch' }}>
              Real reviews from our Google listing — unedited, straight from our guests.
            </p>
          </div>
          <div className="google-rating-badge">
            <GoogleIcon />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span className="google-score">4.9</span>
                <Stars />
              </div>
              <span style={{ fontSize: '.72rem', color: 'var(--cream-dim)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Google Reviews</span>
            </div>
          </div>
        </div>

        <div className="reviews-grid stagger">
          {REVIEWS.map((r, i) => (
            <div key={i} className="review-card rv">
              <div className="review-top">
                <div className="review-avatar" style={{ background: r.color }}>{r.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div className="review-name">{r.name}</div>
                  <div className="review-loc">{r.location}</div>
                </div>
                <GoogleIcon />
              </div>
              <Stars count={r.rating} />
              <p className="review-text">"{r.text}"</p>
              <span className="review-date">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
