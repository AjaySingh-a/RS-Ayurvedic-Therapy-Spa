import { useEffect, useRef } from 'react'

const WA_HREF = "https://wa.me/919528683405?text=Hi%20RS%20Ayurvedic%20Therapy%20Spa%2C%20I%27d%20like%20to%20enquire%20about%20your%20therapies."

export default function FloatingActions() {
  const progressRef = useRef(null)
  const topBtnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      if (progressRef.current) {
        progressRef.current.style.width = (window.scrollY / (h.scrollHeight - window.innerHeight) * 100) + '%'
      }
      if (topBtnRef.current) {
        topBtnRef.current.classList.toggle('show', window.scrollY > 700)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="progress" ref={progressRef} />

      <a
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        href={WA_HREF}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.5 1.3Z"/>
        </svg>
      </a>
      <span className="wa-tip">Enquire on WhatsApp</span>

      <button
        className="top-btn"
        ref={topBtnRef}
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  )
}
