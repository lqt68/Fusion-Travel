document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('aboutSlider');
    if (!slider) return;

    const track = slider.querySelector('.about__track');
    const items = slider.querySelectorAll('.about__item');
    const dotsContainer = document.getElementById('aboutDots');

    let itemsToShow = 3; 
    let itemsToScroll = 3;

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
        dotsContainer.innerHTML = '';
        totalPages = Math.ceil(items.length / itemsToScroll);

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }

    function goToPage(index) {
        if (index < 0) index = 0;
        if (index >= totalPages) index = totalPages - 1;
        
        currentPage = index;

        const itemWidth = 100 / itemsToShow;
        const movePercentage = currentPage * itemsToScroll * itemWidth;

        track.style.transform = `translateX(-${movePercentage}%)`;

        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(d => d.classList.remove('active'));
        if (dots[currentPage]) dots[currentPage].classList.add('active');
    }

    updateResponsive();

    window.addEventListener('resize', () => {
        updateResponsive();
    });

    const reviewsSlider = document.getElementById('reviewsSlider');
    const reviewsDots = document.getElementById('reviewsDots');

    if (reviewsSlider && reviewsDots) {
        const track = reviewsSlider.querySelector('.reviews__track');
        const items = reviewsSlider.querySelectorAll('.reviews__item');

        const itemsToShow = 1;

        let currentPage = 0;
        const totalPages = items.length;

        reviewsDots.innerHTML = '';
        const dots = [];

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');

            if (i === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                goToReview(i);
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
    }
});

document.addEventListener('DOMContentLoaded', function() {
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
            modal.classList.add('active');
            iframe.src = videoUrl;
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            iframe.src = ''; 
        }, 300);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
