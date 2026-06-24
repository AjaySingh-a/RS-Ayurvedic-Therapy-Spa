const REASONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 21c6-2 8-7 8-13-6 0-11 2-13 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 21c-1-4-1-7 2-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Quality massage oils',
    desc: 'We use warm, skin-friendly oils and gentle aroma blends — never cheap mineral-oil mixes.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Trained therapists',
    desc: 'Experienced male and female therapists who understand pressure, problem areas and your comfort.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Clean, private rooms',
    desc: 'Hygienic therapy rooms, fresh linen for every guest, and complete privacy throughout your session.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: '2 min from the metro',
    desc: 'On Nalwa Street near Imperial Cinema — a short walk from Ramakrishna Ashram Marg station.',
  },
]

export default function WhyUs() {
  return (
    <section className="section" id="why">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Why guests choose us</span>
          <h2>Small spa. Serious care.</h2>
        </div>
        <div className="why-grid stagger">
          {REASONS.map((r, i) => (
            <div key={i} className="why rv">
              <div className="ic">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
