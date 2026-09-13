import { createDonationIntent, sendContactMessage, subscribeToNewsletter } from './mail-service.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showToast(message, kind = 'success') {
  const region = document.getElementById('toast-region');
  const toast = document.createElement('p');
  toast.className = `toast toast--${kind}`;
  toast.textContent = message;
  region.replaceChildren(toast);
  window.setTimeout(() => toast.remove(), 4500);
}

function setFormMessage(form, message, isError) {
  const messageEl = form.parentElement?.querySelector('[data-form-message]');
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.className = `form-message ${isError ? 'form-message--error' : 'form-message--success'}`;
}

async function handleSubscribe(form) {
  const input = form.querySelector('input[type="email"]');
  const email = input.value.trim();
  if (!emailPattern.test(email)) {
    input.setAttribute('aria-invalid', 'true');
    setFormMessage(form, 'Please enter a valid email address.', true);
    input.focus();
    return;
  }
  input.removeAttribute('aria-invalid');
  try {
    const result = await subscribeToNewsletter(email);
    form.reset();
    const message = result.mode === 'endpoint' ? 'You are subscribed. Welcome to GreenCare!' : 'Your email client is ready to send the subscription request.';
    setFormMessage(form, message, false);
    showToast(message);
  } catch (error) {
    setFormMessage(form, 'We could not reach the mail service. Please try again.', true);
    showToast(error.message, 'error');
  }
}

function setDialogState(dialog, open, trigger) {
  if (open) {
    dialog.dataset.trigger = trigger?.id || '';
    dialog.showModal();
    dialog.querySelector('input, textarea, button')?.focus();
  } else if (dialog.open) {
    dialog.close();
    const opener = document.getElementById(dialog.dataset.trigger);
    opener?.focus();
  }
}

export function setupInteractions(root) {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  root.querySelectorAll('header a[href]').forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, '') || '/';
    if (linkPath === currentPath && link.closest('nav')) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-current-nav');
    }
  });
  const menuButton = root.getElementById('mobile-menu-btn');
  const mobileMenu = root.getElementById('mobile-menu');
  const menuBackdrop = root.getElementById('mobile-menu-backdrop');
  const menuIcon = root.getElementById('icon-menu');
  const closeIcon = root.getElementById('icon-close');
  let menuCloseTimer;
  let menuReturnFocus = null;
  const menuFocusable = () => [...mobileMenu?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') || []];

  const setMenuState = (open) => {
    window.clearTimeout(menuCloseTimer);
    if (open) {
      menuReturnFocus = document.activeElement;
      mobileMenu.hidden = false;
      menuBackdrop.hidden = false;
      requestAnimationFrame(() => {
        mobileMenu.classList.add('is-open');
        menuBackdrop.classList.add('is-visible');
        mobileMenu.querySelector('[data-close-menu]')?.focus();
      });
    } else {
      mobileMenu.classList.remove('is-open');
      menuBackdrop.classList.remove('is-visible');
      menuCloseTimer = window.setTimeout(() => {
        mobileMenu.hidden = true;
        menuBackdrop.hidden = true;
        if (menuReturnFocus && document.contains(menuReturnFocus)) menuReturnFocus.focus();
        menuReturnFocus = null;
      }, 300);
    }
    document.body.classList.toggle('no-scroll', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuIcon.toggleAttribute('hidden', open);
    closeIcon.toggleAttribute('hidden', !open);
  };
  menuButton?.addEventListener('click', () => setMenuState(mobileMenu.hidden));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));
  root.querySelector('[data-close-menu]')?.addEventListener('click', () => setMenuState(false));
  menuBackdrop?.addEventListener('click', () => setMenuState(false));
  mobileMenu?.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = menuFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenuState(false); });
  const closeMenuOnScroll = () => { if (menuButton?.getAttribute('aria-expanded') === 'true') setMenuState(false); };
  window.addEventListener('scroll', closeMenuOnScroll, { passive: true });
  document.addEventListener('scroll', closeMenuOnScroll, { passive: true, capture: true });
  window.addEventListener('wheel', closeMenuOnScroll, { passive: true, capture: true });
  window.addEventListener('touchmove', closeMenuOnScroll, { passive: true, capture: true });
  window.addEventListener('touchstart', (event) => { if (menuButton?.getAttribute('aria-expanded') === 'true' && !mobileMenu.contains(event.target)) setMenuState(false); }, { passive: true, capture: true });
  window.addEventListener('pointermove', (event) => { if (menuButton?.getAttribute('aria-expanded') === 'true' && !mobileMenu.contains(event.target)) setMenuState(false); }, { passive: true, capture: true });
  window.addEventListener('keydown', (event) => { if (menuButton?.getAttribute('aria-expanded') === 'true' && ['PageDown', 'PageUp', 'Space', 'ArrowDown', 'ArrowUp'].includes(event.code)) setMenuState(false); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 768) setMenuState(false); });

  root.querySelectorAll('[data-subscribe-form]').forEach((form) => {
    form.addEventListener('submit', (event) => { event.preventDefault(); void handleSubscribe(form); });
  });

  const dialog = root.getElementById('contact-dialog');
  root.querySelectorAll('[data-open-contact]').forEach((button, index) => {
    if (!button.id) button.id = `contact-trigger-${index + 1}`;
    button.addEventListener('click', () => setDialogState(dialog, true, button));
  });
  dialog?.querySelector('[data-close-contact]')?.addEventListener('click', () => setDialogState(dialog, false));
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) setDialogState(dialog, false); });
  dialog?.addEventListener('cancel', (event) => { event.preventDefault(); setDialogState(dialog, false); });
  dialog?.querySelector('form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('[type="email"]');
    if (!emailPattern.test(email.value.trim())) {
      email.setAttribute('aria-invalid', 'true');
      email.setAttribute('aria-describedby', 'contact-form-message');
      const message = dialog.querySelector('[data-form-message]');
      if (message) { message.textContent = 'Please enter a valid email address.'; message.className = 'form-message form-message--error'; }
      email.focus();
      return;
    }
    try {
      const result = await sendContactMessage({ name: form.querySelector('[name="name"]').value.trim(), email: email.value.trim(), message: form.querySelector('[name="message"]').value.trim() });
      form.reset();
      setDialogState(dialog, false);
      showToast(result.mode === 'endpoint' ? 'Your message is on its way. We will reply within 48 hours.' : 'Your email client is ready to send the message.');
    } catch (error) {
      showToast('We could not reach the mail service. Please try again.', 'error');
    }
  });

  root.querySelectorAll('[data-donation-form]').forEach((form) => form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = form.querySelector('[name="amount"]')?.value.trim();
    const email = form.querySelector('[name="email"]');
    if (!amount || Number(amount) <= 0 || !emailPattern.test(email.value.trim())) {
      email.setAttribute('aria-invalid', 'true');
      email.setAttribute('aria-describedby', 'donation-form-message');
      const message = form.querySelector('[data-form-message]');
      if (message) { message.textContent = 'Enter a valid email and an amount greater than zero.'; message.className = 'form-message form-message--error'; }
      email.focus();
      return;
    }
    email.removeAttribute('aria-invalid');
    email.removeAttribute('aria-describedby');
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    try {
      const result = await createDonationIntent({ amount: `$${Number(amount).toFixed(2)}`, email: email.value.trim(), project: form.querySelector('[name="project"]').value });
      const message = form.querySelector('[data-form-message]');
      if (message) { message.textContent = result.mode === 'endpoint' ? 'Secure donation checkout is opening.' : 'Your email client is ready to send the donation request.'; message.className = 'form-message form-message--success'; }
      showToast(result.mode === 'endpoint' ? 'Secure donation checkout is opening.' : 'Your email client is ready to send the donation request.');
    } catch {
      const message = form.querySelector('[data-form-message]');
      if (message) { message.textContent = 'We could not start the donation flow. Please try again.'; message.className = 'form-message form-message--error'; }
      showToast('We could not start the donation flow. Please try again.', 'error');
    }
    button.disabled = false;
    button.removeAttribute('aria-busy');
  }));
  root.querySelectorAll('[data-donation-form]').forEach((form) => {
    const amount = form.querySelector('[name="amount"]');
    form.querySelectorAll('[name="amount-choice"]').forEach((choice) => choice.addEventListener('change', () => { amount.value = choice.value; }));
    const project = new URLSearchParams(window.location.search).get('project');
    const projectSelect = form.querySelector('[name="project"]');
    if (project && projectSelect && [...projectSelect.options].some((option) => option.text === project)) projectSelect.value = project;
  });

  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('active'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  root.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right').forEach((element) => revealObserver.observe(element));

  const progressObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.style.width = `${entry.target.dataset.width}%`; progressObserver.unobserve(entry.target); }
  }), { threshold: 0.3 });
  root.querySelectorAll('.progress-bar').forEach((bar) => progressObserver.observe(bar));

  root.querySelectorAll('[data-project-filter]').forEach((filter) => filter.addEventListener('click', () => {
    const selected = filter.dataset.projectFilter;
    root.querySelectorAll('[data-project-filter]').forEach((button) => {
      const isSelected = button === filter;
      button.classList.toggle('is-active', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
    root.querySelectorAll('[data-project-card]').forEach((card) => card.classList.toggle('is-hidden', selected !== 'all' && card.dataset.category !== selected));
  }));

  root.querySelectorAll('[data-impact-tab]').forEach((tab) => tab.addEventListener('click', () => {
    const selected = tab.dataset.impactTab;
    root.querySelectorAll('[data-impact-tab]').forEach((button) => {
      const isSelected = button === tab;
      button.classList.toggle('is-active', isSelected);
      button.setAttribute('aria-selected', String(isSelected));
    });
    root.querySelectorAll('[data-impact-panel]').forEach((panel) => panel.classList.toggle('is-active', panel.dataset.impactPanel === selected));
  }));

  const countObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = entry.target;
    const end = Number(target.dataset.count);
    const suffix = end === 1500000 ? 'M+' : '';
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1000, 1);
      const value = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      target.textContent = suffix ? `${(value / 1000000).toFixed(1)}M+` : value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(target);
  }), { threshold: 0.5 });
  root.querySelectorAll('[data-count]').forEach((counter) => countObserver.observe(counter));

  const cookieBanner = root.getElementById('cookie-consent');
  const cookieDialog = root.getElementById('cookie-dialog');
  const cookieKey = 'greencare-cookie-consent';
  const saveCookieChoice = (choice) => {
    try { localStorage.setItem(cookieKey, JSON.stringify({ essential: true, analytics: choice === 'all', savedAt: Date.now() })); } catch { /* private browsing can block storage */ }
    cookieBanner.hidden = true;
  };
  let savedCookieChoice = null;
  try { savedCookieChoice = JSON.parse(localStorage.getItem(cookieKey) || 'null'); } catch { savedCookieChoice = null; }
  if (!savedCookieChoice && cookieBanner) requestAnimationFrame(() => { cookieBanner.hidden = false; });
  root.querySelector('[data-cookie-accept]')?.addEventListener('click', () => { saveCookieChoice('all'); showToast('Cookie preferences saved.'); });
  root.querySelector('[data-cookie-essential]')?.addEventListener('click', () => { saveCookieChoice('essential'); showToast('Essential cookies only.'); });
  const cookieSettings = root.querySelector('[data-cookie-settings]');
  if (cookieSettings && !cookieSettings.id) cookieSettings.id = 'cookie-settings-trigger';
  const setCookieDialogState = (open) => {
    if (!cookieDialog) return;
    if (open) {
      cookieDialog.dataset.trigger = cookieSettings?.id || '';
      cookieDialog.showModal();
      cookieDialog.querySelector('input, button')?.focus();
    } else if (cookieDialog.open) {
      cookieDialog.close();
      document.getElementById(cookieDialog.dataset.trigger)?.focus();
    }
  };
  cookieSettings?.addEventListener('click', () => {
    const analytics = root.querySelector('[data-cookie-analytics]');
    if (analytics) analytics.checked = Boolean(savedCookieChoice?.analytics);
    setCookieDialogState(true);
  });
  cookieDialog?.addEventListener('cancel', (event) => { event.preventDefault(); setCookieDialogState(false); });
  root.querySelectorAll('[data-cookie-close]').forEach((button) => button.addEventListener('click', () => setCookieDialogState(false)));
  root.querySelector('[data-cookie-save]')?.addEventListener('click', () => {
    saveCookieChoice(root.querySelector('[data-cookie-analytics]')?.checked ? 'all' : 'essential');
    setCookieDialogState(false);
    showToast('Cookie preferences saved.');
  });
}
