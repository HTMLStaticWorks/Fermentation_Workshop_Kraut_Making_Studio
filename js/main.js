/**
 * ============================================================
 *  KRAUTCRAFT — CORE APPLICATION SCRIPT
 *  main.js — runs on every page (except dashboards / auth)
 * ============================================================
 */

(function ($) {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     1. THEME  (Dark / Light)
  ────────────────────────────────────────────────────────── */
  const ThemeManager = {
    key: 'kc_theme',
    init() {
      const saved = localStorage.getItem(this.key);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = saved ? saved === 'dark' : prefersDark;
      this.apply(isDark ? 'dark' : 'light');
      this.bindToggle();
    },
    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.key, theme);
      const sun  = document.querySelector('.icon-sun');
      const moon = document.querySelector('.icon-moon');
      if (sun && moon) {
        sun.classList.toggle('d-none',  theme === 'dark');
        moon.classList.toggle('d-none', theme === 'light');
      }
    },
    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      this.apply(current === 'dark' ? 'light' : 'dark');
    },
    bindToggle() {
      $(document).off('click', '#theme-toggle, #mobile-theme-toggle').on('click', '#theme-toggle, #mobile-theme-toggle', () => this.toggle());
    }
  };

  /* ──────────────────────────────────────────────────────────
     2. RTL SUPPORT
  ────────────────────────────────────────────────────────── */
  const RTLManager = {
    key: 'kc_dir',
    init() {
      const saved = localStorage.getItem(this.key) || 'ltr';
      this.apply(saved);
      this.bindToggle();
    },
    apply(dir) {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
      localStorage.setItem(this.key, dir);
      const btn = document.getElementById('rtl-toggle');
      if (btn) btn.style.color = dir === 'rtl' ? 'var(--clr-primary)' : '';
    },
    toggle() {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      this.apply(current === 'rtl' ? 'ltr' : 'rtl');
    },
    bindToggle() {
      $(document).off('click', '#rtl-toggle, #mobile-rtl-toggle').on('click', '#rtl-toggle, #mobile-rtl-toggle', () => this.toggle());
    }
  };

  /* ──────────────────────────────────────────────────────────
     3. COMPONENT LOADER (Deprecated - now using static HTML)
  ────────────────────────────────────────────────────────── */
  const ComponentLoader = {
    load() { /* Deprecated */ }
  };

  /* ──────────────────────────────────────────────────────────
     4. ACTIVE NAV LINK
  ────────────────────────────────────────────────────────── */
  function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = page.replace('.html', '');
    $('[data-page]').each(function () {
      const dp = $(this).data('page');
      const isActive = dp === pageKey || 
                       (dp === 'home' && (pageKey === 'index' || pageKey === '')) ||
                       (dp === 'home2' && pageKey === 'index2');
      $(this).toggleClass('active', isActive);
    });
  }

  /* ──────────────────────────────────────────────────────────
     5. HAMBURGER MENU
  ────────────────────────────────────────────────────────── */
  function bindHamburger() {
    $(document).off('click', '#hamburger').on('click', '#hamburger', function () {
      const open = !$(this).hasClass('open');
      $(this).toggleClass('open', open).attr('aria-expanded', open);
      $('#mobile-nav').toggleClass('open', open);
    });
    // Close on outside click
    $(document).off('click.hamburgerClose').on('click.hamburgerClose', function (e) {
      if (!$(e.target).closest('#hamburger, #mobile-nav').length) {
        $('#hamburger').removeClass('open').attr('aria-expanded', false);
        $('#mobile-nav').removeClass('open');
      }
    });
    // Close on nav link click
    $(document).off('click', '.mobile-nav-link').on('click', '.mobile-nav-link', function () {
      // Don't close if clicking a button (Theme/RTL toggles)
      if ($(this).is('button')) return;
      
      $('#hamburger').removeClass('open').attr('aria-expanded', false);
      $('#mobile-nav').removeClass('open');
    });
  }

  /* ──────────────────────────────────────────────────────────
     6. STICKY HEADER SHADOW
  ────────────────────────────────────────────────────────── */
  function bindHeaderScroll() {
    $(window).off('scroll.header').on('scroll.header', function () {
      $('#site-header').toggleClass('scrolled', window.scrollY > 10);
    });
  }

  /* ──────────────────────────────────────────────────────────
     7. SCROLL REVEAL ANIMATIONS
  ────────────────────────────────────────────────────────── */
  const ScrollReveal = {
    init() {
      if (!('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('reveal-init');
        io.observe(el);
      });
    }
  };

  /* ──────────────────────────────────────────────────────────
     8. TOAST NOTIFICATIONS
  ────────────────────────────────────────────────────────── */
  window.showToast = function (type, title, message, duration = 4000) {
    let $container = $('#toast-container');
    if (!$container.length) {
      $container = $('<div id="toast-container" role="alert" aria-live="polite"></div>').appendTo('body');
    }
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const $toast = $(`
      <div class="toast" role="status">
        <span style="font-size:1.2rem;">${icons[type] || icons.info}</span>
        <div>
          <strong style="display:block;margin-bottom:2px;font-size:var(--fs-sm);">${title}</strong>
          <span style="font-size:var(--fs-xs);color:var(--clr-text-muted);">${message}</span>
        </div>
        <button style="margin-left:auto;color:var(--clr-text-light);font-size:1rem;line-height:1;" aria-label="Close notification">×</button>
      </div>
    `);
    $container.append($toast);
    $toast.find('button').on('click', () => removeToast($toast));
    setTimeout(() => removeToast($toast), duration);
  };

  function removeToast($toast) {
    $toast.addClass('removing');
    setTimeout(() => $toast.remove(), 300);
  }

  /* ──────────────────────────────────────────────────────────
     9. TABS
  ────────────────────────────────────────────────────────── */
  $(document).off('click', '.tab-btn').on('click', '.tab-btn', function () {
    const target = $(this).data('tab');
    const $container = $(this).closest('.tabs-component');
    $container.find('.tab-btn').removeClass('active').attr('aria-selected', false);
    $container.find('.tab-panel').removeClass('active').attr('hidden', true);
    $(this).addClass('active').attr('aria-selected', true);
    $container.find(`[data-panel="${target}"]`).addClass('active').removeAttr('hidden');
  });

  /* ──────────────────────────────────────────────────────────
     10. MODAL
  ────────────────────────────────────────────────────────── */
  $(document).off('click', '[data-modal-open]').on('click', '[data-modal-open]', function () {
    const id = $(this).data('modal-open');
    $(`#${id}`).addClass('open');
    $('body').css('overflow', 'hidden');
  });
  $(document).off('click', '[data-modal-close], .modal-overlay').on('click', '[data-modal-close], .modal-overlay', function (e) {
    if ($(e.target).is('.modal-overlay') || $(e.target).is('[data-modal-close]')) {
      $(this).closest('.modal-overlay').removeClass('open');
      $('body').css('overflow', '');
    }
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.modal-overlay.open').removeClass('open');
      $('body').css('overflow', '');
    }
  });

  /* ──────────────────────────────────────────────────────────
     11. FORM VALIDATION HELPERS
  ────────────────────────────────────────────────────────── */
  window.Validate = {
    required(val) { return val.trim().length > 0; },
    email(val)    { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val); },
    minLen(val, n){ return val.trim().length >= n; },
    phone(val)    { return /^[\d\s\-+()]{7,}$/.test(val); },

    showError($input, msg) {
      $input.addClass('is-error').removeClass('is-success');
      let $err = $input.siblings('.form-error');
      if (!$err.length) $err = $('<span class="form-error" role="alert"></span>').insertAfter($input);
      $err.html(`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> ${msg}`);
    },
    clearError($input) {
      $input.removeClass('is-error').addClass('is-success');
      $input.siblings('.form-error').remove();
    },
    clearAll($form) {
      $form.find('.form-control').removeClass('is-error is-success');
      $form.find('.form-error').remove();
    }
  };

  /* ──────────────────────────────────────────────────────────
     12. PASSWORD TOGGLE
  ────────────────────────────────────────────────────────── */
  $(document).off('click', '.pw-toggle').on('click', '.pw-toggle', function () {
    const $input = $(this).siblings('input');
    const isText = $input.attr('type') === 'text';
    $input.attr('type', isText ? 'password' : 'text');
    $(this).html(isText
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="12" x2="23" y2="23"/></svg>`
    );
  });

  /* ──────────────────────────────────────────────────────────
     13. COUNTER ANIMATION
  ────────────────────────────────────────────────────────── */
  window.animateCounter = function ($el, target, duration = 2000, suffix = '') {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const val = Math.floor(progress * target);
      $el.text(val.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ──────────────────────────────────────────────────────────
     14. PAGE LOADER
  ────────────────────────────────────────────────────────── */
  function hidePageLoader() {
    const $loader = $('#page-loader');
    if ($loader.length) {
      setTimeout(() => $loader.addClass('hidden'), 300);
    }
  }

  /* ──────────────────────────────────────────────────────────
     15. BACK TO TOP
  ────────────────────────────────────────────────────────── */
  const BackToTop = {
    init() {
      const $btn = $(`
        <button id="back-to-top" aria-label="Back to Top" title="Back to Top">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `).appendTo('body');

      $(window).on('scroll.backToTop', () => {
        $btn.toggleClass('visible', window.scrollY > 300);
      });

      $btn.on('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  /* ──────────────────────────────────────────────────────────
     16. INIT
  ────────────────────────────────────────────────────────── */
  function init() {
    ThemeManager.init();
    RTLManager.init();
    bindHamburger();
    bindHeaderScroll();
    setActiveNav();
    BackToTop.init();
    ScrollReveal.init();
    hidePageLoader();
  }

  $(document).ready(init);

  // Expose for use in individual pages
  window.KrautCraft = { ThemeManager, RTLManager, ComponentLoader };

}(jQuery));


/* ──────────────────────────────────────────────────────────
   SCROLL REVEAL CSS (injected once here for reuse)
────────────────────────────────────────────────────────── */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal-init {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal-init[data-reveal="left"]  { transform: translateX(-32px); }
    .reveal-init[data-reveal="right"] { transform: translateX(32px); }
    .reveal-init[data-reveal="scale"] { transform: scale(0.92); }
    .reveal-init.is-visible {
      opacity: 1;
      transform: none;
    }
    /* Delay helpers */
    .reveal-d1 { transition-delay: 0.1s; }
    .reveal-d2 { transition-delay: 0.2s; }
    .reveal-d3 { transition-delay: 0.3s; }
    .reveal-d4 { transition-delay: 0.4s; }
    .reveal-d5 { transition-delay: 0.5s; }
  `;
  document.head.appendChild(style);
})();
