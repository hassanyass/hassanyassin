// Hero Slideshow for Detail Pages
document.addEventListener('DOMContentLoaded', function () {
    const heroSlideshow = document.querySelector('.hero-slideshow');

    if (heroSlideshow) {
        const images = heroSlideshow.querySelectorAll('img');
        let currentIndex = 0;

        if (images.length > 0) {
            images[0].classList.add('active');
        }

        const prevBtn = heroSlideshow.querySelector('.prev');
        const nextBtn = heroSlideshow.querySelector('.next');

        if (prevBtn && nextBtn && images.length > 1) {
            prevBtn.addEventListener('click', function () {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                images[currentIndex].classList.add('active');
            });

            nextBtn.addEventListener('click', function () {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            });
        }
    }
});
