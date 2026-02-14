document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // ABOUT SLIDER
    // ==========================================
    const aboutSlider = document.getElementById('aboutSlider');
    const aboutDotsContainer = document.getElementById('aboutDots');

    if (aboutSlider && aboutDotsContainer) {
        const track = aboutSlider.querySelector('.about__track');
        const items = aboutSlider.querySelectorAll('.about__item');
        let itemsToShow = 3; let itemsToScroll = 3;
        let autoplayInterval; let resumeTimeout;
        
        function updateResponsive() {
            const width = window.innerWidth;
            if (width < 768) { itemsToShow = 1; itemsToScroll = 1; } 
            else if (width < 992) { itemsToShow = 2; itemsToScroll = 2; } 
            else { itemsToShow = 3; itemsToScroll = 3; }
            setupDots(); goToPage(0);
        }
        
        let currentPage = 0; let totalPages = 0;
        
        function setupDots() {
            aboutDotsContainer.innerHTML = '';
            totalPages = Math.ceil(items.length / itemsToScroll);
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToPage(i); clearInterval(autoplayInterval); clearTimeout(resumeTimeout);
                    resumeTimeout = setTimeout(startAutoplay, 60000); 
                });
                aboutDotsContainer.appendChild(dot);
            }
        }

        function goToPage(index) {
            if (index < 0) index = 0; if (index >= totalPages) index = totalPages - 1;
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
                if (nextIndex >= totalPages) nextIndex = 0;
                goToPage(nextIndex);
            }, 3000);
        }

        function stopAutoplay() { clearInterval(autoplayInterval); }
        
        updateResponsive();
        window.addEventListener('resize', updateResponsive);
        startAutoplay();
        aboutSlider.addEventListener('mouseenter', stopAutoplay);
        aboutSlider.addEventListener('mouseleave', () => { if (!resumeTimeout) startAutoplay(); });
    }


    // ==========================================
    // REVIEWS SLIDER
    // ==========================================
    const reviewsSlider = document.getElementById('reviewsSlider');
    const reviewsDots = document.getElementById('reviewsDots');
    const reviewsTrack = reviewsSlider ? reviewsSlider.querySelector('.reviews__track') : null;

    const positiveReviews = [
        "Absolutely amazing experience! The booking process was smooth.",
        "Best travel agency I've ever dealt with. Support was available 24/7.",
        "A dream vacation come true. The hotels were top-notch.",
        "Highly recommended! Great prices and even better service.",
        "Professional, reliable, and friendly. Found us a hidden gem.",
        "Everything was perfect, from the flight to the hotel.",
        "Fusion Travel made our honeymoon unforgettable.",
        "Great attention to detail and very personal approach.",
        "I will definitely book with them again next summer!"
    ];

    if (reviewsSlider && reviewsDots && reviewsTrack) {
        
        fetch('https://randomuser.me/api/?results=9&nat=us,gb,au')
            .then(response => {
                if (!response.ok) throw new Error('API failed');
                return response.json();
            })
            .then(data => {
                renderReviews(data.results); 
            })
            .catch(error => {
                console.log('Using fallback data');
                useFallbackData(); 
            });

        function renderReviews(usersData) {
            reviewsTrack.innerHTML = ''; 

            usersData.forEach((user, index) => {
                const reviewText = positiveReviews[index % positiveReviews.length];
                const image = user.picture ? user.picture.large : user.image; 
                const name = user.name.first ? `${user.name.first} ${user.name.last}` : user.name;
                const location = user.location.city ? `${user.location.city}, ${user.location.country}` : user.location;

                const html = `
                    <div class="reviews__item">
                        <div class="card reviews__card">
                            <div class="reviews__photo">
                                <img src="${image}" alt="${name}">
                            </div>
                            <div class="reviews__body">
                                <p class="reviews__text">"${reviewText}"</p>
                                <div class="reviews__author">
                                    <h4 class="reviews__name">${name}</h4>
                                    <span class="reviews__location">${location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                reviewsTrack.innerHTML += html;
            });

            initReviewsSlider();
        }

        function useFallbackData() {
            const fallbackUsers = [
                { name: "Sarah Jenkins", location: "New York, USA", image: "https://randomuser.me/api/portraits/women/44.jpg" },
                { name: "Michael Chen", location: "London, UK", image: "https://randomuser.me/api/portraits/men/32.jpg" },
                { name: "Emma Watson", location: "Sydney, AU", image: "https://randomuser.me/api/portraits/women/68.jpg" },
                { name: "John Doe", location: "Toronto, CA", image: "https://randomuser.me/api/portraits/men/85.jpg" },
                { name: "Alice Cooper", location: "Berlin, DE", image: "https://randomuser.me/api/portraits/women/22.jpg" },
                { name: "Robert Downey", location: "Paris, FR", image: "https://randomuser.me/api/portraits/men/45.jpg" },
                { name: "Kate Winslet", location: "Rome, IT", image: "https://randomuser.me/api/portraits/women/10.jpg" },
                { name: "Chris Evans", location: "Madrid, ES", image: "https://randomuser.me/api/portraits/men/12.jpg" },
                { name: "Scarlett Jo", location: "Kyiv, UA", image: "https://randomuser.me/api/portraits/women/55.jpg" }
            ];
            renderReviews(fallbackUsers);
        }

        function initReviewsSlider() {
            const items = reviewsSlider.querySelectorAll('.reviews__item');
            const totalItems = items.length; 
            const totalDots = 3;             
            
            let currentPage = 0;
            let reviewsAutoplayInterval;
            let reviewsResumeTimeout;

            reviewsDots.innerHTML = '';
            const dots = [];

            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    let targetIndex = i; 

                    if (i === 0) {
                        targetIndex = 0;
                    } 
                    else if (i === 1) {
                        if (currentPage > 1) {
                            targetIndex = currentPage - 1;
                        } else {
                            targetIndex = 1;
                        }
                    } 
                    else if (i === 2) {
                        if (currentPage >= 2) {
                            targetIndex = currentPage + 1;
                        } else {
                            targetIndex = 2;
                        }
                    }
                    
                    goToReview(targetIndex);

                    clearInterval(reviewsAutoplayInterval);
                    clearTimeout(reviewsResumeTimeout);
                    reviewsResumeTimeout = setTimeout(startReviewsAutoplay, 60000);
                });

                reviewsDots.appendChild(dot);
                dots.push(dot);
            }

            function goToReview(index) {
                if (index < 0) index = 0;
                if (index >= totalItems) index = totalItems - 1;
                
                currentPage = index;
                const translateValue = -(currentPage * 100);
                reviewsTrack.style.transform = `translateX(${translateValue}%)`;

                let activeDotIndex;
                if (currentPage === 0) {
                    activeDotIndex = 0; 
                } else if (currentPage === 1) {
                    activeDotIndex = 1; 
                } else {
                    activeDotIndex = 2; 
                }

                dots.forEach(d => d.classList.remove('active'));
                if (dots[activeDotIndex]) dots[activeDotIndex].classList.add('active');
            }

            function startReviewsAutoplay() {
                clearInterval(reviewsAutoplayInterval);
                reviewsAutoplayInterval = setInterval(() => {
                    let nextIndex = currentPage + 1;
                    if (nextIndex >= totalItems) nextIndex = 0;
                    goToReview(nextIndex);
                }, 4000); 
            }

            function stopReviewsAutoplay() {
                clearInterval(reviewsAutoplayInterval);
            }

            startReviewsAutoplay();
            reviewsSlider.addEventListener('mouseenter', stopReviewsAutoplay);
            reviewsSlider.addEventListener('mouseleave', () => {
                if (!reviewsResumeTimeout) startReviewsAutoplay();
            });
        }
    }


    // ==========================================
    // DESTINATIONS LIVE SEARCH
    // ==========================================
    const searchInput = document.getElementById('destinationInput');
    const resultsList = document.getElementById('destinationResults');
    let allCountries = []; 

    if (searchInput && resultsList) {
        fetch('https://restcountries.com/v3.1/all?fields=name,flags')
            .then(res => res.json())
            .then(data => { allCountries = data; })
            .catch(err => console.error('Error loading countries:', err));

        searchInput.addEventListener('input', function(e) {
            const searchText = e.target.value.toLowerCase();
            resultsList.innerHTML = ''; 

            if (searchText.length === 0) {
                resultsList.classList.remove('active');
                return;
            }

            const filteredCountries = allCountries.filter(country => {
                return country.name.common.toLowerCase().includes(searchText);
            });

            if (filteredCountries.length > 0) {
                resultsList.classList.add('active');
                filteredCountries.slice(0, 5).forEach(country => {
                    const li = document.createElement('li');
                    li.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.common}"><span>${country.name.common}</span>`;
                    li.addEventListener('click', () => {
                        searchInput.value = country.name.common; 
                        resultsList.classList.remove('active');  
                    });
                    resultsList.appendChild(li);
                });
            } else {
                resultsList.classList.remove('active');
            }
        });

        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !resultsList.contains(e.target)) {
                resultsList.classList.remove('active');
            }
        });
    }


    // ==========================================
    // VIDEO MODAL
    // ==========================================
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
        setTimeout(() => { if(iframe) iframe.setAttribute('src', ''); }, 300);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
    });

});
