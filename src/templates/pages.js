const arrow = '<span aria-hidden="true">↗</span>';
const leafIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
const waveIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 12c3.5-7 7-7 10.5 0s7 7 9.5 0"/><path d="M2 18c3.5-7 7-7 10.5 0s7 7 9.5 0"/></svg>';
const sunIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';

const pageIntro = (eyebrow, title, body) => `
  <section class="page-intro max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
    <div class="page-intro__eyebrow"><span class="pulse-dot" aria-hidden="true"></span>${eyebrow}</div>
    <h1 class="reveal page-title">${title}</h1>
    <p class="reveal reveal-d1 page-lede">${body}</p>
  </section>`;

const projectCard = (category, title, copy, image, raised, progress, icon) => `
  <article class="reveal project-card" data-project-card data-category="${category}">
    <div class="project-card__media"><img src="${image}" alt="${title}" loading="lazy"><span class="project-card__icon">${icon}</span><span class="project-card__status">Active now</span></div>
    <div class="p-5 sm:p-6"><div class="flex items-start justify-between gap-4"><h2 class="text-xl font-semibold text-gray-900">${title}</h2><span class="text-gray-400" aria-hidden="true">↗</span></div>
      <p class="text-sm leading-relaxed text-gray-500 mt-2">${copy}</p>
      <div class="mt-5 flex justify-between text-xs font-semibold text-gray-500"><span>${raised} raised</span><span>${progress}%</span></div>
      <div class="project-progress" role="progressbar" aria-label="${title} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><span style="--progress:${progress}%"></span></div>
      <button type="button" data-open-contact class="mt-5 inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-lime-700">Support this project ${arrow}</button>
    </div>
  </article>`;

const legalPage = (eyebrow, title, intro, sections) => `${pageIntro(eyebrow, title, intro)}<section class="legal-page max-w-4xl mx-auto px-4 sm:px-6 pb-20"><div class="legal-page__card">${sections.map(([heading, body]) => `<article><h2>${heading}</h2><p>${body}</p></article>`).join('')}</div></section>`;

export const pages = {
  projects: `${pageIntro('PROJECTS · MAKE YOUR MARK', 'Practical work. Visible change.', 'Choose a project that feels close to your heart. Every campaign is tracked with clear goals, local partners, and public progress.')}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-20" aria-labelledby="project-list-title">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8"><div><p class="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">2024 programme</p><h2 id="project-list-title" class="text-2xl sm:text-3xl font-semibold mt-2">Find your cause</h2></div>
        <div class="filter-pills" role="group" aria-label="Filter projects"><button type="button" class="filter-pill is-active" data-project-filter="all" aria-pressed="true">All projects</button><button type="button" class="filter-pill" data-project-filter="forest" aria-pressed="false">Forests</button><button type="button" class="filter-pill" data-project-filter="ocean" aria-pressed="false">Oceans</button><button type="button" class="filter-pill" data-project-filter="energy" aria-pressed="false">Energy</button></div>
      </div>
      <div class="project-grid">
        ${projectCard('forest', 'Amazon Reforestation', 'Restore native canopy with communities across the Amazon basin.', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80', '$84.5k', 70, leafIcon)}
        ${projectCard('ocean', 'Coastal Cleanup', 'Remove plastic from 50km of coastline and protect nesting habitats.', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80', '$32.1k', 45, waveIcon)}
        ${projectCard('energy', 'Solar for Schools', 'Bring reliable, clean power to 200 off-grid rural schools.', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80', '$12.8k', 16, sunIcon)}
      </div>
    </section>`,

  mission: `${pageIntro('OUR MISSION · LONG VIEW', 'A healthier planet is a shared project.', 'GreenCare connects everyday people with local action. We focus on measurable restoration, practical education, and communities that can keep the work going.')}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid lg:grid-cols-[1.05fr_.95fr] gap-5 items-stretch">
      <div class="story-panel reveal-left"><span class="story-panel__mark">01</span><div class="story-panel__icon">${leafIcon}</div><h2>Protect what already works.</h2><p>Native forests, wetlands, and coastlines already know how to recover. Our role is to remove pressure, support local stewards, and give nature room to lead.</p><a class="inline-flex items-center gap-2 mt-7 font-bold text-sm" href="/projects/">See our projects ${arrow}</a></div>
      <div class="mission-values"><article class="value-card reveal reveal-d1"><span class="value-card__number">01</span><h2>Local first</h2><p>We co-design every initiative with the people who live there.</p></article><article class="value-card reveal reveal-d2"><span class="value-card__number">02</span><h2>Proof matters</h2><p>We publish progress, costs, and lessons so good work can travel.</p></article><article class="value-card reveal reveal-d3"><span class="value-card__number">03</span><h2>Open to all</h2><p>Anyone can contribute time, skills, attention, or a small monthly gift.</p></article></div>
    </section>
    <section class="timeline-section max-w-7xl mx-auto px-4 sm:px-6 pb-20" aria-labelledby="mission-timeline-title"><div class="flex items-end justify-between gap-4 mb-8"><div><p class="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">How we work</p><h2 id="mission-timeline-title" class="text-2xl sm:text-3xl font-semibold mt-2">From intent to impact</h2></div><span class="hidden sm:inline-flex badge-lime">Built for the long term</span></div><div class="timeline-grid"><article class="timeline-step reveal"><span>01</span><h3>Listen</h3><p>We learn from local knowledge and baseline data before making a plan.</p></article><article class="timeline-step reveal reveal-d1"><span>02</span><h3>Act</h3><p>Partners turn the plan into visible, hands-on work in the field.</p></article><article class="timeline-step reveal reveal-d2"><span>03</span><h3>Learn</h3><p>We measure what changed, share it openly, and improve the next cycle.</p></article></div></section>`,

  problems: `${pageIntro('PROBLEMS · KNOW THE WHY', 'The challenges are connected.', 'Climate pressure shows up in forests, oceans, water, and the air we breathe. Understanding the link helps us choose action that lasts.')}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-20"><div class="problem-grid">
      <article class="problem-feature reveal-left"><div class="problem-feature__art">${waveIcon}<span>71%</span></div><div><p class="text-xs uppercase tracking-[0.18em] font-bold text-gray-400">Oceans</p><h2>Plastic outlives the moment.</h2><p>Healthy shorelines protect wildlife, food systems, and the communities that depend on them.</p><a href="/projects/" class="inline-flex items-center gap-2 mt-5 text-sm font-bold">Join a cleanup ${arrow}</a></div></article>
      <article class="problem-feature problem-feature--lime reveal reveal-d1"><div class="problem-feature__art">${leafIcon}<span>10k</span></div><div><p class="text-xs uppercase tracking-[0.18em] font-bold text-gray-600">Forests</p><h2>Restoration is a team sport.</h2><p>Native trees cool landscapes, hold carbon, and give biodiversity a place to return.</p><a href="/projects/" class="inline-flex items-center gap-2 mt-5 text-sm font-bold">Plant with us ${arrow}</a></div></article>
      <article class="problem-feature reveal reveal-d2"><div class="problem-feature__art">${sunIcon}<span>200</span></div><div><p class="text-xs uppercase tracking-[0.18em] font-bold text-gray-400">Energy</p><h2>Clean power unlocks possibility.</h2><p>Reliable solar power helps schools and families thrive without adding to the climate burden.</p><a href="/impact/" class="inline-flex items-center gap-2 mt-5 text-sm font-bold">See the impact ${arrow}</a></div></article>
    </div></section>`,

  impact: `${pageIntro('IMPACT · OPEN BOOK', 'Small actions, counted honestly.', 'We believe trust is built in the details. Explore the numbers behind our work and the habits that help us stay accountable.')}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-20"><div class="impact-dashboard reveal"><div class="impact-dashboard__header"><div><p class="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Live programme snapshot</p><h2 class="text-2xl sm:text-3xl font-semibold mt-2">What moved this year</h2></div><span class="live-badge"><span></span> Updated quarterly</span></div><div class="impact-metrics"><article><strong data-count="10000">10,000</strong><span>native trees planted</span></article><article><strong data-count="50">50</strong><span>km coastline restored</span></article><article><strong data-count="200">200</strong><span>schools on clean energy</span></article><article><strong data-count="1500000">1.5M+</strong><span>people in our community</span></article></div><div class="impact-tabs" role="tablist" aria-label="Impact categories"><button type="button" class="impact-tab is-active" role="tab" aria-selected="true" aria-controls="impact-forest" data-impact-tab="forest">Forests</button><button type="button" class="impact-tab" role="tab" aria-selected="false" aria-controls="impact-ocean" data-impact-tab="ocean">Oceans</button><button type="button" class="impact-tab" role="tab" aria-selected="false" aria-controls="impact-energy" data-impact-tab="energy">Energy</button></div><div class="impact-panel is-active" id="impact-forest" data-impact-panel="forest"><div class="impact-panel__ring"><span>70%</span></div><div><h3>Amazon Reforestation Drive</h3><p>70% funded, with local nurseries already preparing the next planting season.</p><a href="/projects/" class="inline-flex items-center gap-2 mt-4 text-sm font-bold">View project ${arrow}</a></div></div><div class="impact-panel" id="impact-ocean" data-impact-panel="ocean"><div class="impact-panel__ring"><span>45%</span></div><div><h3>Coastal Cleanup Initiative</h3><p>Our partner teams have cleared 22.5km and are mapping the next shoreline.</p><a href="/projects/" class="inline-flex items-center gap-2 mt-4 text-sm font-bold">View project ${arrow}</a></div></div><div class="impact-panel" id="impact-energy" data-impact-panel="energy"><div class="impact-panel__ring"><span>16%</span></div><div><h3>Solar for Rural Schools</h3><p>First installations are powering classrooms with reliable, clean electricity.</p><a href="/projects/" class="inline-flex items-center gap-2 mt-4 text-sm font-bold">View project ${arrow}</a></div></div></div></section>` ,

  contact: `${pageIntro('CONTACT · LET’S COLLABORATE', 'There is a place for your energy here.', 'Tell us what you care about, what you can offer, or what you want to learn. We will help you find a meaningful next step.')}
    <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-20"><div class="contact-cta reveal-scale"><div><span class="contact-cta__icon">${leafIcon}</span><h2>Ready to grow something good?</h2><p>Our community team replies within 48 hours. No perfect plan required.</p></div><button type="button" data-open-contact class="rounded-full bg-gray-900 text-white px-6 py-3.5 font-bold hover:bg-lime-700 transition-colors">Open contact form ${arrow}</button></div><div class="grid sm:grid-cols-3 gap-4 mt-5"><a href="mailto:hello@greencare.org" class="contact-method reveal"><span>01</span><strong>Email us</strong><small>hello@greencare.org</small></a><a href="/projects/" class="contact-method reveal reveal-d1"><span>02</span><strong>Volunteer</strong><small>Find a project near you</small></a><a href="/impact/" class="contact-method reveal reveal-d2"><span>03</span><strong>Read the report</strong><small>See our latest numbers</small></a></div></section>`,

  privacy: legalPage('PRIVACY · TRUST BY DESIGN', 'Privacy policy', 'A plain-language overview of what GreenCare collects, why we collect it, and the choices you have.', [
    ['What we collect', 'We only collect information you choose to share through contact or newsletter forms, such as your name and email address. We do not sell personal information.'],
    ['How we use it', 'We use submitted details to reply to requests, send opted-in updates, and keep the site secure. We retain information only for as long as it is needed for those purposes.'],
    ['Your choices', 'You can ask to access, correct, or delete your information by contacting hello@greencare.org. You can unsubscribe from newsletters at any time.'],
    ['Questions', 'For privacy questions, contact our team through the contact page. This page is informational and should be reviewed by your legal adviser before production launch.'],
  ]),
  terms: legalPage('TERMS · USE WITH CARE', 'Terms of use', 'The simple rules for using GreenCare content, forms, and community resources respectfully.', [
    ['Using this site', 'You may browse and share links to GreenCare for personal and educational use. Please do not misuse forms, disrupt the service, or present our content as your own.'],
    ['Project information', 'Campaign figures and descriptions are shared for transparency and may change as field reports arrive. We aim for accuracy and welcome questions about any number.'],
    ['External links', 'Some links lead to services outside GreenCare. We are not responsible for the content or privacy practices of those external sites.'],
    ['Updates', 'We may update these terms as the site evolves. The current version will always be available from the footer.'],
  ]),
  cookies: legalPage('COOKIES · YOUR CONTROL', 'Cookie policy', 'GreenCare uses a small, respectful cookie setup focused on security and your preferences.', [
    ['Essential cookies', 'These support basic security, preferences, and the cookie choice itself. They cannot be switched off through this site.'],
    ['Optional analytics', 'If you allow them, optional analytics cookies help us understand which sections are useful. No optional analytics are loaded before you choose.'],
    ['Change your mind', 'Open “Manage preferences” in the cookie notice to update your choice. You can also clear cookies in your browser settings.'],
  ])
};
