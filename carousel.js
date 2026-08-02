let currentSlideIndex = 1;

function nextSlide() {
    showSlide(currentSlideIndex += 1);
}

function prevSlide() {
    showSlide(currentSlideIndex -= 1);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");
    
    // Loop para voltar ao início se passar do final
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    
    // Loop para voltar ao final se passar do início
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    // Remove a classe active de todos os slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove a classe active de todos os dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Adiciona a classe active ao slide e dot correntes
    slides[currentSlideIndex - 1].classList.add("active");
    dots[currentSlideIndex - 1].classList.add("active");
    
    // Atualiza o número do ano
    document.getElementById("currentYear").textContent = currentSlideIndex;
}

// Inicializa o primeiro slide ao carregar
showSlide(currentSlideIndex);

// Teclado: setas esquerda e direita
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        prevSlide();
    } else if (event.key === "ArrowRight") {
        nextSlide();
    } else if (event.key === "Escape") {
        closeModal();
    }
});

// Funções do Modal
function openModal() {
    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("modalImg");
    const modalYear = document.getElementById("modalYear");
    
    // Obtém a imagem atual do carrossel
    const currentSlide = document.getElementsByClassName("carousel-slide")[currentSlideIndex - 1];
    const imgSrc = currentSlide.getElementsByTagName("img")[0].src;
    
    modalImg.src = imgSrc;
    modalYear.textContent = currentSlideIndex;
    
    // Esconde todos os textos
    for (let i = 1; i <= 6; i++) {
        document.getElementById("text" + i).style.display = "none";
    }
    
    // Mostra o texto correto
    document.getElementById("text" + currentSlideIndex).style.display = "block";
    
    modal.classList.add("active");
}

function closeModal(event) {
    // Se clicou fora da imagem, fecha
    if (event && event.target.id !== "photoModal") {
        return;
    }
    
    const modal = document.getElementById("photoModal");
    modal.classList.remove("active");
}

// Fecha o modal ao pressionar Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const polaroidCard = document.getElementById("polaroidCard");

    if (!polaroidCard) {
        return;
    }

    const polaroidImage = document.getElementById("polaroidImage");
    const polaroidCaption = document.getElementById("polaroidCaption");
    const polaroidPhotos = [
        { src: "pola3.jpg", alt: "Polaroid do casal", caption: "Eu" },
        { src: "pola1.jpg", alt: "Polaroid 1", caption: "Te amo" },
        { src: "pola2.jpg", alt: "Polaroid 2", caption: "Mais doq tudo!!" }
    ];

    let currentPhotoIndex = 0;
    let isSwitching = false;

    function showNextPolaroid() {
        if (isSwitching) {
            return;
        }

        isSwitching = true;
        const nextPhotoIndex = (currentPhotoIndex + 1) % polaroidPhotos.length;

        polaroidCard.classList.remove("is-entering");
        void polaroidCard.offsetWidth;
        polaroidCard.classList.add("is-leaving");

        window.setTimeout(() => {
            currentPhotoIndex = nextPhotoIndex;
            const nextPhoto = polaroidPhotos[currentPhotoIndex];

            polaroidImage.src = nextPhoto.src;
            polaroidImage.alt = nextPhoto.alt;
            polaroidCaption.textContent = nextPhoto.caption;

            polaroidCard.classList.remove("is-leaving");
            void polaroidCard.offsetWidth;
            polaroidCard.classList.add("is-entering");

            window.setTimeout(() => {
                polaroidCard.classList.remove("is-entering");
                isSwitching = false;
            }, 440);
        }, 260);
    }

    polaroidCard.addEventListener("click", showNextPolaroid);
    polaroidCard.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showNextPolaroid();
        }
    });
});

