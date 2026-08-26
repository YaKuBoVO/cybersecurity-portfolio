// ═══════════════════════════════════════════════════════
//   COSMOS — CYBERSECURITY PORTFOLIO  |  script.js
// ═══════════════════════════════════════════════════════

/* ── Telegram notifier ──
   NOTE: token is visible in client-side code. See WARNING in chat. */
const TELEGRAM = {
  token:  '8887536534:AAF376_pWrbrOartzCe-ks76AhXZjzclOhs',
  chatId: '1402989954',
};

/* YAKUBOV.CODES — Portfolio interactions */
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

if (cursor && cursorTrail) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      cursorTrail.style.left = e.clientX + 'px';
      cursorTrail.style.top = e.clientY + 'px';
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
}

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile navigation ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

/* ── Typewriter ── */
const roles = [
  'Cybersecurity Student',
  'SOC Analyst Aspirant',
  'Blue Team Learner',
  'CTF Player',
  'Security Enthusiast'
];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeWrite() {
  if (!tw) return;
  const current = roles[ri];
  if (!deleting) {
    tw.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeWrite, 1800);
      return;
    }
  } else {
    tw.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(typeWrite, deleting ? 40 : 80);
}
typeWrite();

/* ── Progress bars ── */
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = bar.style.getPropertyValue('--w');
  });
}

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.team-card, .project-card, .cert-card, .tl-item, .blog-card, .skill-tag, .about-text p').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── Progress bar observer ── */
const barsSection = document.querySelector('.proficiency-bars');
if (barsSection) {
  const barObserver = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) {
      animateBars();
      barObserver.disconnect();
    }
  }, { threshold: 0.3 });
  barObserver.observe(barsSection);
}

/* ── Active navigation ── */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAs.forEach(a => a.style.color = '');
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (active) active.style.color = 'var(--text)';
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => sectionObserver.observe(s));

/* ── Contact form ──
   No Telegram/API secret is stored in the browser. The form opens the user's
   email client. A backend can be added later if server-side delivery is needed.
*/
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value.trim() || 'Portfolio contact';
    const message = document.getElementById('message')?.value.trim() || '';

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:yakubov99it@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* ── Subtle hero parallax ── */
window.addEventListener('scroll', () => {
  const heroRight = document.querySelector('.hero-right');
  if (heroRight && window.scrollY < window.innerHeight) {
    heroRight.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  }
});

