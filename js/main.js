// ============================================
// 1. INITIALISATION AOS (Apparition au scroll)
// ============================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ============================================
// 2. INITIALISATION TILT 3D (Effet survol)
// ============================================
// Vérifie si la librairie est chargée avant de l'utiliser
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".js-tilt"), {
        max: 15,            // Inclinaison max
        speed: 400,         // Vitesse de transition
        glare: true,        // Effet de reflet lumineux
        "max-glare": 0.2,   // Opacité max du reflet
    });
}

// ============================================
// 3. MENU MOBILE (Hamburger)
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fermer le menu quand on clique sur un lien
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// 4. NAVBAR DYNAMIQUE (Changement au scroll)
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(15, 15, 15, 0.95)";
        navbar.style.padding = "10px 0";
    } else {
        navbar.style.background = "rgba(15, 15, 15, 0.9)";
        navbar.style.padding = "20px 0";
    }
});

// ============================================
// 5. EFFET MACHINE À ÉCRIRE (Typewriter)
// ============================================
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="gradient-text">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Lancer le TypeWriter au chargement de la page
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    // Vérifie que l'élément existe pour éviter une erreur sur d'autres pages
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
}