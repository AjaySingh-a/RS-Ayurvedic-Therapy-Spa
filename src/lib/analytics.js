export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

export const trackCall = source => trackEvent('click_to_call', { method: source })
export const trackWhatsApp = (source, item) => trackEvent('whatsapp_click', { method: source, item_name: item })
export const trackBookingSubmit = service => trackEvent('generate_lead', { method: 'booking_form', item_name: service })
