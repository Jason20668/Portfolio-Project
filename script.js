$(function () {

  const TOTAL_SPREADS = 8;
  const TOTAL_PAGES   = TOTAL_SPREADS * 2; // 16 pages

  // ── Size calculation ─────────────────────────────────────────
  function bookSize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight - 58 - 40; // subtract nav bar + top padding
    const maxW = Math.min(vw * 0.92, 1200);
    const maxH = Math.min(vh * 0.92, 700);
    // Book is double-page so width:height ~ 2:1.45
    let w = maxW;
    let h = w / 2 * 1.45;
    if (h > maxH) {
      h = maxH;
      w = h / 1.45 * 2;
    }
    return { w: Math.floor(w), h: Math.floor(h) };
  }

  // ── Initialise turn.js ───────────────────────────────────────
  const size = bookSize();

  $('#book').turn({
    width:    size.w,
    height:   size.h,
    autoCenter: true,
    gradients: true,
    acceleration: true,
    duration: 700,
    display: 'double',
    when: {
      turned: function (e, page) {
        updateUI();
      }
    }
  });

  // ── Build dots ───────────────────────────────────────────────
  for (let i = 1; i <= TOTAL_SPREADS; i++) {
    const dot = $('<div class="dot"></div>');
    dot.on('click', () => {
      // page number = (spread-1)*2 + 1 (left page of that spread)
      const targetPage = (i - 1) * 2 + 1;
      $('#book').turn('page', targetPage);
    });
    $('#dots').append(dot);
  }

  // ── TOC links ────────────────────────────────────────────────
  $(document).on('click', '.toc-list li', function () {
    const targetPage = parseInt($(this).attr('data-target'));
    if (targetPage) $('#book').turn('page', targetPage);
  });

  // ── Open book ────────────────────────────────────────────────
  $('#book-cover-btn').on('click', function () {
    $('#cover-screen').addClass('hidden');
    $('#book-viewer').removeClass('hidden');
    updateUI();
  });

  // ── Close / X button ─────────────────────────────────────────
  $('#close-btn').on('click', function () {
    $('#book-viewer').addClass('hidden');
    $('#cover-screen').removeClass('hidden');
    // Return to page 1 so it's fresh when reopened
    $('#book').turn('page', 1);
  });

  // ── Nav buttons ──────────────────────────────────────────────
  $('#next-btn').on('click', function () {
    $('#book').turn('next');
  });

  $('#prev-btn').on('click', function () {
    $('#book').turn('previous');
  });

  // ── Keyboard ─────────────────────────────────────────────────
  $(document).on('keydown', function (e) {
    if ($('#book-viewer').hasClass('hidden')) return;
    if (e.key === 'ArrowRight') $('#book').turn('next');
    if (e.key === 'ArrowLeft')  $('#book').turn('previous');
  });

  // ── Resize ───────────────────────────────────────────────────
  $(window).on('resize', function () {
    const s = bookSize();
    $('#book').turn('size', s.w, s.h);
  });

  // ── UI update ────────────────────────────────────────────────
  function currentSpread() {
    const page = $('#book').turn('page');
    return Math.ceil(page / 2);
  }

  function updateUI() {
    const spread = currentSpread();
    const page   = $('#book').turn('page');

    $('#spread-label').text(`Spread ${spread} of ${TOTAL_SPREADS}`);
    $('#prev-btn').prop('disabled', page <= 1);
    $('#next-btn').prop('disabled', page >= TOTAL_PAGES - 1);

    $('#dots .dot').each(function (i) {
      $(this).toggleClass('active', i + 1 === spread);
    });
  }

  updateUI();
});