document.addEventListener('DOMContentLoaded', () => {
    const SLIDES = document.querySelectorAll('.carousel-slide img');
    const NAVDOTS = document.querySelectorAll('.nav-dot');
    const SLIDECONTAINER = document.querySelector('.carousel-slide');
    let currentIndex = 0;
    let slideInterval;

    // 각 슬라이드에 대한 버튼 정보를 담은 배열
    const BUTTONS = [
        { id: 'Madame_web', movieId: 634492 },
        { id: 'The_hobbit', movieId: 122917 },
        { id: 'Joker', movieId: 889737 }
    ];

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % SLIDES.length;
        updateCarousel();
    }

    function navigateToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetInterval();
    }

    function updateCarousel() {
        const slideWidth = SLIDECONTAINER.clientWidth;
        SLIDECONTAINER.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateNavDots();
    }

    function updateNavDots() {
        NAVDOTS.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function initializeCarousel() {
        updateCarousel();
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 3000);
    }

    function createButtons() {
        SLIDES.forEach((slide, index) => {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            buttonContainer.style.position = 'absolute';
            buttonContainer.style.bottom = '60px';
            buttonContainer.style.left = '20px';
            buttonContainer.style.right = '20px';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between';
            buttonContainer.style.pointerEvents = 'auto';

            const { id, movieId } = BUTTONS[index];
            
            const shortcutsButton = document.createElement('button');
            shortcutsButton.classList.add('shortcuts');
            shortcutsButton.id = id;
            shortcutsButton.textContent = '바로가기';
            shortcutsButton.onclick = () => {
                window.location.href = `/html/movie_detail.html?id=${movieId}`;
            };

            const informationButton = document.createElement('button');
            informationButton.classList.add('information');
            informationButton.id = `information_${id}`;
            informationButton.innerHTML = '<i class="fas fa-info-circle"></i> 상세정보';
            informationButton.onclick = () => {
                window.location.href = `/html/movie_detail.html?id=${movieId}`;
            };

            buttonContainer.appendChild(shortcutsButton);
            buttonContainer.appendChild(informationButton);

            slide.parentElement.appendChild(buttonContainer);
        });
    }

    function addImageClickEvents() {
        SLIDES.forEach((slide, index) => {
            const { movieId } = BUTTONS[index];
            if (window.innerWidth <= 1024) {
                // 모바일 및 태블릿 환경
                slide.style.cursor = 'pointer';
                slide.onclick = () => {
                    window.location.href = `/html/movie_detail.html?id=${movieId}`;
                };
            } else {
                // PC 환경
                slide.style.cursor = 'default';
                slide.onclick = null;
            }
        });
    }

    initializeCarousel();

    NAVDOTS.forEach((dot, index) => {
        dot.addEventListener('click', () => navigateToSlide(index));
    });

    window.addEventListener('resize', () => {
        updateCarousel();
        addImageClickEvents();
    });

    createButtons();
    addImageClickEvents();

    window.navigateToSlide = navigateToSlide;
});