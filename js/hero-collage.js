// Auto-rotate hero photo collage
document.addEventListener('DOMContentLoaded', function () {
    const collageImages = document.querySelectorAll('.collage-frame img');

    if (collageImages.length > 0) {
        let currentIndex = 0;

        function rotateImages() {
            // Remove active class from all images
            collageImages.forEach(img => img.classList.remove('active'));

            // Add active class to current image
            collageImages[currentIndex].classList.add('active');

            // Move to next image
            currentIndex = (currentIndex + 1) % collageImages.length;
        }

        // Start rotation every 5 seconds
        setInterval(rotateImages, 5000);
    }
});
