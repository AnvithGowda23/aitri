// script.js
// For menu toggle and other interactivity

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
});

// Hero background slider
window.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero-bg-slider .hero-bg');
  const dots = document.querySelectorAll('.hero-slider-dots .dot');
  const progressBar = document.querySelector('.hero-slider-progress-bar');
  let current = 0;
  let duration = 3500;
  function showSlide(idx) {
    if (!slides.length) return;
    slides.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
      if (dots[i]) dots[i].classList.toggle('active', i === idx);
    });
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      setTimeout(() => {
        progressBar.style.transition = `width ${duration - 200}ms linear`;
        progressBar.style.width = '100%';
      }, 50);
    }
  }
  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  if (slides.length) {
    let interval = setInterval(nextSlide, duration);
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        current = idx;
        showSlide(current);
        clearInterval(interval);
        interval = setInterval(nextSlide, duration);
      });
    });
    showSlide(current);
  }
});

// Scroll FAB behavior: keep down until bottom; then up
window.addEventListener('DOMContentLoaded', function() {
  const fab = document.getElementById('scroll-fab');
  if (!fab) return;

  function isBottom() {
    const scrollBottom = Math.ceil(window.scrollY + window.innerHeight);
    const docHeight = Math.ceil(document.documentElement.scrollHeight);
    return scrollBottom >= docHeight - 4; // tolerance
  }

  function updateFab() {
    if (isBottom()) {
      fab.classList.add('up');
      fab.setAttribute('title', 'Scroll Up');
    } else {
      fab.classList.remove('up');
      fab.setAttribute('title', 'Scroll Down');
    }
  }

  updateFab();
  window.addEventListener('scroll', updateFab, { passive: true });
  window.addEventListener('resize', updateFab);

  fab.addEventListener('click', function(e) {
    e.preventDefault();
    if (fab.classList.contains('up')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const headerOffset = 80; // adjust if your sticky header height differs
      const targetTop = Math.min(
        window.scrollY + window.innerHeight - headerOffset,
        document.documentElement.scrollHeight - window.innerHeight
      );
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});