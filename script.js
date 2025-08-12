// --- Slideshow functionality ---
(function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const autoplayInterval = 6000;
    let current = 0;
    let timer = null;
    let paused = false;
    let touchStartX = null;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
            slide.setAttribute('aria-hidden', i !== idx);
            dots[i]?.setAttribute('aria-selected', i === idx);
            dots[i]?.setAttribute('tabindex', i === idx ? '0' : '-1');
            dots[i]?.classList.toggle('active', i === idx);
        });
        current = idx;
    }

    function nextSlide() { showSlide((current + 1) % slides.length); }
    function prevSlide() { showSlide((current - 1 + slides.length) % slides.length); }
    function goToSlide(idx) { showSlide(idx); }

    function startAutoplay() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            if (!paused) nextSlide();
        }, autoplayInterval);
    }
    function pauseAutoplay() { paused = true; }
    function resumeAutoplay() { paused = false; }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
        dot.addEventListener('focus', pauseAutoplay);
        dot.addEventListener('blur', resumeAutoplay);
    });
    track.addEventListener('mouseenter', pauseAutoplay);
    track.addEventListener('mouseleave', resumeAutoplay);
    [nextBtn, prevBtn].forEach(btn => {
        btn.addEventListener('focus', pauseAutoplay);
        btn.addEventListener('blur', resumeAutoplay);
    });

    // Keyboard and touch controls
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    track.addEventListener('touchstart', e => {
        if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', e => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
            if (dx < 0) nextSlide();
            else prevSlide();
        }
        touchStartX = null;
    });

    // Initialize
    showSlide(0);
    startAutoplay();
})();