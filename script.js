

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const steps = carousel.querySelectorAll('.step');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        let currentIndex = 0;

        function showStep(index) {
        steps.forEach((step, i) => {
            if (i === index) {
            step.classList.add('showing');
            } else {
            step.classList.remove('showing');
            }
        });
        }

        prevBtn?.addEventListener('click', () => {
            if (currentIndex > 0) {
            currentIndex--;
            showStep(currentIndex);
            }
        });

        nextBtn?.addEventListener('click', () => {
            if (currentIndex < steps.length - 1) {
            currentIndex++;
            showStep(currentIndex);
            }
        });

        showStep(currentIndex);
    });

    function updateCarouselHeight(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const steps = carousel.querySelectorAll('.step');
    let maxHeight = 0;

    steps.forEach(step => {
        // Temporarily show all steps to measure
        step.style.display = 'block';
        const height = step.offsetHeight;
        if (height > maxHeight) maxHeight = height;
        step.style.display = ''; // Let CSS decide visibility again
    });

    track.style.height = maxHeight + 'px';
    }

    function waitForImagesToLoad(carousel, callback) {
    const images = carousel.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;

    if (total === 0) {
        callback(); // No images to wait for
        return;
    }

    images.forEach(img => {
        if (img.complete) {
        loaded++;
        if (loaded === total) callback();
        } else {
        img.addEventListener('load', () => {
            loaded++;
            if (loaded === total) callback();
        });
        img.addEventListener('error', () => {
            loaded++;
            if (loaded === total) callback();
        });
        }
    });
    }

    // Call this after DOM is ready
    function initializeCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        waitForImagesToLoad(carousel, () => {
        updateCarouselHeight(carousel);
        });
    });
    }

    window.addEventListener('load', initializeCarousels);
    window.addEventListener('resize', initializeCarousels);

});

