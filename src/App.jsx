import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Finder from './components/Finder'
import WhyUs from './components/WhyUs'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import './index.css'

export default function App() {
  useEffect(() => {
    // Stagger delay on grid children
    document.querySelectorAll('.stagger').forEach(g =>
      [...g.children].forEach((el, i) => el.style.setProperty('--d', (i % 3) * 0.12 + 's'))
    )

    // Scroll reveal
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [])

  return (
    <>
      <FloatingActions />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Finder />
      <WhyUs />
      <Booking />
      <Contact />
      <Footer />
    </>
  )
}
