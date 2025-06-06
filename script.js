document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const steps = carousel.querySelectorAll('.step');
    const stepLabel = carousel.querySelector('.carousel-position-label');
    const showAllBtn = carousel.querySelector('.show-all');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const track = carousel.querySelector('.carousel-track');
    let currentIndex = 0;
    let showingAll = false;

    steps.forEach((step) => {
        const img = step.querySelector('img');
        img.setAttribute('alt', step.querySelector('p').textContent);
    });

function showStep(index) {
    prevBtn?.classList.toggle('disabled', index === 0);
    nextBtn?.classList.toggle('disabled', index === steps.length - 1);

    steps.forEach((step, i) => {
        if (i === index) {
            step.classList.add('showing');
            step.style.display = 'block';
        } else {
            step.classList.remove('showing');
            step.style.display = 'none';
        }
    });

    if (stepLabel) {
        stepLabel.textContent = `${index + 1} / ${steps.length}`;
    }
}

    function showAllSteps() {
      steps.forEach(step => {
        step.classList.add('showing');
        step.style.position = 'relative';
        step.style.display = 'block';
      });
      if (stepLabel) stepLabel.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      track.style.height = 'auto';
      showingAll = true;
    }

function revertToCarousel() {
    steps.forEach(step => {
        step.style.position = 'absolute';
    });

    if (stepLabel) stepLabel.style.display = '';
    if (prevBtn) prevBtn.style.display = '';
    if (nextBtn) nextBtn.style.display = '';
    
    showingAll = false;
    showStep(currentIndex);
    updateCarouselHeight(carousel);
}

    showAllBtn?.addEventListener('click', () => {
      if (!showingAll) {
        showAllSteps();
        showAllBtn.textContent = 'Show One at a Time';
      } else {
        revertToCarousel();
        showAllBtn.textContent = 'Show All';
      }
    });

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

    function updateCarouselHeight(carousel) {  
      if (showingAll) return;
      
      const track = carousel.querySelector('.carousel-track');
      const steps = carousel.querySelectorAll('.step');
      let maxHeight = 0;
      
      steps.forEach(step => {
        step.style.display = 'block';
        const height = step.offsetHeight;
        if (height > maxHeight) maxHeight = height;
        step.style.display = '';
      });
      
      track.style.height = maxHeight + 'px';
    }

    function waitForImagesToLoad(carousel, callback) {
      const images = carousel.querySelectorAll('img');
      let loaded = 0;
      const total = images.length;
  
      if (total === 0) {
        callback();
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
    function initializeCarousels() {
      waitForImagesToLoad(carousel, () => {
        updateCarouselHeight(carousel);
      });
    }
  
    window.addEventListener('load', initializeCarousels);
    window.addEventListener('resize', initializeCarousels);

    showStep(currentIndex);
  });
});

console.log("You're not supposed to be here!");