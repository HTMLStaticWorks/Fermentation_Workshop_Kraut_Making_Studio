/**
 * WORKSHOPS PAGE SCRIPT  (workshops.js)
 * Filter, FAQ accordion, workshop cards
 */
(function ($) {
  'use strict';

  const allWorkshops = [
    { img:'images/Sauerkraut Fundamentals.jfif.jpeg', badge:'Bestseller', title:'Sauerkraut Fundamentals', desc:'Master the #1 gateway ferment. Brine ratios, crocking, troubleshooting & your first perfect batch.', rating:5, reviews:842, price:49, oldPrice:79, duration:'4 hrs', level:'Beginner', tag:'kraut' },
    { img:'images/Kimchi Masterclass.jfif.jpeg', badge:'New', title:'Kimchi Masterclass', desc:'Authentic Korean technique — from napa to radish kimchi, jeotgal and gochujang secrets.', rating:5, reviews:612, price:69, oldPrice:null, duration:'6 hrs', level:'Intermediate', tag:'kimchi' },
    { img:'images/Kombucha Brewing.jfif.jpeg', badge:'Popular', title:'Kombucha Brewing', desc:'SCOBY cultivation, first & second ferment, flavoring, carbonation and bottling for retail quality.', rating:4, reviews:519, price:79, oldPrice:99, duration:'8 hrs', level:'Intermediate', tag:'kombucha' },
    { img:'images/Wild Fermentation & Koji.jfif.jpeg', badge:'Advanced', title:'Wild Fermentation & Koji', desc:'Harness wild yeasts, koji mold for miso, sake & umami-bomb condiments. Deep dive into umami science.', rating:5, reviews:287, price:119, oldPrice:null, duration:'12 hrs', level:'Advanced', tag:'advanced' },
    { img:'images/Gut Health & Ferments.jfif..jpeg', badge:'Live', title:'Gut Health & Ferments', desc:'The science of probiotics, microbiome nutrition, and how fermented foods transform your health.', rating:5, reviews:394, price:59, oldPrice:79, duration:'5 hrs', level:'All Levels', tag:'health' },
    { img:'images/The Complete Pickle Lab.jfif.jpeg', badge:'Bundle', title:'The Complete Pickle Lab', desc:'Lacto-fermented pickles, half-sours, dilly beans, pickled eggs and international brine traditions.', rating:4, reviews:458, price:89, oldPrice:120, duration:'10 hrs', level:'Beginner+', tag:'pickles' },
    { img:'images/Live Sauerkraut Sunday.jfif.jpeg', badge:'Live', title:'Live Sauerkraut Sunday', desc:'Weekly live session — make kraut together, ask questions, and share your batch results.', rating:5, reviews:198, price:29, oldPrice:null, duration:'2 hrs', level:'All Levels', tag:'live' },
    { img:'images/Fermentation 101.jfif.jpeg', badge:'Beginner', title:'Fermentation 101', desc:'The ultimate introduction — what fermentation is, why it matters, and how to start safely at home.', rating:5, reviews:1204, price:0, oldPrice:null, duration:'3 hrs', level:'Beginner', tag:'beginner' },
    { img:'images/Miso & Amazake.jfif.jpeg', badge:'Advanced', title:'Miso & Amazake', desc:'Traditional Japanese koji ferments. Make shiro miso, hatcho miso, and sweet amazake from scratch.', rating:5, reviews:165, price:99, oldPrice:130, duration:'10 hrs', level:'Advanced', tag:'advanced' },
  ];

  function stars(n) {
    return '★'.repeat(n) + '☆'.repeat(5-n);
  }

  function renderCards(data) {
    const $grid = $('#workshop-grid');
    const $none = $('#no-results');
    if (!data.length) {
      $grid.html('');
      $none.removeClass('d-none');
      return;
    }
    $none.addClass('d-none');
    $grid.html(data.map(w => `
      <article class="card" data-tag="${w.tag}" data-reveal>
        <div class="card-img-wrap">
          <img src="${w.img}" alt="${w.title}" loading="lazy">
          <span class="card-badge">${w.badge}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${w.title}</h3>
          <p class="card-text">${w.desc}</p>

          <div class="card-rating-wrap">
            <span class="stars">${stars(w.rating)}</span>
            <span>(${w.reviews} reviews)</span>
          </div>

          <div class="card-meta">
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-top; margin-right: 4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${w.duration}</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-top; margin-right: 4px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>${w.level}</span>
          </div>

          <div class="price">
            ${w.price === 0 ? '<span style="color:var(--clr-success);font-weight:700;font-size:0.9em;">FREE</span>' : `<span class="price-currency">$</span>${w.price}${w.oldPrice ? `<span class="price-old">$${w.oldPrice}</span>` : ''}`}
          </div>
          <a href="register.html" class="btn btn-primary btn-sm mt-auto">Enroll Now</a>
        </div>
      </article>
    `).join(''));
  }

  function applyFilter(filter) {
    $('.filter-btn').removeClass('active');
    $(`.filter-btn[data-filter="${filter}"]`).addClass('active');
    const filtered = filter === 'all' ? allWorkshops : allWorkshops.filter(w => w.tag === filter);
    renderCards(filtered);
    // Smooth scroll to grid
    if (filter !== 'all') {
      const target = document.getElementById('workshops');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Filter click
  $(document).on('click', '.filter-btn', function () {
    const filter = $(this).data('filter');
    applyFilter(filter);
    // Update hash without jumping
    history.pushState(null, null, filter === 'all' ? 'workshops.html' : `#${filter}`);
  });

  // FAQ accordion
  $(document).on('click keypress', '.faq-question', function (e) {
    if (e.type === 'keypress' && e.which !== 13) return;
    const $item = $(this).closest('.faq-item');
    const isOpen = $item.hasClass('open');
    $('.faq-item').removeClass('open').find('.faq-question').attr('aria-expanded', false);
    if (!isOpen) {
      $item.addClass('open').find('.faq-question').attr('aria-expanded', true);
    }
  });

  // Check hash on load
  function checkHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && $('.filter-btn[data-filter="' + hash + '"]').length) {
      applyFilter(hash);
    } else {
      renderCards(allWorkshops);
    }
    // Force close mobile nav drawer on hash change/filter selection
    $('#hamburger').removeClass('open').attr('aria-expanded', false);
    $('#mobile-nav').removeClass('open');
  }

  $(document).ready(function () {
    checkHash();
  });

  // Also check hash change (if user clicks dropdown while on workshops.html)
  $(window).on('hashchange', checkHash);

}(jQuery));
