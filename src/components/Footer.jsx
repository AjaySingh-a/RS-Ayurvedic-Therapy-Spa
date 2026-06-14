import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <Link to="/" className="brand">
          <span className="leaf-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 21c6-2 8-7 8-13-6 0-11 2-13 8M12 21c-1-4-1-7 2-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <span>RS Ayurvedic<small>Therapy Spa</small></span>
        </Link>

        <div className="foot-nav">
          <Link to="/services">Therapies</Link>
          <Link to="/about">About Us</Link>
          <Link to="/booking">Book a Visit</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <p>
          © 2026 RS Ayurvedic Therapy Spa · Pahar Ganj, New Delhi ·{' '}
          <a href="tel:+919528683405" style={{ color: 'var(--gold)' }}>+91 95286 83405</a>
        </p>
      </div>
    </footer>
  )
}
