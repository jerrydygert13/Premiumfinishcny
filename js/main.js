/* ==============================================================
   main.js — page interactions
   Nav, mobile menu, scroll reveal, price toggle, before/after sliders.
   ============================================================== */

/* ----------------------------------------------------------
   0. UI POLISH — nav, mobile menu, sticky bar, year
---------------------------------------------------------- */
const nav = document.getElementById('topNav');
const mobileBar = document.getElementById('mobileBar');
const bookingEl = document.getElementById('booking');
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);
  const b = bookingEl.getBoundingClientRect();
  const inBooking = b.top < window.innerHeight * 0.6 && b.bottom > 0;
  mobileBar.classList.toggle('show', y > window.innerHeight * 0.6 && !inBooking);
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

document.getElementById('yr').textContent = new Date().getFullYear();

/* ----------------------------------------------------------
   1. SCROLL REVEAL
---------------------------------------------------------- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r').forEach(el => revealObs.observe(el));

/* ----------------------------------------------------------
   2. VEHICLE SIZE TOGGLE (pricing cards)
---------------------------------------------------------- */
let vehicle = 'sedan';
const vehButtons = document.querySelectorAll('#vehToggle button');
const vehPill = document.getElementById('vehPill');
function placePill() {
  const active = document.querySelector('#vehToggle button[aria-pressed="true"]');
  vehPill.style.width = active.offsetWidth + 'px';
  vehPill.style.transform = `translateX(${active.offsetLeft - 5}px)`;
}
vehButtons.forEach(btn => btn.addEventListener('click', () => {
  vehicle = btn.dataset.veh;
  vehButtons.forEach(b => b.setAttribute('aria-pressed', b === btn));
  placePill();
  document.querySelectorAll('.amt-num').forEach(n => {
    n.classList.add('swap');
    setTimeout(() => { n.textContent = n.dataset[vehicle]; n.classList.remove('swap'); }, 180);
  });
  document.querySelectorAll('.amt-label').forEach(l => { l.textContent = l.dataset[vehicle]; });
}));
window.addEventListener('resize', placePill);
document.fonts && document.fonts.ready.then(placePill);
placePill();

/* "Book" buttons on cards → preselect that service in the form */
document.querySelectorAll('[data-book]').forEach(btn => btn.addEventListener('click', e => {
  e.stopPropagation();
  const opt = document.querySelector(`.svc-option[data-key="${btn.dataset.book}-${vehicle}"]`);
  if (opt) opt.click();
  bookingEl.scrollIntoView({ behavior: 'smooth' });
}));

/* ----------------------------------------------------------
   3. BEFORE / AFTER COMPARE SLIDERS
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
