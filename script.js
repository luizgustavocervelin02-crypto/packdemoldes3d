document.addEventListener('DOMContentLoaded', () => {

    // 1. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
            }
        });
    });

    // 2. Intersection Observer for Scroll Animations
    // Elements will slide/fade in once they enter the viewport
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-right');
    
    const animationObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: Stop observing once animated if you only want it once
                // observer.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // 3. Smooth scrolling for anchor links (fallback for browsers not supporting scroll-behavior)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (let link of anchorLinks) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

});
