import header from './sections/00-header.html?raw';
import hero from './sections/10-hero.html?raw';
import faq from './sections/100-faq.html?raw';
import mission from './sections/20-mission-statement.html?raw';
import gridCards from './sections/30-4-grid-cards.html?raw';
import howItWorks from './sections/40-how-it-works.html?raw';
import campaigns from './sections/50-active-campaigns.html?raw';
import initiatives from './sections/60-initiatives-table.html?raw';
import problems from './sections/70-problem-cards.html?raw';
import testimonials from './sections/80-testimonials.html?raw';
import footer from './sections/90-footer.html?raw';
import partners from './sections/90-partners-logos.html?raw';
import contactDialog from './sections/95-contact-dialog.html?raw';
import cookieConsent from './sections/96-cookie-consent.html?raw';
import { pages } from './pages.js';

const byName = {
  '00-header.html': header,
  '10-hero.html': hero,
  '100-faq.html': faq,
  '20-mission-statement.html': mission,
  '30-4-grid-cards.html': gridCards,
  '40-how-it-works.html': howItWorks,
  '50-active-campaigns.html': campaigns,
  '60-initiatives-table.html': initiatives,
  '70-problem-cards.html': problems,
  '80-testimonials.html': testimonials,
  '90-footer.html': footer,
  '90-partners-logos.html': partners,
  '95-contact-dialog.html': contactDialog,
  '96-cookie-consent.html': cookieConsent,
};
const mainOrder = [
  '10-hero.html',
  '20-mission-statement.html',
  '30-4-grid-cards.html',
  '40-how-it-works.html',
  '50-active-campaigns.html',
  '60-initiatives-table.html',
  '70-problem-cards.html',
  '80-testimonials.html',
  '90-partners-logos.html',
  '100-faq.html',
];
const mainSections = mainOrder.map((name) => byName[name]).join('\n');

const routeName = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
const routeBody = pages[routeName] || mainSections;

export const pageTemplate = `${byName['00-header.html']}\n<main id="main-content">${routeBody}</main>\n${byName['90-footer.html']}\n${byName['95-contact-dialog.html']}\n${byName['96-cookie-consent.html']}`;
