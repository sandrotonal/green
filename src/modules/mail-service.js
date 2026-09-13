const contactEndpoint = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim();
const newsletterEndpoint = (import.meta.env.VITE_NEWSLETTER_ENDPOINT || '').trim();
const donationEndpoint = (import.meta.env.VITE_DONATION_ENDPOINT || '').trim();
const destination = 'hello@greencare.org';

function mailtoUrl(subject, body) {
  return `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function postJson(endpoint, payload) {
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`Mail service returned ${response.status}`);
  return { mode: 'endpoint' };
}

export async function sendContactMessage(payload) {
  if (contactEndpoint) return postJson(contactEndpoint, payload);
  window.location.href = mailtoUrl(`GreenCare contact from ${payload.name}`, `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
  return { mode: 'mailto' };
}

export async function subscribeToNewsletter(email) {
  if (newsletterEndpoint) return postJson(newsletterEndpoint, { email });
  window.location.href = mailtoUrl('GreenCare newsletter subscription', `Please add ${email} to the GreenCare newsletter.`);
  return { mode: 'mailto' };
}

export async function createDonationIntent(payload) {
  if (donationEndpoint) return postJson(donationEndpoint, payload);
  window.location.href = mailtoUrl(`Donation intent — ${payload.amount}`, `I would like to support ${payload.project}.\nAmount: ${payload.amount}\nEmail: ${payload.email}`);
  return { mode: 'mailto' };
}
