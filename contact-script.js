// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Scroll FAB behavior: keep down until bottom; then up
    const fab = document.getElementById('scroll-fab');
    if (fab) {
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
    }
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                firstName: formData.get('firstName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.firstName || !data.email || !data.phone || !data.subject) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Add smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to contact cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
