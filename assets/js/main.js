/* ================================================================
   MAIN.JS — EpoxyPro Premium v2.0
   GSAP + ScrollTrigger Animations | Advanced Interactions
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. PAGE LOADER
     ============================================================ */
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      initHeroAnimations();
    }, 1400);
  } else {
    initHeroAnimations();
  }

  /* ============================================================
     2. SCROLL PROGRESS BAR
     ============================================================ */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ============================================================
     3. THEME TOGGLE
     ============================================================ */
  const savedTheme = localStorage.getItem('epoxy-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('epoxy-theme', next);
      updateThemeIcons(next);
    });
  });

  function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-icon').forEach(icon => {
      icon.className = 'theme-icon fas ' + (theme === 'dark' ? 'fa-sun' : 'fa-moon');
    });
  }

  /* ============================================================
     4. RTL TOGGLE
     ============================================================ */
  const savedDir = localStorage.getItem('epoxy-dir') || 'ltr';
  applyDir(savedDir);

  document.querySelectorAll('.rtl-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      applyDir(next);
      localStorage.setItem('epoxy-dir', next);
    });
  });

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.querySelectorAll('.rtl-label').forEach(el => {
      el.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  }

  /* ============================================================
     5. STICKY HEADER WITH GLASS EFFECT
     ============================================================ */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        siteHeader.classList.add('scrolled');
        siteHeader.classList.remove('header-transparent');
      } else {
        siteHeader.classList.remove('scrolled');
        if (siteHeader.dataset.transparent) {
          siteHeader.classList.add('header-transparent');
        }
      }
    };
    if (siteHeader.dataset.transparent) {
      siteHeader.classList.add('header-transparent');
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ============================================================
     6. BACK TO TOP
     ============================================================ */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ============================================================
     7. HERO ANIMATIONS (GSAP or fallback)
     ============================================================ */
  function initHeroAnimations() {
    if (typeof gsap !== 'undefined') {
      initGSAPAnimations();
    } else {
      initFallbackHero();
    }
  }

  function initGSAPAnimations() {
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero title stagger reveal
    const heroLines = document.querySelectorAll('.hero-title .line-inner');
    if (heroLines.length) {
      gsap.set(heroLines, { y: '100%', opacity: 0 });
      gsap.to(heroLines, {
        y: '0%',
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.2
      });
    }

    // Hero badge
    gsap.from('.hero-badge', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });

    // Hero subtitle
    gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.8 });

    // Hero buttons
    gsap.from('.hero-cta-row', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 1.0 });

    // Hero trust row
    gsap.from('.hero-trust-row', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 });

    // Hero stats stagger
    gsap.from('.hero-stat-item', {
      y: 40, opacity: 0, duration: 0.9, ease: 'back.out(1.7)',
      stagger: 0.12, delay: 1.3
    });

    // Hero float card
    gsap.from('.hero-float-card', {
      x: 80, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.6
    });

    // Hero parallax on scroll
    if (typeof ScrollTrigger !== 'undefined') {
      const heroBg = document.querySelector('.hero-bg-image');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // Section scroll reveals
      // initScrollTriggerReveals();
    }
  }

  function initScrollTriggerReveals() {
    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
      if (!el.closest('.hero-section')) {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      }
    });

    // Service cards stagger
    document.querySelectorAll('.row .service-card').forEach((card, i) => {
      gsap.from(card.parentElement, {
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        delay: (i % 3) * 0.12,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
    });

    // Feature items
    document.querySelectorAll('.feature-item').forEach((item, i) => {
      gsap.from(item, {
        x: i % 2 === 0 ? -40 : 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        delay: Math.floor(i / 2) * 0.1,
        scrollTrigger: { trigger: item, start: 'top 88%', once: true }
      });
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50, opacity: 0, scale: 0.95, duration: 0.85, ease: 'power3.out',
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
    });

    // Counter section
    gsap.from('.counter-item', {
      scale: 0.8, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
      stagger: 0.1,
      scrollTrigger: { trigger: '.counter-section', start: 'top 80%', once: true }
    });

    // Testimonials
    gsap.from('.testimonial-card', {
      y: 50, opacity: 0, duration: 0.85, ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '#testimonials', start: 'top 80%', once: true }
    });

    // CTA section
    gsap.from('.cta-section .col-lg-7 > *', {
      x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%', once: true }
    });
    gsap.from('.cta-section .col-lg-5', {
      x: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%', once: true }
    });
  }

  function initFallbackHero() {
    // CSS-based fallback for hero animations
    const badge = document.querySelector('.hero-badge');
    const lines = document.querySelectorAll('.hero-title .line-inner');
    const subtitle = document.querySelector('.hero-subtitle');
    const ctaRow = document.querySelector('.hero-cta-row');
    const trustRow = document.querySelector('.hero-trust-row');
    const stats = document.querySelectorAll('.hero-stat-item');
    const floatCard = document.querySelector('.hero-float-card');

    const revealEl = (el, delay, cls = 'revealed') => {
      if (!el) return;
      setTimeout(() => el.classList.add(cls), delay);
    };

    if (badge) { badge.style.opacity = '0'; badge.style.transform = 'translateY(-20px)'; badge.style.transition = 'all 0.8s ease'; revealEl(badge, 200); }

    lines.forEach((line, i) => {
      line.style.transition = `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s, opacity 0.7s ease ${0.2 + i * 0.15}s`;
      setTimeout(() => line.classList.add('revealed'), 100);
    });

    if (subtitle) { subtitle.classList.add('reveal-up'); setTimeout(() => subtitle.classList.add('revealed'), 900); }
    if (ctaRow) { ctaRow.classList.add('reveal-up'); setTimeout(() => ctaRow.classList.add('revealed'), 1050); }
    if (trustRow) { trustRow.classList.add('reveal-up'); setTimeout(() => trustRow.classList.add('revealed'), 1200); }
    stats.forEach((s, i) => { s.classList.add('reveal-up'); setTimeout(() => s.classList.add('revealed'), 1300 + i * 100); });
    if (floatCard) { floatCard.classList.add('reveal-right'); setTimeout(() => floatCard.classList.add('revealed'), 600); }
  }

  /* ============================================================
     8. SCROLL REVEAL (non-GSAP fallback)
     ============================================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  /* ============================================================
     9. AOS INIT
     ============================================================ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      once: true,
      easing: 'ease-out-cubic',
      offset: 70,
      delay: 0
    });
  } else {
    const aosObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('aos-animate');
          aosObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));
  }

  /* ============================================================
     10. ANIMATED COUNTERS (premium easing)
     ============================================================ */
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length) {
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target || el.textContent.replace(/[^0-9]/g, ''), 10);
      if (isNaN(target)) return;
      const suffix = el.dataset.suffix || '';
      const duration = 2200;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ============================================================
     11. SKILL BARS
     ============================================================ */
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width || '0%';
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(f => skillObserver.observe(f));
  }

  /* ============================================================
     12. GALLERY FILTER — SMOOTH TRANSITIONS
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach((item, i) => {
        const matches = filter === 'all' || item.dataset.category === filter;
        if (matches) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.88) translateY(20px)';
          setTimeout(() => {
            item.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s`;
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
          }, 10);
        } else {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => { item.style.display = 'none'; }, 350);
        }
      });
    });
  });

  /* ============================================================
     13. TESTIMONIALS AUTO-CAROUSEL
     ============================================================ */
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let testimonialIndex = 0;
  let testimonialTimer = null;

  if (testimonialsTrack && testimonialDots.length) {
    const slides = testimonialsTrack.querySelectorAll('.testimonial-slide');
    const slidesPerView = window.innerWidth > 991 ? 3 : window.innerWidth > 767 ? 2 : 1;
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    const goToSlide = (idx) => {
      testimonialIndex = Math.max(0, Math.min(idx, maxIndex));
      const slideWidth = testimonialsTrack.querySelector('.testimonial-slide')?.offsetWidth || 0;
      const gap = 24;
      testimonialsTrack.style.transform = `translateX(-${testimonialIndex * (slideWidth + gap)}px)`;
      testimonialDots.forEach((d, i) => d.classList.toggle('active', i === testimonialIndex));
    };

    testimonialDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetTimer();
      });
    });

    const nextSlide = () => {
      goToSlide(testimonialIndex >= maxIndex ? 0 : testimonialIndex + 1);
    };

    const resetTimer = () => {
      clearInterval(testimonialTimer);
      testimonialTimer = setInterval(nextSlide, 5000);
    };

    // Pause on hover
    testimonialsTrack.closest('section')?.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
    testimonialsTrack.closest('section')?.addEventListener('mouseleave', resetTimer);

    // Touch swipe
    let touchStart = 0;
    testimonialsTrack.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
    testimonialsTrack.addEventListener('touchend', e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? testimonialIndex + 1 : testimonialIndex - 1);
        resetTimer();
      }
    });

    goToSlide(0);
    resetTimer();
  }

  /* ============================================================
     14. LIGHTBOX
     ============================================================ */
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', () => {
        const src = el.dataset.lightbox || el.querySelector('img')?.src;
        if (src) {
          lightboxImg.src = src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 400);
    };
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ============================================================
     15. FAQ ACCORDION
     ============================================================ */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ============================================================
     16. BEFORE / AFTER SLIDER
     ============================================================ */
  document.querySelectorAll('.before-after-container').forEach(container => {
    const before = container.querySelector('.ba-before');
    const divider = container.querySelector('.ba-divider');
    let dragging = false;

    const setPosition = (x) => {
      const rect = container.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      pos = Math.max(4, Math.min(96, pos));
      if (before) before.style.width = pos + '%';
      if (divider) divider.style.left = pos + '%';
    };

    container.addEventListener('mousedown', e => { dragging = true; setPosition(e.clientX); e.preventDefault(); });
    document.addEventListener('mouseup', () => { dragging = false; });
    document.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    container.addEventListener('touchstart', () => { dragging = true; }, { passive: true });
    document.addEventListener('touchend', () => { dragging = false; });
    document.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
  });

  /* ============================================================
     17. PREMIUM BUTTON RIPPLE EFFECT
     ============================================================ */
  document.querySelectorAll('.btn-primary-custom, .btn-dark-custom').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ============================================================
     18. MAGNETIC HOVER EFFECT (desktop only)
     ============================================================ */
  if (window.innerWidth > 991) {
    document.querySelectorAll('.btn-primary-custom, .btn-dark-custom').forEach(btn => {
      btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translateY(-3px) translate(${x * 0.08}px, ${y * 0.08}px) scale(1.02)`;
      });
      btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  /* ============================================================
     19. FORM VALIDATION
     ============================================================ */
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const errMsg = field.parentElement.querySelector('.form-error-msg')
          || field.closest('.form-group-custom')?.querySelector('.form-error-msg');
        const val = field.value.trim();

        if (!val) {
          valid = false;
          field.classList.add('error-field');
          if (errMsg) errMsg.classList.add('show');
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          valid = false;
          field.classList.add('error-field');
          if (errMsg) { errMsg.textContent = 'Please enter a valid email.'; errMsg.classList.add('show'); }
        } else {
          field.classList.remove('error-field');
          if (errMsg) errMsg.classList.remove('show');
        }
      });

      if (valid) {
        showToast('Thank you! We\'ll be in touch shortly.', 'success');
        form.reset();
        form.querySelectorAll('.error-field').forEach(f => f.classList.remove('error-field'));
        form.querySelectorAll('.form-error-msg.show').forEach(m => m.classList.remove('show'));
      }
    });

    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error-field');
        const errMsg = field.parentElement.querySelector('.form-error-msg')
          || field.closest('.form-group-custom')?.querySelector('.form-error-msg');
        if (errMsg) errMsg.classList.remove('show');
      });
    });
  });

  /* ============================================================
     20. TOAST NOTIFICATION
     ============================================================ */
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }
  window.showToast = showToast;

  /* ============================================================
     21. COUNTDOWN TIMER
     ============================================================ */
  const countdownEl = document.querySelector('.countdown-timer');
  if (countdownEl) {
    const target = new Date();
    target.setDate(target.getDate() + 30);
    const update = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const fmt = n => String(n).padStart(2, '0');
      const dEl = countdownEl.querySelector('.cd-days');
      const hEl = countdownEl.querySelector('.cd-hours');
      const mEl = countdownEl.querySelector('.cd-mins');
      const sEl = countdownEl.querySelector('.cd-secs');
      if (dEl) dEl.textContent = fmt(d);
      if (hEl) hEl.textContent = fmt(h);
      if (mEl) mEl.textContent = fmt(m);
      if (sEl) sEl.textContent = fmt(s);
    };
    update();
    setInterval(update, 1000);
  }

  /* ============================================================
     22. ACTIVE NAV LINK
     ============================================================ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ============================================================
     23. PASSWORD VISIBILITY TOGGLE
     ============================================================ */
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.querySelector(btn.dataset.target);
      if (input) {
        const isText = input.type === 'text';
        input.type = isText ? 'password' : 'text';
        btn.querySelector('i').className = `fas ${isText ? 'fa-eye' : 'fa-eye-slash'}`;
      }
    });
  });

  /* ============================================================
     24. NAVBAR COLLAPSE ON MOBILE LINK CLICK
     ============================================================ */
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.click();
        }
      });
    });
  }

  /* ============================================================
     25. PARALLAX ON HERO PARTICLES (lightweight)
     ============================================================ */
  const heroParticles = document.querySelectorAll('.hero-particle');
  if (heroParticles.length && window.innerWidth > 991) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroParticles.forEach((p, i) => {
        const speed = [0.15, 0.25, 0.10][i] || 0.15;
        p.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  /* ============================================================
     26. HOVER CARD TILT (subtle 3D effect)
     ============================================================ */
  if (window.innerWidth > 991) {
    document.querySelectorAll('.service-card, .testimonial-card, .pricing-card').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        this.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  /* ============================================================
     27. SECTION DIVIDER WAVE REVEAL
     ============================================================ */
  document.querySelectorAll('.section-divider').forEach(divider => {
    const dividerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wave-revealed');
          dividerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    dividerObserver.observe(divider);
  });

  /* ============================================================
     28. MARQUEE/TICKER (if present)
     ============================================================ */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    // Duplicate content for seamless loop
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  }

}); // END DOMContentLoaded
