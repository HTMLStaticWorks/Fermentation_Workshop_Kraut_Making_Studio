/**
 * SHOP PAGE SCRIPT (shop.js)
 * Handles product rendering, filtering, sorting, and cart interactions
 */
(function ($) {
  'use strict';

  const products = [
    { id: 1, category: 'crocks', title: 'Stone Creek Ceramic Crock (5L)', price: 125, rating: 5, img: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80', badge: 'Artisan Made', desc: 'Handcrafted stoneware with a deep water seal for perfect anaerobic fermentation.' },
    { id: 2, category: 'crocks', title: 'Modern Minimalist Crock (2L)', price: 65, rating: 4, img: 'https://images.unsplash.com/photo-1558642891-54be180ea339?w=600&q=80', badge: 'Top Seller', desc: 'Sleek design that looks beautiful on any countertop. Perfect for small batches.' },
    { id: 3, category: 'jars', title: 'Wide-Mouth Mason Set (4pk)', price: 32, rating: 5, img: 'https://m.media-amazon.com/images/I/81bss7F32uL._AC_UF1000,1000_QL80_.jpg', badge: 'Essential', desc: 'The classic fermenting vessel. 32oz heavy-duty glass with stainless steel bands.' },
    { id: 4, category: 'jars', title: 'Glass Fermentation Weights', price: 18, rating: 5, img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80', badge: 'Must Have', desc: 'Keep your veggies submerged below the brine to prevent mold. Lead-free glass.' },
    { id: 5, category: 'cultures', title: 'Heirloom Milk Kefir Grains', price: 24, rating: 5, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80', badge: 'Organic', desc: 'Live, active grains that will last a lifetime if cared for. High probiotic count.' },
    { id: 6, category: 'cultures', title: 'Kombucha SCOBY & Starter', price: 22, rating: 4, img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&q=80', badge: 'Strong Starter', desc: 'A healthy, thick SCOBY plus 1 cup of strong starter tea for a successful first batch.' },
    { id: 7, category: 'tools', title: 'Hardwood Kraut Tamper', price: 28, rating: 5, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', badge: 'Handmade', desc: 'Ergonomic tool for pounding cabbage and packing jars tightly. Solid beechwood.' },
    { id: 8, category: 'pantry', title: 'Himalayan Pink Salt (1kg)', price: 14, rating: 5, img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80', badge: 'Pure', desc: 'Mineral-rich salt without iodine or anticaking agents. The best salt for brine.' },
    { id: 9, category: 'pantry', title: 'Artisan Gochugaru (250g)', price: 19, rating: 5, img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80', badge: 'Korean Grown', desc: 'Sun-dried red pepper flakes with the perfect balance of heat and smokiness for kimchi.' },
  ];

  function renderStars(n) {
    return '<span class="stars">' + '★'.repeat(n) + '☆'.repeat(5 - n) + '</span>';
  }

  function renderProducts(data) {
    const $grid = $('#product-grid');
    const $count = $('#product-count');
    const $none = $('#no-products');

    $grid.empty();
    $count.text(data.length);

    if (data.length === 0) {
      $none.removeClass('d-none');
    } else {
      $none.addClass('d-none');
      data.forEach(p => {
        $grid.append(`
          <article class="card" data-reveal>
            <div class="card-img-wrap">
              <img src="${p.img}" alt="${p.title}" loading="lazy">
              <span class="card-badge">${p.badge}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">${p.title}</h3>
              <p class="card-text">${p.desc}</p>
              <div class="card-rating-wrap">${renderStars(p.rating)}</div>
              <div class="price"><span class="price-currency">$</span>${p.price}</div>
              <button class="btn btn-secondary btn-sm mt-auto addToCart" data-title="${p.title}">Add to Cart</button>
            </div>
          </article>
        `);
      });
    }
  }

  function filterProducts() {
    let filtered = products;

    // Category Filter
    const activeCats = [];
    $('#category-filters input:checked').each(function () {
      activeCats.push($(this).data('filter'));
    });

    if (activeCats.length > 0 && !activeCats.includes('all')) {
      filtered = filtered.filter(p => activeCats.includes(p.category));
    }

    // Price Filter
    const maxPrice = parseInt($('#price-slider').val());
    filtered = filtered.filter(p => p.price <= maxPrice);

    // Rating Filter
    const minRating = parseInt($('input[name="rating"]:checked').val());
    filtered = filtered.filter(p => p.rating >= minRating);

    // Sorting
    const sortBy = $('#sort-select').val();
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
  }

  $(document).ready(function () {
    renderProducts(products);

    // Event Listeners
    $('#category-filters input').on('change', function () {
      if ($(this).data('filter') === 'all' && $(this).is(':checked')) {
        $('#category-filters input').not('[data-filter="all"]').prop('checked', false);
      } else if ($(this).is(':checked')) {
        $('#category-filters input[data-filter="all"]').prop('checked', false);
      }
      filterProducts();
    });

    $('#price-slider').on('input', function () {
      $('#price-value').text('$' + $(this).val());
      filterProducts();
    });

    $('input[name="rating"]').on('change', filterProducts);
    $('#sort-select').on('change', filterProducts);

    $('#reset-filters').on('click', function () {
      $('#category-filters input[data-filter="all"]').prop('checked', true);
      $('#category-filters input').not('[data-filter="all"]').prop('checked', false);
      $('#price-slider').val(200);
      $('#price-value').text('$200');
      $('input[name="rating"][value="4"]').prop('checked', true);
      $('#sort-select').val('featured');
      filterProducts();
    });

    $(document).on('click', '.addToCart', function () {
      const title = $(this).data('title');
      window.showToast('success', 'Added to Cart', title + ' has been added to your shopping bag!');

      // Update global cart dot if it exists
      $('#cart-dot').show();
    });
  });

}(jQuery));
