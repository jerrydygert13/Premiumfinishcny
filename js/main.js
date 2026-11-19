/* ==============================================================
   main.js — shared page interactions (loaded on every page)
   Nav, mobile menu, scroll reveal, Sedan/SUV price switch,
   before/after sliders. Each part only runs if its section
   exists on the current page.
   ============================================================== */

/* ----------------------------------------------------------
   0. NAV, MOBILE MENU, STICKY BAR, YEAR
---------------------------------------------------------- */
const nav = document.getElementById('topNav');
const mobileBar = document.getElementById('mobileBar');
const bookingEl = document.getElementById('booking');   // only on book.html

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);
  let hide = false;
  if (bookingEl) {
    const b = bookingEl.getBoundingClientRect();
    hide = b.top < window.innerHeight * 0.6 && b.bottom > 0;
  }
  mobileBar.classList.toggle('show', y > window.innerHeight * 0.4 && !hide);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
}));

const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ----------------------------------------------------------
   1. SCROLL REVEAL
---------------------------------------------------------- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r').forEach(el => revealObs.observe(el));

/* ----------------------------------------------------------
   2. VEHICLE SIZE TOGGLE (services.html)
   Swaps the prices and points each "Book" button at the
   booking page with that package + vehicle size preselected.
---------------------------------------------------------- */
const vehToggle = document.getElementById('vehToggle');
if (vehToggle) {
  let vehicle = 'sedan';
  const vehButtons = vehToggle.querySelectorAll('button');
  const vehPill = document.getElementById('vehPill');
  const placePill = () => {
    const active = vehToggle.querySelector('button[aria-pressed="true"]');
    vehPill.style.width = active.offsetWidth + 'px';
    vehPill.style.transform = `translateX(${active.offsetLeft - 5}px)`;
  };
  const updateBookLinks = () => {
    document.querySelectorAll('a[data-book]').forEach(a => {
      a.href = `book.html?pkg=${a.dataset.book}&veh=${vehicle}`;
    });
  };
  vehButtons.forEach(btn => btn.addEventListener('click', () => {
    vehicle = btn.dataset.veh;
    vehButtons.forEach(b => b.setAttribute('aria-pressed', b === btn));
    placePill();
    document.querySelectorAll('.amt-num').forEach(n => {
      n.classList.add('swap');
      setTimeout(() => { n.textContent = n.dataset[vehicle]; n.classList.remove('swap'); }, 180);
    });
    document.querySelectorAll('.amt-label').forEach(l => { l.textContent = l.dataset[vehicle]; });
    updateBookLinks();
  }));
  window.addEventListener('resize', placePill);
  if (document.fonts) document.fonts.ready.then(placePill);
  placePill();
  updateBookLinks();
}

/* ----------------------------------------------------------
   3. BEFORE / AFTER COMPARE SLIDERS (gallery.html)
---------------------------------------------------------- */
document.querySelectorAll('.compare').forEach(c => {
  const range = c.querySelector('input[type=range]');
  const set = v => c.style.setProperty('--pos', v + '%');
  range.addEventListener('input', () => set(range.value));
  range.addEventListener('pointerdown', () => c.classList.add('dragging'));
  window.addEventListener('pointerup', () => c.classList.remove('dragging'));
  c.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
    c.classList.add('empty'); c.innerHTML = '📷 Photo coming soon';
  }));
});
