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
  let current = 0;
  function showSlide(idx) {
    slides.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
  }
  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  let interval = setInterval(nextSlide, 3500);
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      current = idx;
      showSlide(current);
      clearInterval(interval);
      interval = setInterval(nextSlide, 3500);
    });
  });
  showSlide(current);
});