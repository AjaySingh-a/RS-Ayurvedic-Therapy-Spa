import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const WA_NUMBER = '919528683405'
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const SERVICES_LIST = [
  'Full Body Oil Massage (60–90 min)',
  'Swedish Massage (60 min)',
  'Deep Tissue Massage (60–90 min)',
  'Aromatherapy Massage (60 min)',
  'Balinese Massage (60–90 min)',
  'Thai Oil Massage (60–90 min)',
  'Hot Stone Massage (60–75 min)',
  'Back, Neck & Shoulder Massage (30–45 min)',
  'Head & Champi Massage (30 min)',
  'Foot Reflexology (45 min)',
  'Couple Massage (60–90 min)',
  'Four-Hand Massage (60 min)',
  'Not sure — suggest for me',
]

export default function BookingPage() {
  const dateRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.min = new Date().toISOString().split('T')[0]
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    const g = id => document.getElementById(id).value.trim()

    const name = g('bName')
    const phone = g('bPhone')
    const service = g('bService')
    const date = g('bDate')
    const time = g('bTime')
    const guests = g('bGuests')
    const note = g('bNote')

    await supabase.from('bookings').insert({
      client_name: name,
      client_phone: phone || null,
      service_name: service,
      preferred_date: date,
      preferred_time: time,
      guests,
      notes: note || null,
      status: 'pending',
    })

    const fmtDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    })
    let msg = `🌿 *Booking Request — RS Therapy Spa*\n\n` +
      `*Name:* ${name}\n*Phone:* ${phone || 'Not provided'}\n*Guests:* ${guests}\n*Massage:* ${service}\n` +
      `*Date:* ${fmtDate}\n*Time:* ${time}`
    if (note) msg += `\n*Note:* ${note}`
    msg += `\n\nPlease confirm my slot. Thank you!`

    setSubmitting(false)
    window.open(waLink(msg), '_blank')
  }

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Reserve your spot</span>
          <h1>Book a Session</h1>
          <p className="lead">No payment needed online. Your request goes straight to us on WhatsApp — we confirm your slot personally within minutes.</p>
        </div>
      </div>

      <section className="section book" style={{ background: 'transparent', border: 'none' }}>
        <div className="wrap book-grid">

          <div className="book-info rv-l">
            <span className="eyebrow">How it works</span>
            <h2 style={{ fontSize: 'clamp(1.75rem,3.6vw,2.6rem)', margin: '.85rem 0 1rem' }}>Your session, three steps away</h2>
            <p style={{ color: 'var(--cream-dim)', maxWidth: '42ch' }}>
              No online payment, no complicated forms. Fill in the details, hit send — your booking arrives in our WhatsApp and we confirm immediately.
            </p>

            <div className="steps">
              <div className="step">
                <b>1</b>
                <div>
                  <h4>Choose your massage</h4>
                  <p>Pick from our full menu, or let us suggest the right one for you.</p>
                </div>
              </div>
              <div className="step">
                <b>2</b>
                <div>
                  <h4>Pick a date &amp; time</h4>
                  <p>We're open 24 hours, every day of the week. Walk-ins also welcome.</p>
                </div>
              </div>
              <div className="step">
                <b>3</b>
                <div>
                  <h4>Confirm on WhatsApp</h4>
                  <p>Your request reaches us instantly — we reply with a personal confirmation.</p>
                </div>
              </div>
            </div>

            <div className="booking-info-cards">
              <div className="binfo-card">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
                <span>2473 Nalwa St, Pahar Ganj, New Delhi</span>
              </div>
              <div className="binfo-card">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span>Open 24 Hours · Mon–Sun</span>
              </div>
              <div className="binfo-card">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
                <span><a href="tel:+919528683405" style={{ color: 'inherit' }}>+91 95286 83405</a></span>
              </div>
            </div>

            <Link to="/services" className="btn btn-ghost" style={{ alignSelf: 'flex-start', marginTop: '.5rem' }}>
              Browse all massages first →
            </Link>
          </div>

          <form className="form-card rv-r" onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: '1.4rem', fontSize: '1.25rem' }}>Fill in your details</h3>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="bName">Your name</label>
                <input id="bName" type="text" placeholder="e.g. Rahul Sharma" required />
              </div>
              <div className="field">
                <label htmlFor="bPhone">Phone number</label>
                <input id="bPhone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="field">
                <label htmlFor="bGuests">Guests</label>
                <select id="bGuests">
                  <option>1 person</option>
                  <option>2 people</option>
                  <option>3+ people / group</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="bService">Massage</label>
                <select id="bService">
                  {SERVICES_LIST.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="bDate">Preferred date</label>
                <input id="bDate" type="date" ref={dateRef} required />
              </div>
              <div className="field">
                <label htmlFor="bTime">Preferred time</label>
                <input id="bTime" type="time" required />
              </div>
              <div className="field full">
                <label htmlFor="bNote">
                  Anything we should know?{' '}
                  <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea id="bNote" placeholder="Back pain, pregnancy, oil allergies, preferred therapist…" />
              </div>
            </div>
            <button type="submit" className="btn btn-gold" disabled={submitting}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.5 1.3Z"/>
              </svg>
              {submitting ? 'Saving…' : 'Send Booking Request on WhatsApp'}
            </button>
            <p className="form-note">Opens WhatsApp with your request pre-filled. No advance payment required.</p>
          </form>

        </div>
      </section>
    </>
  )
}
