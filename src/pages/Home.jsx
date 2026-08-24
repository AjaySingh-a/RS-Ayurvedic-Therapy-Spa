import { useEffect } from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import Finder from '../components/Finder'
import WhyUs from '../components/WhyUs'
import Storefront from '../components/Storefront'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Seo from '../components/Seo'
import { faqSchema } from '../lib/schema'

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
      <Seo
        title="RS Therapy Spa — Best Massage Spa in Pahar Ganj, New Delhi | Book Now"
        description="Relaxing full body oil massage in Pahar Ganj, New Delhi. Deep tissue, aromatherapy, Thai, hot stone & couple massage. Open 24 hours, 2 min from Ramakrishna Ashram Marg metro. Call or WhatsApp to book."
        path="/"
        jsonLd={faqSchema()}
      />
      <Hero />
      <Marquee />
      <Services />
      <Finder />
      <WhyUs />
      <Storefront />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  )
}
