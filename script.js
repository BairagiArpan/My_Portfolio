document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. LOADER ─────────────────────────────────────────── */
  const loader = document.getElementById('loader');

  const hideLoader = () => {
    loader.classList.add('hidden');
    // Kick off hero reveal
    document.querySelectorAll('.hero .reveal-left, .hero .reveal-right')
      .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 150));
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 1500);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 400));
    setTimeout(hideLoader, 2400); // safety
  }

  /* ─── 2. SCROLL PROGRESS ────────────────────────────────── */
  const progress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const h   = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    progress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ─── 3. BACK TO TOP ────────────────────────────────────── */
  const btt = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─── 4. NAVBAR ─────────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    // Scrolled style
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active section highlight
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === current));

    updateProgress();
    btt.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── 5. MOBILE MENU ────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));

  // Close on outside tap
  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  /* ─── 6. SMOOTH SCROLLING ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ─── 7. THEME TOGGLE ───────────────────────────────────── */
  const themeBtn  = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html      = document.documentElement;

  const applyTheme = (t) => {
    html.setAttribute('data-theme', t);
    localStorage.setItem('portfolio-theme', t);
    themeIcon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  };

  applyTheme(localStorage.getItem('portfolio-theme') || 'dark');
  themeBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ─── 8. TYPING ANIMATION ───────────────────────────────── */
  const typedEl  = document.getElementById('typed-text');
  const phrases  = ['full-stack apps.', 'beautiful UIs.', 'scalable APIs.', 'things people love.'];
  let   pi = 0, ci = 0, deleting = false;

  const type = () => {
    const phrase = phrases[pi];
    typedEl.textContent = deleting ? phrase.slice(0, ci - 1) : phrase.slice(0, ci + 1);
    deleting ? ci-- : ci++;

    if (!deleting && ci === phrase.length) {
      deleting = true; return setTimeout(type, 1800);
    }
    if (deleting && ci === 0) {
      deleting = false; pi = (pi + 1) % phrases.length;
      return setTimeout(type, 400);
    }
    setTimeout(type, deleting ? 40 : 75);
  };

  setTimeout(type, 1800);

  /* ─── 9. REVEAL ON SCROLL (IntersectionObserver) ─────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
    .forEach(el => revealObs.observe(el));

  /* ─── 10. SKILL BARS ────────────────────────────────────── */
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.width = e.target.dataset.width + '%'; }, 180);
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.bar-fill').forEach(b => barObs.observe(b));

  /* ─── 11. COUNTERS ──────────────────────────────────────── */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.target, 10);
      let cur   = 0;
      const step = Math.ceil(end / (1600 / 16));
      const tick = () => {
        cur = Math.min(cur + step, end);
        el.textContent = cur;
        if (cur < end) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('.counter').forEach(c => counterObs.observe(c));

  /* ─── 12. PROJECT FILTER ────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      projectCards.forEach(card => {
        const show = f === 'all' || card.dataset.category === f;
        if (show) {
          card.classList.remove('hidden');
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ─── 13. CONTACT FORM ──────────────────────────────────── */
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  if (form) {
    // Live validation on blur
    form.querySelectorAll('input,textarea').forEach(f => {
      f.addEventListener('blur', () => validate(f));
      f.addEventListener('input', () => {
        if (f.classList.contains('invalid')) {
          f.classList.remove('invalid');
          getErr(f).textContent = '';
        }
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('[required]')];
      if (!fields.map(validate).every(Boolean)) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      await new Promise(r => setTimeout(r, 1500)); // simulate send

      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      successMsg.removeAttribute('hidden');
      form.querySelectorAll('.field, .form-row').forEach(el => el.style.display = 'none');
      submitBtn.style.display = 'none';
    });
  }

  function validate(field) {
    const v = field.value.trim();
    const errEl = getErr(field);
    let msg = '';

    if (!v) {
      msg = getLabel(field) + ' is required.';
    } else if (field.type === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'Enter a valid email address.';
    } else if (field.tagName === 'TEXTAREA' && v.length < 20) {
      msg = 'Message must be at least 20 characters.';
    }

    field.classList.toggle('invalid', !!msg);
    errEl.textContent = msg;
    return !msg;
  }

  function getErr(f) { return f.closest('.field').querySelector('.err'); }
  function getLabel(f) {
    const lbl = f.closest('.field').querySelector('label');
    return lbl ? lbl.textContent : 'This field';
  }

  /* ─── 14. FOOTER YEAR ───────────────────────────────────── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

});