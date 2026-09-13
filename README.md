# GreenCare

Responsive GreenCare landing page, organised by page section (`src/templates/sections`), interactions (`src/modules`) and presentation styles (`src/styles`).

## Run locally

Run `npm install`, then `npm run dev`.

## Behaviour

- Newsletter fields validate emails and announce feedback accessibly.
- Contact buttons open a keyboard-accessible native dialog.
- Mobile navigation, FAQ accordions, scroll reveals and progress bars work without external application state.

## Optional mail and donation integrations

Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT`, `VITE_NEWSLETTER_ENDPOINT`, and/or `VITE_DONATION_ENDPOINT` to your approved HTTPS service endpoints. Requests are sent as JSON with `fetch`; without an endpoint, the site opens a transparent `mailto:` fallback instead of pretending that a message or payment was processed.

The donation page is available at `/donate/`. A payment provider checkout URL or backend endpoint must be configured before collecting card details or real money.
