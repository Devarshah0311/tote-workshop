// ============================================
// notyour.regularsaga — Tote Workshop site
// Burger menu, scroll reveal, video fallback,
// contact form stub. No framework, no build.
// ============================================

// TODO: paste your Formspree endpoint (https://formspree.io/f/xxxxxxx)
// or Web3Forms endpoint here to make the contact form actually send.
// While this is empty, the form will show a friendly "coming soon" note.
const FORM_ENDPOINT = '';

(() => {
  // ---- burger menu ----
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('navMenu');

  const closeMenu = () => {
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ---- scroll reveal ----
  const targets = document.querySelectorAll(
    '.section__head, .perk, .card, .event, .partner-card, .stat, .details__card, .peek__video-wrap, .aboutus__copy, .contact__card'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));

  // ---- video: pause offscreen + fallback if it fails ----
  const vid  = document.getElementById('peekVideo');
  const wrap = document.getElementById('peekVideoWrap');
  const fallback = wrap && wrap.querySelector('.peek__fallback');

  if (vid && wrap && fallback) {
    const showFallback = () => {
      wrap.classList.add('is-fallback');
      fallback.hidden = false;
    };

    vid.addEventListener('error', showFallback);
    // <source> errors bubble up as errors on the video only in some browsers.
    const source = vid.querySelector('source');
    if (source) source.addEventListener('error', showFallback);

    // last-resort: if metadata never loads within 8s, show fallback
    let loaded = false;
    vid.addEventListener('loadedmetadata', () => { loaded = true; });
    setTimeout(() => { if (!loaded && vid.networkState === 3) showFallback(); }, 8000);

    const vio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting && !vid.paused) vid.pause();
      });
    }, { threshold: 0.2 });
    vio.observe(vid);
  }

  // ---- contact form ----
  const form = document.getElementById('contactForm');
  if (form) {
    const btn = form.querySelector('button[type="submit"]');
    const sentEl = form.querySelector('.contact__sent');
    const errEl  = form.querySelector('.contact__err');

    const setBusy = (busy) => {
      btn.disabled = busy;
      btn.textContent = busy ? 'Sending…' : btn.dataset.defaultText;
    };

    const validate = () => {
      const name = form.name.value.trim();
      const contact = form.contact.value.trim();
      return name.length >= 2 && contact.length >= 3;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      sentEl.hidden = true;
      errEl.hidden = true;

      if (!validate()) {
        errEl.textContent = 'Please add your name and how we can reach you.';
        errEl.hidden = false;
        return;
      }

      // No backend configured yet — show a friendly note.
      if (!FORM_ENDPOINT) {
        sentEl.textContent = "Almost there — form isn't live yet. Please DM us on Instagram for now. 🌿";
        sentEl.hidden = false;
        return;
      }

      setBusy(true);
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        if (!res.ok) throw new Error('bad status ' + res.status);
        sentEl.textContent = "Got it — we'll reply soon. 🌿";
        sentEl.hidden = false;
        form.reset();
      } catch (err) {
        errEl.textContent = 'Something went wrong — please DM us on Instagram instead.';
        errEl.hidden = false;
      } finally {
        setBusy(false);
      }
    });
  }
})();
