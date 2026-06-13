const ITEMS = [
  'Abhyanga', 'Shirodhara', 'Potli Massage', 'Deep Tissue',
  'Swedish Relaxation', 'Head & Shoulder Relief', 'Foot Reflexology',
]

function MarqueeContent() {
  return (
    <span>
      {ITEMS.map((item, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {item} <i>✦</i>{' '}
        </span>
      ))}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  )
}
