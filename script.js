// script.js
// For menu toggle and other interactivity

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
});

// Hero background slider
window.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero-bg-slider .hero-bg');
  const dots = document.querySelectorAll('.hero-slider-dots .dot');
  const progressBar = document.querySelector('.hero-slider-progress-bar');
  let current = 0;
  let duration = 3500;
  function showSlide(idx) {
    slides.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    // Animate progress bar
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
});