document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    const currentYearElement = document.getElementById('currentYear');
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const modal = document.getElementById('photoModal');
    const modalContent = document.querySelector('.modal-content');
    const modalImage = document.getElementById('modalImg');
    const modalYear = document.getElementById('modalYear');
    const modalCloseButton = document.querySelector('.modal-close');
    const modalTexts = Array.from(document.querySelectorAll('.modal-text'));
    const modalYearClasses = ['year-1', 'year-2', 'year-3', 'year-4', 'year-5', 'year-6'];

    let currentSlideIndex = 1;

    if (!slides.length || !dots.length || !currentYearElement || !carousel || !prevButton || !nextButton || !dotsContainer) {
        return;
    }

    function showSlide(n) {
        const totalSlides = slides.length;
        currentSlideIndex = ((n - 1 + totalSlides) % totalSlides) + 1;

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlideIndex - 1);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex - 1);
        });

        currentYearElement.textContent = currentSlideIndex;
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    function currentSlide(n) {
        showSlide(n);
    }

    function openModal() {
        if (!modal || !modalContent || !modalImage || !modalYear) {
            return;
        }

        const currentSlide = slides[currentSlideIndex - 1];
        const imgElement = currentSlide?.querySelector('img');

        if (!imgElement) {
            return;
        }

        modalImage.src = imgElement.src;
        modalImage.alt = imgElement.alt;
        modalYear.textContent = currentSlideIndex;

        modalYearClasses.forEach((className) => {
            modalContent.classList.remove(className);
        });
        modalContent.classList.add(`year-${currentSlideIndex}`);

        modalTexts.forEach((text) => {
            text.style.display = 'none';
        });

        const activeText = document.getElementById(`text${currentSlideIndex}`);
        if (activeText) {
            activeText.style.display = 'block';
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        if (!modal) {
            return;
        }

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    carousel.addEventListener('click', openModal);

    dotsContainer.addEventListener('click', (event) => {
        const dotButton = event.target.closest('.dot');
        if (!dotButton) {
            return;
        }

        currentSlide(Number(dotButton.dataset.slideIndex));
    });

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            nextSlide();
        } else if (event.key === 'Escape') {
            closeModal();
        }
    });

    showSlide(currentSlideIndex);
});

window.addEventListener('DOMContentLoaded', () => {
    const polaroidCard = document.getElementById('polaroidCard');

    if (!polaroidCard) {
        return;
    }

    const polaroidImage = document.getElementById('polaroidImage');
    const polaroidCaption = document.getElementById('polaroidCaption');
    const polaroidPhotos = [
        { src: '../assets/images/pola3.jpg', alt: 'Polaroid do casal', caption: 'Eu' },
        { src: '../assets/images/pola1.jpg', alt: 'Polaroid 1', caption: 'Te amo' },
        { src: '../assets/images/pola2.jpg', alt: 'Polaroid 2', caption: 'Mais doq tudo!!' }
    ];

    let currentPhotoIndex = 0;
    let isSwitching = false;

    function showNextPolaroid() {
        if (isSwitching) {
            return;
        }

        isSwitching = true;
        const nextPhotoIndex = (currentPhotoIndex + 1) % polaroidPhotos.length;

        polaroidCard.classList.remove('is-entering');
        void polaroidCard.offsetWidth;
        polaroidCard.classList.add('is-leaving');

        window.setTimeout(() => {
            currentPhotoIndex = nextPhotoIndex;
            const nextPhoto = polaroidPhotos[currentPhotoIndex];

            polaroidImage.src = nextPhoto.src;
            polaroidImage.alt = nextPhoto.alt;
            polaroidCaption.textContent = nextPhoto.caption;

            polaroidCard.classList.remove('is-leaving');
            void polaroidCard.offsetWidth;
            polaroidCard.classList.add('is-entering');

            window.setTimeout(() => {
                polaroidCard.classList.remove('is-entering');
                isSwitching = false;
            }, 440);
        }, 260);
    }

    polaroidCard.addEventListener('click', showNextPolaroid);
    polaroidCard.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showNextPolaroid();
        }
    });
});

