/**
 * DASHBOARD SCRIPT (dashboard.js)
 * Handles tab switching, sidebar toggle, and interactive elements for User/Admin portals
 */
(function ($) {
  'use strict';

  function initDashboard() {
    
    // Sidebar Toggle for Mobile
    $(document).on('click', '#sidebar-toggle', function() {
      $('#dash-sidebar').toggleClass('open');
    });

    // Close sidebar on outside click (mobile)
    $(document).on('click', function(e) {
      if ($(window).width() <= 1024) {
        if (!$(e.target).closest('#dash-sidebar, #sidebar-toggle').length) {
          $('#dash-sidebar').removeClass('open');
        }
      }
    });

    // Tab Switching Logic
    $(document).on('click', '.sidebar-link', function(e) {
      const tab = $(this).data('tab');
      if (!tab) return; // Ignore links without data-tab (like logout)

      e.preventDefault();

      // Update active state in sidebar
      $('.sidebar-link').removeClass('active');
      $(this).addClass('active');

      // Update panel visibility
      $('.dash-panel').removeClass('active');
      $('#panel-' + tab).addClass('active');

      // Update topbar title (disabled to prevent header/panel title repetition)
      // const label = $(this).text().trim();
      // $('.dash-topbar-title').text(label);

      // Close sidebar on mobile after selection
      if ($(window).width() <= 1024) {
        $('#dash-sidebar').removeClass('open');
      }

      window.showToast('info', 'Panel Switched', 'Viewing ' + label);
    });

    // Interaction feedback for chart bars (mock)
    $(document).on('click', '.bar', function() {
      const h = $(this).css('height');
      window.showToast('info', 'Data Point', 'Value: ' + Math.round(parseInt(h) / 2) + '%');
    });

  }

  $(document).ready(initDashboard);

}(jQuery));
