// ============================================
// Typing animation for the hero subtitle
// (fixed: char index no longer overshoots during the pause)
// ============================================
const phrases = [
    "a Computer Science student.....",
    "a Software Developer in the making.....",
    "specializing in web design and backend systems....."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

const introTextElement = document.getElementById('intro-typing');

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        currentCharIndex--;
    } else {
        currentCharIndex++;
    }

    introTextElement.textContent = currentPhrase.substring(0, currentCharIndex);

    let delay = 100;

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        // Pause at the end of the phrase, then start deleting
        isDeleting = true;
        delay = 2000;
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to the next phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(typeWriter, delay);
}

window.addEventListener('load', typeWriter);

// ============================================
// Hamburger menu
// ============================================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Close the mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("show"));
});

// ============================================
// CV Modal
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('cvModal');
    const btn = document.getElementById('cvButton');
    const closeBtn = document.getElementsByClassName('close-button')[0];

    btn.onclick = function () {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    };

    closeBtn.onclick = function () {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});

// ============================================
// Featured Project Slideshows + Lightbox Viewer
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const AUTOPLAY_DELAY = 3800;
    const slideshows = document.querySelectorAll('.featured-slideshow');
    const galleries = {}; // project name -> array of { src, alt }

    slideshows.forEach((slideshow) => {
        const projectName = slideshow.dataset.project;
        const slides = Array.from(slideshow.querySelectorAll('.slide'));
        const dotsContainer = slideshow.querySelector('.slideshow-dots');
        const prevBtn = slideshow.querySelector('.slide-prev');
        const nextBtn = slideshow.querySelector('.slide-next');

        galleries[projectName] = slides.map((img) => ({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
        }));

        let current = slides.findIndex((s) => s.classList.contains('active'));
        if (current === -1) current = 0;
        let timer = null;

        // Build dots
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === current ? ' active' : '');
            dot.addEventListener('click', () => {
                goTo(i);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

        function updateUI() {
            slides.forEach((s, i) => s.classList.toggle('active', i === current));
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            updateUI();
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startTimer() {
            timer = setInterval(next, AUTOPLAY_DELAY);
        }

        function resetTimer() {
            clearInterval(timer);
            startTimer();
        }

        prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
        nextBtn.addEventListener('click', () => { next(); resetTimer(); });

        // Pause autoplay on hover, resume on leave
        slideshow.addEventListener('mouseenter', () => clearInterval(timer));
        slideshow.addEventListener('mouseleave', startTimer);

        // Clicking a slide opens the lightbox at that image
        slides.forEach((img, i) => {
            img.addEventListener('click', () => openLightbox(projectName, i));
        });

        startTimer();
    });

    // ---- Lightbox ----
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let activeGallery = [];
    let activeIndex = 0;

    function openLightbox(projectName, index) {
        activeGallery = galleries[projectName];
        activeIndex = index;
        renderLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function renderLightbox() {
        const item = activeGallery[activeIndex];
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt || '';
        lightboxCounter.textContent = (activeIndex + 1) + ' / ' + activeGallery.length;
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    function lightboxNextImg() {
        activeIndex = (activeIndex + 1) % activeGallery.length;
        renderLightbox();
    }

    function lightboxPrevImg() {
        activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
        renderLightbox();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', lightboxNextImg);
    lightboxPrev.addEventListener('click', lightboxPrevImg);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightboxNextImg();
        if (e.key === 'ArrowLeft') lightboxPrevImg();
    });
});
