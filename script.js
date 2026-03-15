/* ===== CUSTOM CURSOR (desktop only) ===== */
const isMobile = () => window.innerWidth <= 768;
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = -200, my = -200, rx = -200, ry = -200;

if (!isMobile()) {
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    if (ring)   { ring.style.left   = rx + 'px'; ring.style.top  = ry + 'px'; }
    requestAnimationFrame(animCursor);
  })();
  document.addEventListener('mousedown', () => {
    cursor?.classList.add('click');
    ring?.classList.add('hover');
  });
  document.addEventListener('mouseup', () => {
    cursor?.classList.remove('click');
    ring?.classList.remove('hover');
  });
  document.querySelectorAll('a,button,.svc-card,.rev-card,.vid-card,.cmp-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
  });
}

/* ===== LOADER — SVG stroke-draw, always runs full 5s ===== */
(function initLoader() {
  const textEl = document.getElementById('ld-text');
  const pctEl  = document.getElementById('ld-pct');
  const barEl  = document.getElementById('ld-bar');
  const loader = document.getElementById('loader');
  if (!textEl) return;

  const DURATION = 5000; // always 5 seconds, no shortcuts

  let totalLen = 0;

  function measureAndInit() {
    totalLen = textEl.getComputedTextLength() * 3.2;
    textEl.style.strokeDasharray  = totalLen;
    textEl.style.strokeDashoffset = totalLen;
  }

  function setProgress(p) {
    p = Math.min(p, 100);
    if (pctEl) pctEl.textContent = Math.floor(p) + ' %';
    if (barEl) barEl.style.width = p + '%';
    if (totalLen > 0) {
      textEl.style.strokeDashoffset = totalLen * (1 - p / 100);
    }
    if (p >= 100) {
      // fill text solid, then dismiss
      textEl.style.transition  = 'fill .5s ease';
      textEl.style.fill        = 'var(--light)';
      textEl.style.strokeWidth = '.4';
      setTimeout(() => loader?.classList.add('done'), 900);
    }
  }

  let startTs = null;
  function ramp(ts) {
    if (!startTs) startTs = ts;
    const t      = Math.min((ts - startTs) / DURATION, 1);
    const eased  = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    setProgress(eased * 100);
    if (t < 1) requestAnimationFrame(ramp);
  }

  // start after fonts are ready
  const kick = () => { measureAndInit(); requestAnimationFrame(ramp); };
  document.fonts && document.fonts.ready
    ? document.fonts.ready.then(kick)
    : setTimeout(kick, 100);
})();

/* ===== NAVBAR ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
  highlightNav();
});

/* ===== MOBILE MENU ===== */
const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
burger?.addEventListener('click', () => mobMenu?.classList.toggle('open'));
document.querySelectorAll('#mob-menu a').forEach(a =>
  a.addEventListener('click', () => mobMenu?.classList.remove('open'))
);

/* ===== ACTIVE NAV ===== */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ===== BEFORE/AFTER COMPARE ===== */
function initCompare(id) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  const afterWrap = wrap.querySelector('.cmp-after-wrap');
  const handle    = wrap.querySelector('.cmp-handle');
  let dragging = false;

  function setPos(x) {
    const rect = wrap.getBoundingClientRect();
    const pct  = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
    afterWrap.style.width = pct + '%';
    handle.style.left     = pct + '%';
  }

  wrap.addEventListener('mousedown',  e => { dragging = true; setPos(e.clientX); });
  window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  window.addEventListener('mouseup',   () => { dragging = false; });
  wrap.addEventListener('touchstart',  e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend',  () => { dragging = false; });
}
initCompare('cmp1');
initCompare('cmp2');

/* ===== REVIEW TABS ===== */
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    // open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ===== STAT COUNTER ANIMATION ===== */
function animateCounter(el, target, suffix) {
  const duration = 1800;
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  function step(ts) {
    const t = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = eased * target;
    el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// store original values before any animation touches them
const statTargets = new Map();
document.querySelectorAll('.stat-item').forEach(el => {
  const b = el.querySelector('b');
  if (b) statTargets.set(el, b.textContent.trim());
});

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const b = el.querySelector('b');
    if (!b) return;
    const original = statTargets.get(el) || b.textContent.trim();
    if (original === '183+')      animateCounter(b, 183, '+');
    else if (original === '4.7★') animateCounter(b, 4.7, '★');
    else if (original === '100%') animateCounter(b, 100, '%');
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-item').forEach(el => counterObs.observe(el));
