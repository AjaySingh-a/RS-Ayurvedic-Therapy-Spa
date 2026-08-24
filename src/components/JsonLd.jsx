function escapeJsonLd(json) {
  return JSON.stringify(json).replace(/</g, '\\u003c')
}

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }}
    />
  )
}
