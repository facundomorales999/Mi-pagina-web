const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll("[data-section][data-value]");

/* ===== Loader =====*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})

/*===== Header =====*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
        document.querySelector('.nav_menu').classList.remove('active');
        document.querySelector('.nav_menu').classList.add('not-active');
    }
    else {
        this.classList.add('active');
        this.classList.remove('not-active');
        document.querySelector('.nav_menu').classList.remove('not-active');
        document.querySelector('.nav_menu').classList.add('active');
    }
});

/*===== Cambio de idioma =====*/
const changeLanguage = async language => {
    const requestJson = await fetch(`./assets/languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        const text = texts[section]?.[value];

        if (!text) continue;

        if (text.includes('<br>')) {
            textToChange.innerHTML = text;
        } else {
            textToChange.textContent = text;
        }
    }
    /*===== Cambiar el link al CV =====*/ 
    updateCvLink(language);
}

function updateCvLink(language) {
    const cvButton = document.getElementById('cv-button'); // o el ID real de tu botón
    const cvLinks = {
        "es": "https://drive.google.com/file/d/1u98BvAAz7HitK5--BDSUQu5pZh4ECjW2/view",
        "en": "https://drive.google.com/file/d/16uH52mXrGsmZpmb4991pcA-SOWQnTFfm/view?usp=sharing"
    };

    // Actualizar el href del botón
    if (cvLinks[language]) {
        cvButton.href = cvLinks[language];
    } else {
        console.warn("No hay link definido para el idioma:", language);
    }
}

flagsElement.addEventListener('click', (e) => {
    const langElement = e.target.closest('[data-language]');
    if (langElement) {
        changeLanguage(langElement.dataset.language);
    }
});

/*===== class active por secciones =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        }
        else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');
    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Inicialización de AOS
AOS.init({
    once: true,         // Las animaciones se ejecutan solo una vez
    duration: 700,      // Duración de la animación en milisegundos
    offset: 100,        // Cuándo comienza la animación al hacer scroll
    easing: 'ease-in-out',
    disable: false      // Asegura que funcione en móviles también
});

// Forzar refresco después de que cargue todo (importante para layout con grid)
window.addEventListener('load', () => {
    AOS.refresh();
});