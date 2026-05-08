/**
 * HOME PAGE SCRIPT  (home.js)
 * Workshops grid, Products grid, Testimonials carousel, Gallery, Counters
 */
(function ($) {
  'use strict';

  /* ─── DATA ─── */
  const workshops = [
    {
      img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
      badge: 'Bestseller',
      title: 'Sauerkraut Fundamentals',
      desc: 'Master the #1 gateway ferment. Brine ratios, crocking, troubleshooting & your first perfect batch.',
      rating: 5, reviews: 842, price: 49, oldPrice: 79,
      duration: '4 hrs', level: 'Beginner', tag: 'beginner'
    },
    {
      img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80',
      badge: 'New',
      title: 'Kimchi Masterclass',
      desc: 'Authentic Korean technique — from napa to radish kimchi, jeotgal and gochujang secrets.',
      rating: 5, reviews: 612, price: 69, oldPrice: null,
      duration: '6 hrs', level: 'Intermediate', tag: 'kimchi'
    },
    {
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
      badge: 'Popular',
      title: 'Kombucha Brewing',
      desc: 'SCOBY cultivation, first & second ferment, flavoring, carbonation and bottling for retail quality.',
      rating: 4, reviews: 519, price: 79, oldPrice: 99,
      duration: '8 hrs', level: 'Intermediate', tag: 'kombucha'
    },
    {
      img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80',
      badge: 'Advanced',
      title: 'Wild Fermentation & Koji',
      desc: 'Harness wild yeasts, koji mold for miso, sake & umami-bomb condiments. Deep dive into umami science.',
      rating: 5, reviews: 287, price: 119, oldPrice: null,
      duration: '12 hrs', level: 'Advanced', tag: 'koji'
    },
    {
      img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
      badge: 'Live',
      title: 'Gut Health & Ferments',
      desc: 'The science of probiotics, microbiome nutrition, and how fermented foods transform your health.',
      rating: 5, reviews: 394, price: 59, oldPrice: 79,
      duration: '5 hrs', level: 'All Levels', tag: 'health'
    },
    {
      img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80',
      badge: 'Bundle',
      title: 'The Complete Pickle Lab',
      desc: 'Lacto-fermented pickles, half-sours, dilly beans, pickled eggs and international brine traditions.',
      rating: 4, reviews: 458, price: 89, oldPrice: 120,
      duration: '10 hrs', level: 'Beginner+', tag: 'pickles'
    },
    {
      img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
      badge: 'Live',
      title: 'Live Sauerkraut Sunday',
      desc: 'Weekly live session — make kraut together, ask questions, and share your batch results.',
      rating: 5, reviews: 198, price: 29, oldPrice: null,
      duration: '2 hrs', level: 'All Levels', tag: 'live'
    },
    {
      img: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=600&q=80',
      badge: 'Beginner',
      title: 'Fermentation 101',
      desc: 'The ultimate introduction — what fermentation is, why it matters, and how to start safely at home.',
      rating: 5, reviews: 1204, price: 0, oldPrice: null,
      duration: '3 hrs', level: 'Beginner', tag: 'beginner'
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6-F7GV_5VQ5sgXTQ-j055qPvzIbsv7-CQw&s',
      badge: 'Advanced',
      title: 'Miso & Amazake',
      desc: 'Traditional Japanese koji ferments. Make shiro miso, hatcho miso, and sweet amazake from scratch.',
      rating: 5, reviews: 165, price: 99, oldPrice: 130,
      duration: '10 hrs', level: 'Advanced', tag: 'koji'
    }
  ];

  const products = [
    {
      img: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80',
      badge: 'Top Pick',
      title: 'Weck Fermenting Jar Set',
      desc: 'Authentic German glass crocks with clamp lids. Perfect air-lock seal for anaerobic ferments.',
      price: 45, rating: 5
    },
    {
      img: 'https://images.unsplash.com/photo-1558642891-54be180ea339?w=600&q=80',
      badge: 'Organic',
      title: 'Himalayan Pink Salt — 2kg',
      desc: 'Food-grade, mineral-rich salt for brine ferments. No additives, no iodine — pure and clean.',
      price: 18, rating: 5
    },
    {
      img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80',
      badge: 'Handmade',
      title: 'Oak Wood Kraut Pounder',
      desc: 'Traditional solid oak tamper for packing cabbage tightly into crocks. Ergonomic and durable.',
      price: 24, rating: 5
    },
    {
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
      badge: 'Bestseller',
      title: 'Organic SCOBY Starter Kit',
      desc: 'Live Kombucha culture with starter tea. Everything you need to begin your first gallon.',
      price: 32, rating: 4
    },
    {
      img: 'https://countrytradingco.com.au/cdn/shop/products/ferementing-glass-weights_600x.jpg?v=1655161657',
      badge: 'Essential',
      title: 'Glass Fermentation Weights',
      desc: 'Keep your vegetables safely submerged under the brine. Fits all wide-mouth jars perfectly.',
      price: 14, rating: 5
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyiqLyDR2sDRLtNckrlXs6X0SXJCPoVzb4sQ&s',
      badge: 'Professional',
      title: 'Stainless Steel Kraut Slicer',
      desc: 'Ultra-sharp triple blade for the perfect fine-shred cabbage. Built for speed and lifetime durability.',
      price: 58, rating: 5
    }
  ];

  const testimonials = [
    {
      quote: "KrautCraft completely transformed the way I eat. I went from nervous about fermentation to running weekly workshops in my community — in just 3 months!",
      name: 'Sarah M.', role: 'Home Fermenter → Workshop Host',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80'
    },
    {
      quote: "The kimchi masterclass is pure gold. Marcus's teaching style makes complex technique feel completely natural. My kimchi is now better than the Korean restaurant down the street.",
      name: 'James T.', role: 'Pro Fermenter Member',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80'
    },
    {
      quote: "I discovered I had a sauerkraut intolerance — turns out I was just making it wrong! KrautCraft's troubleshooting section saved my gut health journey entirely.",
      name: 'Priya R.', role: 'Nutritionist & Studio Master',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80'
    },
    {
      quote: "Best investment I've made in my culinary education. The community alone is worth every penny — I've made real friends through fermenting together online.",
      name: 'David K.', role: 'Gut Health Coach',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80'
    }
  ];

  const galleryItems = [
    { img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80', label: 'Kimchi in Process' },
    { img: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=500&q=80', label: 'Fresh Kraut' },
    { img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=500&q=80', label: 'Kombucha SCOBY' },
    { img: 'https://images.unsplash.com/photo-1584285405429-136bf988919c?w=500&q=80', label: 'Ferment Lab' },
    { img: 'https://rukminim2.flixcart.com/image/480/640/xif0q/container/p/u/9/ceramic-jars-1000ml-brown-kutting-jar-hc-the-crafts-original-imagxjv7dvfsxcye.jpeg?q=90', label: 'Pickle Jars' },
    { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80', label: 'Live Workshop' },
    { img: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500&q=80', label: 'Miso Ceremony' },
    { img: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&q=80', label: 'Studio Harvest' }
  ];

  /* ─── Render stars ─── */
  function stars(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  /* ─── Render Workshops ─── */
  function renderWorkshops() {
    const $grid = $('#workshops-grid');
    if (!$grid.length) return;

    $grid.html(workshops.map(w => `
      <article class="card" data-reveal>
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
            <span>⏱ ${w.duration}</span>
            <span>📊 ${w.level}</span>
          </div>

          <div class="price">
            ${w.price === 0 ? '<span style="color:var(--clr-success);font-weight:700;font-size:0.9em;">FREE</span>' : `<span class="price-currency">$</span>${w.price}${w.oldPrice ? `<span class="price-old">$${w.oldPrice}</span>` : ''}`}
          </div>
          <a href="workshops.html" class="btn btn-primary btn-sm mt-auto">Enroll Now</a>
        </div>
      </article>
    `).join(''));
  }

  /* ─── Render Products ─── */
  function renderProducts() {
    const $grid = $('#products-grid');
    if (!$grid.length) return;

    $grid.html(products.map(p => `
      <article class="card" data-reveal>
        <div class="card-img-wrap">
          <img src="${p.img}" alt="${p.title}" loading="lazy">
          <span class="card-badge">${p.badge}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-text">${p.desc}</p>
          <div class="card-rating-wrap">
            <span class="stars">${stars(p.rating)}</span>
          </div>
          <div class="price"><span class="price-currency">$</span>${p.price}</div>
          <button class="btn btn-secondary btn-sm mt-auto" onclick="window.showToast('success','Added!','${p.title} added to your cart. 🛒')">Add to Cart</button>
        </div>
      </article>
    `).join(''));
  }

  /* ─── Testimonials Carousel ─── */
  let currentSlide = 0;
  let carouselTimer;

  function renderTestimonials() {
    const $carousel = $('#testimonial-carousel');
    const $dots = $('#carousel-dots');
    if (!$carousel.length) return;

    $carousel.html(testimonials.map((t, i) => `
      <div class="testimonial-slide ${i === 0 ? 'active' : ''}" role="tabpanel" aria-label="Testimonial ${i + 1}">
        <blockquote class="testimonial-quote">${t.quote}</blockquote>
        <div class="testimonial-author">
          <img src="${t.img}" alt="${t.name}" loading="lazy">
          <div>
            <span class="testimonial-name">${t.name}</span>
            <span class="testimonial-role">${t.role}</span>
          </div>
        </div>
      </div>
    `).join(''));

    $dots.html(testimonials.map((_, i) => `
      <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" role="tab" aria-label="Slide ${i + 1}" aria-selected="${i === 0}"></button>
    `).join(''));

    startCarousel();
  }

  function goToSlide(n) {
    currentSlide = (n + testimonials.length) % testimonials.length;
    $('.testimonial-slide').removeClass('active');
    $('.carousel-dot').removeClass('active').attr('aria-selected', false);
    $(`.testimonial-slide:eq(${currentSlide})`).addClass('active');
    $(`.carousel-dot:eq(${currentSlide})`).addClass('active').attr('aria-selected', true);
  }

  function startCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  $(document).on('click', '.carousel-dot', function () {
    goToSlide(parseInt($(this).data('slide')));
    startCarousel();
  });

  /* ─── Gallery ─── */
  function renderGallery() {
    const $grid = $('#gallery-grid');
    if (!$grid.length) return;

    $grid.html(galleryItems.map(g => `
      <div class="gallery-item" data-reveal>
        <img src="${g.img}" alt="${g.label}" loading="lazy">
        <div class="gallery-overlay"><span>${g.label}</span></div>
      </div>
    `).join(''));
  }

  /* ─── Counter Animation (triggered when visible) ─── */
  function initCounters() {
    const $counters = $('[data-count]');
    if (!$counters.length) return;

    if (!('IntersectionObserver' in window)) {
      $counters.each(function () {
        $(this).text(parseInt($(this).data('count')).toLocaleString());
      });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const $el = $(e.target);
          const target = parseInt($el.data('count'));
          const suffix = $el.data('suffix') || '';
          animateCounter($el, target, 2000, suffix);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    $counters.each(function () { io.observe(this); });
  }

  /* ─── INIT ─── */
  $(document).ready(function () {
    renderWorkshops();
    renderProducts();
    renderTestimonials();
    renderGallery();
    initCounters();
  });

}(jQuery));
