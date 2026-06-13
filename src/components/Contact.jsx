export default function Contact() {
  return (
    <section className="section" id="visit">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Visit us</span>
          <h2>In the heart of Pahar Ganj</h2>
        </div>
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
                <h4>Open hours</h4>
                <div className="hours">
                  <span><b>Mon – Sun</b></span><span>10:00 AM – 9:30 PM</span>
                  <span><b>Walk-ins</b></span><span>Welcome, booking preferred</span>
                </div>
              </div>
            </div>

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
      </div>
    </section>
  )
}
