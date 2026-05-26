// ═══════════════════════════════════════════════════════
//   COSMOS — CYBERSECURITY PORTFOLIO  |  script.js
// ═══════════════════════════════════════════════════════

/* ── Custom Cursor ── */
const cursor      = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top  = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background = 'var(--purple)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--blue)';
  });
});

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── Typewriter ── */
const roles = [
  'Cybersecurity Professional',
  'Penetration Tester',
  'Blue Team Analyst',
  'Purple Team Operator',
  'Security Researcher',
  'CTF Player',
];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeWrite() {
  const current = roles[ri];
  if (!deleting) {
    tw.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(typeWrite, 2000); return; }
  } else {
    tw.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeWrite, deleting ? 40 : 80);
}
typeWrite();

/* ── Counter animation ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + (progress < 1 ? '' : '+');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(step);
}

/* ── Progress bars ── */
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = bar.style.getPropertyValue('--w');
  });
}

/* ── Intersection Observer — scroll reveal + counters + bars ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateBars();
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Add reveal class to elements
document.querySelectorAll('.team-card, .project-card, .cert-card, .tl-item, .blog-card, .skill-tag, .about-text p').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Observe hero stats for counter
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// Observe proficiency bars
const barsSection = document.querySelector('.proficiency-bars');
if (barsSection) barObserver.observe(barsSection);

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--text)';
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Contact form ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'linear-gradient(135deg,#00ff88,#00c8ff)';
    btn.style.color = '#000';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ── Subtle parallax on hero ── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroRight = document.querySelector('.hero-right');
  if (heroRight && scrolled < window.innerHeight) {
    heroRight.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});

/* ── Skill tag ripple on click ── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    this.style.transform = 'scale(0.94)';
    setTimeout(() => this.style.transform = '', 120);
  });
});
