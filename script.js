// ============================================
// notyour.regularsaga — Tote Workshop site
// Tiny bit of JS: burger menu, scroll reveal,
// current year, close menu on link click.
// ============================================

(() => {
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

  // ---- current year ----
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

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

  // ---- pause video when off-screen (save bandwidth) ----
  const vid = document.getElementById('peekVideo');
  if (vid) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting && !vid.paused) vid.pause();
      });
    }, { threshold: 0.2 });
    vio.observe(vid);
  }
})();
