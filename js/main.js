document.addEventListener('DOMContentLoaded', () => {
    console.log('Main JS loaded');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Manual Slideshow Navigation
    const slideshows = document.querySelectorAll('.manual-slideshow, .hero-slideshow');

    slideshows.forEach(slideshow => {
        const images = slideshow.querySelectorAll('img');
        if (images.length === 0) return;

        let currentIndex = 0;
        images[0].classList.add('active');

        const prevBtn = slideshow.querySelector('.prev');
        const nextBtn = slideshow.querySelector('.next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                images[currentIndex].classList.add('active');
            });

            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            });
        }
    });
});
