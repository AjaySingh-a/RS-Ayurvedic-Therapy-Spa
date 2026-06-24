import { Link } from 'react-router-dom'
import storefront from '../assets/storefront.jpg'

export default function Storefront() {
  return (
    <section className="section storefront" id="visit-us">
      <div className="wrap store-grid">
        <div className="store-photo rv-l">
          <img
            src={storefront}
            alt="RS Therapy Spa storefront on Nalwa Street, Pahar Ganj — warm lit entrance with plants"
            loading="lazy"
          />
          <div className="store-photo-badge">
            <span>Walk in or book</span>
            Nalwa Street · Pahar Ganj
          </div>
        </div>

        <div className="store-copy rv-r">
          <span className="eyebrow">Visit our spa</span>
          <h2>Step inside RS Therapy Spa</h2>
          <p>
            Our calm, softly-lit space sits just two minutes from Ramakrishna Ashram
            Marg metro. From the moment you walk through the doors, warm aroma oils
            and skilled therapists make every visit feel like a small retreat from the city.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-gold" to="/booking">
              Book your session
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link className="btn btn-ghost" to="/contact">Get directions</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
