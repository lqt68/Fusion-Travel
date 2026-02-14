document.addEventListener('DOMContentLoaded', function() {

    // ABOUT SLIDER
    const aboutSlider = document.getElementById('aboutSlider');
    const aboutDotsContainer = document.getElementById('aboutDots');

    if (aboutSlider && aboutDotsContainer) {
        
        const track = aboutSlider.querySelector('.about__track');
        const items = aboutSlider.querySelectorAll('.about__item');

        let itemsToShow = 3;   
        let itemsToScroll = 3; 
        
        let autoplayInterval; 
        let resumeTimeout;
        const autoplayDelay = 3000;

        function updateResponsive() {
            const width = window.innerWidth;
            if (width < 768) {
                itemsToShow = 1;
                itemsToScroll = 1;
            } else if (width < 992) {
                itemsToShow = 2;
                itemsToScroll = 2;
            } else {
                itemsToShow = 3;
                itemsToScroll = 3;
            }
            setupDots();
            goToPage(0);
        }

        let currentPage = 0;
        let totalPages = 0;

        function setupDots() {
            aboutDotsContainer.innerHTML = '';
            totalPages = Math.ceil(items.length / itemsToScroll);

            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToPage(i);
                    clearInterval(autoplayInterval);
                    clearTimeout(resumeTimeout);
                    resumeTimeout = setTimeout(startAutoplay, 60000); 
                });
                
                aboutDotsContainer.appendChild(dot);
            }
        }

        function goToPage(index) {
            if (index < 0) index = 0;
            if (index >= totalPages) index = totalPages - 1;
            
            currentPage = index;

            const itemWidth = 100 / itemsToShow;
            const movePercentage = currentPage * itemsToScroll * itemWidth;

            track.style.transform = `translateX(-${movePercentage}%)`;

            const dots = aboutDotsContainer.querySelectorAll('.dot');
            dots.forEach(d => d.classList.remove('active'));
            if (dots[currentPage]) dots[currentPage].classList.add('active');
        }

        function startAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                let nextIndex = currentPage + 1;
                if (nextIndex >= totalPages) {
                    nextIndex = 0;
                }
                goToPage(nextIndex);
            }, autoplayDelay);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        updateResponsive();
        window.addEventListener('resize', updateResponsive);
        startAutoplay();

        aboutSlider.addEventListener('mouseenter', stopAutoplay);
        aboutSlider.addEventListener('mouseleave', () => {
            if (!resumeTimeout) startAutoplay();
        });
    }

    // REVIEWS SLIDER
    const reviewsSlider = document.getElementById('reviewsSlider');
    const reviewsDots = document.getElementById('reviewsDots');

    if (reviewsSlider && reviewsDots) {
        const track = reviewsSlider.querySelector('.reviews__track');
        const items = reviewsSlider.querySelectorAll('.reviews__item');

        const itemsToShow = 1;
        let currentPage = 0;
        const totalPages = items.length; 
        
        let reviewsAutoplayInterval;
        let reviewsResumeTimeout;
        const reviewsDelay = 5000; 

        reviewsDots.innerHTML = ''; 
        const dots = []; 

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');

            if (i === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                goToReview(i);
                clearInterval(reviewsAutoplayInterval);
                clearTimeout(reviewsResumeTimeout);
                reviewsResumeTimeout = setTimeout(startReviewsAutoplay, 60000);
            });

            reviewsDots.appendChild(dot);
            dots.push(dot);
        }

        function goToReview(index) {
            if (index < 0) index = 0;
            if (index >= totalPages) index = totalPages - 1;

            currentPage = index;

            const translateValue = -(currentPage * 100);
            track.style.transform = `translateX(${translateValue}%)`;

            dots.forEach(d => d.classList.remove('active'));
            if (dots[currentPage]) {
                dots[currentPage].classList.add('active');
            }
        }

        function startReviewsAutoplay() {
            clearInterval(reviewsAutoplayInterval);
            reviewsAutoplayInterval = setInterval(() => {
                let nextIndex = currentPage + 1;
                if (nextIndex >= totalPages) {
                    nextIndex = 0; 
                }
                goToReview(nextIndex);
            }, reviewsDelay);
        }

        function stopReviewsAutoplay() {
            clearInterval(reviewsAutoplayInterval);
        }

        startReviewsAutoplay();

        const reviewsSection = document.querySelector('.reviews'); 
        if(reviewsSection) {
            reviewsSection.addEventListener('mouseenter', stopReviewsAutoplay);
            reviewsSection.addEventListener('mouseleave', () => {
                if (!reviewsResumeTimeout) startReviewsAutoplay();
            });
        }
    }

    const openBtn = document.getElementById('openVideoBtn');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeVideoBtn');
    const overlay = document.getElementById('videoOverlay');
    const iframe = document.getElementById('youtubePlayer');

    const videoId = 'BYR4RgIgxoI'; 
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(modal) modal.classList.add('active');
            if(iframe) iframe.setAttribute('src', videoUrl);
        });
    }

    function closeModal() {
        if(modal) modal.classList.remove('active');
        setTimeout(() => {
            if(iframe) iframe.setAttribute('src', ''); 
        }, 300);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
