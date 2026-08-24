export const SITE_URL = 'https://rstherapyspa.xyz'
export const BUSINESS_NAME = 'RS Therapy Spa'
export const PHONE = '+91-95286-83405'
export const OG_IMAGE = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop'

export const ALL_SERVICES_SCHEMA = [
  { name: 'Full Body Oil Massage', duration: 'PT60M', minPrice: 1200, maxPrice: 1800, description: 'Signature head-to-toe warm oil massage that eases tension and improves circulation.' },
  { name: 'Swedish Massage', duration: 'PT60M', minPrice: 1000, maxPrice: 1400, description: 'Gentle, flowing full-body massage with light-to-medium pressure, ideal for first-time guests.' },
  { name: 'Deep Tissue Massage', duration: 'PT60M', minPrice: 1200, maxPrice: 1600, description: 'Firm-pressure therapeutic massage for chronic knots in the back, neck and shoulders.' },
  { name: 'Aromatherapy Massage', duration: 'PT60M', minPrice: 1100, maxPrice: 1500, description: 'Soothing full-body massage with fragrant essential oil blends for relaxation.' },
  { name: 'Balinese Massage', duration: 'PT60M', minPrice: 1400, maxPrice: 1900, description: 'Full-body massage blending long strokes, gentle acupressure and warm oil.' },
  { name: 'Thai Oil Massage', duration: 'PT60M', minPrice: 1300, maxPrice: 1800, description: 'Warm-oil massage combined with gentle assisted stretching for flexibility.' },
  { name: 'Hot Stone Massage', duration: 'PT60M', minPrice: 1300, maxPrice: 1800, description: 'Heated smooth stones used with warm oil for deep muscle relief.' },
  { name: 'Back, Neck & Shoulder Massage', duration: 'PT30M', minPrice: 700, maxPrice: 1100, description: 'Focused quick-relief massage for desk strain and daily stress.' },
  { name: 'Head & Champi Massage', duration: 'PT30M', minPrice: 500, maxPrice: 800, description: 'Classic oil scalp, neck and shoulder champi that relieves headaches and aids sleep.' },
  { name: 'Foot Reflexology', duration: 'PT45M', minPrice: 600, maxPrice: 900, description: 'Targeted pressure-point massage on the feet to improve energy and ease tension.' },
  { name: 'Couple Massage', duration: 'PT60M', minPrice: 2000, maxPrice: 3200, description: 'Side-by-side oil massage for two guests in a private couples’ room.' },
  { name: 'Four-Hand Massage', duration: 'PT60M', minPrice: 2200, maxPrice: 3000, description: 'Two therapists working in sync for the most indulgent full-body massage.' },
]

export const FAQS = [
  {
    q: 'How much does a full body massage cost at RS Therapy Spa?',
    a: 'A full body oil massage costs between ₹1,200 and ₹1,800 depending on duration (60–90 minutes). Shorter targeted massages like Back, Neck & Shoulder start from ₹700, and premium sessions like Couple or Four-Hand massage range from ₹2,000 to ₹3,200. See the full price list on our Services page.',
  },
  {
    q: 'Is RS Therapy Spa open 24 hours?',
    a: 'Yes. We are open 24 hours a day, every day of the week including Sundays and holidays. Walk-ins are welcome any time, though booking a slot in advance on WhatsApp is preferred so we can guarantee availability.',
  },
  {
    q: 'Do I need to book in advance or can I walk in?',
    a: 'Walk-ins are always welcome. For a guaranteed slot, especially in the evening, we recommend booking a few hours ahead through our booking page or WhatsApp — no advance payment is required.',
  },
  {
    q: 'Where is RS Therapy Spa located and how do I get there?',
    a: 'We are at 2473, Nalwa Street, near Imperial Cinema, Pahar Ganj, New Delhi – 110055, a 2-minute walk from Ramakrishna Ashram Marg metro station (Blue Line). We are also easily reached by auto or cab from Connaught Place and New Delhi Railway Station.',
  },
  {
    q: 'What is the best massage for back pain or desk-work stiffness?',
    a: 'Our Deep Tissue Massage and Back, Neck & Shoulder Massage are the most requested for chronic back pain, knots and desk-related stiffness. Hot Stone Massage is also popular for deeper muscle relief. Tell us your problem areas when you arrive and we will recommend the right therapy.',
  },
  {
    q: 'Do you offer couple massages?',
    a: 'Yes, our Couple Massage lets two guests receive the same oil massage together in a private couples’ room, priced between ₹2,000 and ₹3,200 depending on duration.',
  },
  {
    q: 'What kind of oils do you use?',
    a: 'We use warm, skin-friendly massage oils and gentle natural aroma blends for every session — never cheap mineral-oil mixes or harsh synthetic fragrances.',
  },
  {
    q: 'Do you have both male and female therapists?',
    a: 'Yes, we have experienced, trained male and female therapists. You can mention your preference when booking or on arrival.',
  },
  {
    q: 'Is payment required in advance to book a session?',
    a: 'No advance payment is needed. You fill in a short booking form, it is sent to us on WhatsApp, and we confirm your slot personally. Payment is made at the spa after your session.',
  },
]

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    name: BUSINESS_NAME,
    image: OG_IMAGE,
    url: `${SITE_URL}/`,
    telephone: PHONE,
    priceRange: '₹500 – ₹3200',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2473, Nalwa Street, near Imperial Cinema',
      addressLocality: 'Pahar Ganj, New Delhi',
      addressRegion: 'DL',
      postalCode: '110055',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6446,
      longitude: 77.2127,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=2473+Nalwa+Street+Pahar+Ganj+New+Delhi+110055',
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    }],
    areaServed: [
      { '@type': 'Place', name: 'Pahar Ganj' },
      { '@type': 'Place', name: 'Karol Bagh' },
      { '@type': 'Place', name: 'Connaught Place' },
      { '@type': 'Place', name: 'Central Delhi' },
      { '@type': 'Place', name: 'New Delhi' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Massage Therapies',
      itemListElement: ALL_SERVICES_SCHEMA.map(s => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
        },
        priceCurrency: 'INR',
        price: s.minPrice,
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: s.minPrice,
          maxPrice: s.maxPrice,
          priceCurrency: 'INR',
        },
      })),
    },
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function servicesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: ALL_SERVICES_SCHEMA.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@type': 'DaySpa', name: BUSINESS_NAME },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: s.minPrice,
            maxPrice: s.maxPrice,
            priceCurrency: 'INR',
          },
        },
      },
    })),
  }
}
