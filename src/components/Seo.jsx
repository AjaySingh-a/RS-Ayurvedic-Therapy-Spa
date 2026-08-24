import { SITE_URL, OG_IMAGE } from '../lib/schema'
import JsonLd from './JsonLd'

export default function Seo({ title, description, path = '/', jsonLd = [] }) {
  const url = `${SITE_URL}${path}`
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd]

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RS Therapy Spa" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </>
  )
}
