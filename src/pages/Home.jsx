import { useEffect } from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import Finder from '../components/Finder'
import WhyUs from '../components/WhyUs'
import Storefront from '../components/Storefront'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  useEffect(() => {
    document.querySelectorAll('.stagger').forEach(g =>
      [...g.children].forEach((el, i) => el.style.setProperty('--d', (i % 3) * 0.12 + 's'))
    )
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
      <Hero />
      <Marquee />
      <Services />
      <Finder />
      <WhyUs />
      <Storefront />
      <Testimonials />
      <Contact />
    </>
  )
}
