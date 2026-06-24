const ITEMS = [
  'Full Body Oil Massage', 'Swedish Massage', 'Deep Tissue', 'Aromatherapy',
  'Hot Stone', 'Head & Champi', 'Foot Reflexology', 'Couple Massage',
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
