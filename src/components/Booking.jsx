import { useEffect, useRef } from 'react'

const WA_NUMBER = '919528683405'
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export default function Booking() {
  const dateRef = useRef(null)

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.min = new Date().toISOString().split('T')[0]
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const g = id => document.getElementById(id).value.trim()
    const date = new Date(g('bDate')).toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    })
    let msg = `🌿 *Booking Request — RS Therapy Spa*\n\n` +
      `*Name:* ${g('bName')}\n*Guests:* ${g('bGuests')}\n*Massage:* ${g('bService')}\n` +
      `*Date:* ${date}\n*Time:* ${g('bTime')}`
    const note = g('bNote')
    if (note) msg += `\n*Note:* ${note}`
    msg += `\n\nPlease confirm my slot. Thank you!`
    window.open(waLink(msg), '_blank')
  }

  return (
    <section className="book section" id="book">
      <div className="wrap book-grid">
        <div className="book-info rv-l">
          <span className="eyebrow">Book a visit</span>
          <h2>Your session, three steps away</h2>
          <p>No payment needed online. Fill the form and your booking request opens in WhatsApp — we confirm your slot personally within minutes.</p>
          <div className="steps">
            <div className="step">
              <b>1</b>
              <div>
                <h4>Choose your massage</h4>
                <p>Pick a massage, or let us suggest one when you arrive.</p>
              </div>
            </div>
            <div className="step">
              <b>2</b>
              <div>
                <h4>Pick a date &amp; time</h4>
                <p>We're open 24 hours, every day of the week.</p>
              </div>
            </div>
            <div className="step">
              <b>3</b>
              <div>
                <h4>Confirm on WhatsApp</h4>
                <p>Your request reaches us instantly — we reply with confirmation.</p>
              </div>
            </div>
          </div>
        </div>

        <form className="form-card rv-r" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="bName">Your name</label>
              <input id="bName" type="text" placeholder="e.g. Rahul Sharma" required />
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
                <option>Full Body Oil Massage (60–90 min)</option>
                <option>Swedish Massage (60 min)</option>
                <option>Deep Tissue Massage (60–90 min)</option>
                <option>Aromatherapy Massage (60 min)</option>
                <option>Head &amp; Champi Massage (30 min)</option>
                <option>Foot Reflexology (45 min)</option>
                <option>Not sure — suggest for me</option>
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
          <button type="submit" className="btn btn-gold">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.5 1.3Z"/>
            </svg>
            Send booking request on WhatsApp
          </button>
          <p className="form-note">Opens WhatsApp with your request pre-filled. No advance payment required.</p>
        </form>
      </div>
    </section>
  )
}
