// VIPER CHEATS PUBLIC JS
// Instructions: Paste into 'Page JavaScript' tab

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));


    // 2. FAQ Accordion Logic
    const accHeaders = document.querySelectorAll('.vp-acc-header');
    
    accHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            
            // Close others
            document.querySelectorAll('.vp-acc-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });
});
