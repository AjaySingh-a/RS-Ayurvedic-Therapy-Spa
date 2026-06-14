import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ContactPage() {
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
          <span className="eyebrow">Find us</span>
          <h1>Contact Us</h1>
          <p className="lead">We're in the heart of Pahar Ganj — easy to reach, happy to hear from you.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">

            <div className="c-card rv-l">
              <div className="c-row">
                <div className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>
                    2473, Nalwa Street, near Imperial Cinema,<br />
                    close to Ramakrishna Ashram Marg Metro,<br />
                    Pahar Ganj, New Delhi — 110055
                  </p>
                </div>
              </div>

              <div className="c-row">
                <div className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Call or WhatsApp</h4>
                  <p><a href="tel:+919528683405">+91 95286 83405</a></p>
                </div>
              </div>

              <div className="c-row">
                <div className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Open Hours</h4>
                  <div className="hours">
                    <span><b>Mon – Sun</b></span><span>10:00 AM – 9:30 PM</span>
                    <span><b>Walk-ins</b></span><span>Welcome, booking preferred</span>
                  </div>
                </div>
              </div>

              <div className="c-row">
                <div className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.5 1.3Z"/>
                  </svg>
                </div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>
                    <a
                      href="https://wa.me/919528683405?text=Hi%20RS%20Ayurvedic%20Therapy%20Spa%2C%20I%27d%20like%20to%20enquire."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us on WhatsApp →
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  className="btn btn-ghost"
                  style={{ alignSelf: 'flex-start' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/search/?api=1&query=2473+Nalwa+Street+Pahar+Ganj+New+Delhi+110055"
                >
                  Open in Google Maps
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <Link to="/booking" className="btn btn-gold">Book a Session</Link>
              </div>
            </div>

            <div className="map-frame rv-r">
              <iframe
                title="RS Ayurvedic Therapy Spa location"
                src="https://www.google.com/maps?q=Nalwa%20Street%2C%20Pahar%20Ganj%2C%20New%20Delhi%20110055&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* How to reach */}
          <div className="reach-section rv" style={{ marginTop: 'clamp(2.5rem,6vw,4rem)' }}>
            <span className="eyebrow">How to reach us</span>
            <h2 style={{ marginTop: '.85rem', marginBottom: '1.5rem', fontSize: 'clamp(1.6rem,3.4vw,2.4rem)' }}>Getting here is easy</h2>
            <div className="reach-grid">
              <div className="reach-card">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9.5h18M3 14.5h18M8 4v16M16 4v16M3 4h18v16H3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4>By Metro</h4>
                  <p>Get off at <strong>Ramakrishna Ashram Marg</strong> (Blue Line). We're a 2-minute walk on Nalwa Street, near Imperial Cinema.</p>
                </div>
              </div>
              <div className="reach-card">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m-4 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4>By Auto / Cab</h4>
                  <p>Tell your driver: <strong>2473 Nalwa Street, Pahar Ganj</strong>, near Imperial Cinema. Easily accessible from Connaught Place and New Delhi Railway Station.</p>
                </div>
              </div>
              <div className="reach-card">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </div>
                <div>
                  <h4>Landmarks</h4>
                  <p>Near <strong>Imperial Cinema</strong>, close to the Pahar Ganj Main Bazar. Look for our green sign on Nalwa Street.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
