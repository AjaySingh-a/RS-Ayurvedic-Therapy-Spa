import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['services', 'finder', 'why', 'book', 'visit']
      .map(id => document.getElementById(id))
      .filter(Boolean)
    const links = document.querySelectorAll('.nav-links a')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id))
        }
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    setMenuOpen(prev => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav-in">
        <a href="#top" className="brand">
          <span className="leaf-mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 21c6-2 8-7 8-13-6 0-11 2-13 8M12 21c-1-4-1-7 2-11M12 21H6c-2-3-2-6-1-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>RS Ayurvedic<small>Therapy Spa · Delhi</small></span>
        </a>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#services" onClick={closeMenu}>Therapies</a>
          <a href="#finder" onClick={closeMenu}>Find your therapy</a>
          <a href="#why" onClick={closeMenu}>Why us</a>
          <a href="#book" onClick={closeMenu}>Book a visit</a>
          <a href="#visit" onClick={closeMenu}>Visit us</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem' }}>
          <a
            className="nav-cta"
            href="https://wa.me/918920826570?text=Hi%20RS%20Ayurvedic%20Therapy%20Spa%2C%20I%27d%20like%20to%20enquire%20about%20your%20therapies."
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.5 1.3Z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
          <button
            className={`burger${menuOpen ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
