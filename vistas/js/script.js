// Cambiar el slogan aleatoriamente
const slogans = [
    "Tu tienda de motos online",
    "Las mejores motos al mejor precio",
    "Pasión por la velocidad",
    "Encuentra tu moto ideal",
    "Expertos en motocicletas"
];

const sloganElement = document.getElementById('slogan');

setInterval(() => {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    sloganElement.style.opacity = 0;

    setTimeout(() => {
        sloganElement.textContent = slogans[randomIndex];
        sloganElement.style.opacity = 1;
    }, 500);
}, 5000);

// Efecto hover avanzado para los enlaces
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function () {
        const hoverText = this.getAttribute('data-hover');
        this.querySelector('.nav-link-content').textContent = hoverText;
    });
});

// Efecto para el carrito cuando se añade un producto
function animarCarrito() {
    const carrito = document.getElementById('btnCarrito');
    carrito.style.transform = 'scale(1.2)';
    setTimeout(() => {
        carrito.style.transform = 'scale(1)';
    }, 300);
}

// Ocultar barra superior al hacer scroll
let lastScrollTop = 0;
const navbar = document.getElementById('mainNavbar');
const topBar = document.getElementById('topBar');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll hacia abajo
        topBar.style.top = '-50px'; // Oculta la barra superior
        navbar.classList.add('navbar-scrolled');
    } else {
        // Scroll hacia arriba
        if (scrollTop <= 100) {
            topBar.style.top = '0'; // Muestra la barra superior
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// HERO

// Inicializar tilt.js en los contenedores de imagen
document.addEventListener('DOMContentLoaded', function () {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(el => {
        VanillaTilt.init(el, {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.1,
        });
    });

    // Contador animado
    const counter = document.querySelector('.visitor-counter');
    if (counter) {
        const target = +counter.getAttribute('data-target');
        anime({
            targets: counter,
            innerHTML: [0, target],
            round: 1,
            easing: 'easeInOutExpo',
            duration: 2000
        });
    }

    // Partículas de fondo
    const container = document.querySelector('.particles-container');
    if (container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(220,53,69,${Math.random() * 0.3 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            container.appendChild(particle);
        }
    }

    // Efecto de zoom al cambiar slides
    const carousel = document.getElementById('motoCarousel');
    if (carousel) {
        carousel.addEventListener('slide.bs.carousel', function () {
            const activeItem = this.querySelector('.carousel-item.active');
            anime({
                targets: activeItem.querySelector('img'),
                scale: [1, 1.05, 1],
                duration: 800,
                easing: 'easeInOutSine'
            });
        });
    }
});

// FOOTER

document.addEventListener('DOMContentLoaded', function () {
    // Año actual
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Efectos hover contacto
    const contactItems = document.querySelectorAll('.contact-list a');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            if (this.querySelector('.map-pin')) {
                this.querySelector('.map-pin').classList.remove('d-none');
                this.querySelector('.map-pin').classList.add('animate__bounce');
            }
            if (this.querySelector('.phone-ring')) {
                this.querySelector('.phone-ring').classList.remove('d-none');
                this.querySelector('.phone-ring').classList.add('animate__shakeX');
            }
            if (this.querySelector('.email-send')) {
                this.querySelector('.email-send').classList.remove('d-none');
                this.querySelector('.email-send').classList.add('animate__fadeIn');
            }
        });

        item.addEventListener('mouseleave', function () {
            if (this.querySelector('.map-pin')) {
                this.querySelector('.map-pin').classList.add('d-none');
            }
            if (this.querySelector('.phone-ring')) {
                this.querySelector('.phone-ring').classList.add('d-none');
            }
            if (this.querySelector('.email-send')) {
                this.querySelector('.email-send').classList.add('d-none');
            }
        });
    });

    // Barra de progreso de horario
    function updateScheduleProgress() {
        const now = new Date();
        const day = now.getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hour + minutes / 60;

        let progressBars = document.querySelectorAll('.progress-bar');

        // Domingo
        if (day === 0) {
            document.getElementById('openStatus').innerHTML = '<span class="text-danger">Cerrado hoy</span>';
            progressBars.forEach(bar => {
                bar.style.width = '0%';
                bar.classList.remove('progress-bar-animated');
            });
            return;
        }

        // Actualizar hora actual
        document.getElementById('currentTime').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Lunes a Viernes (9:00-19:00)
        if (day >= 1 && day <= 5) {
            const open = 9;
            const close = 19;

            if (currentTime < open) {
                document.getElementById('openStatus').innerHTML = '<span class="text-warning">Abre a las 9:00</span>';
                progressBars[0].style.width = '0%';
            } else if (currentTime >= open && currentTime <= close) {
                const progress = ((currentTime - open) / (close - open)) * 100;
                progressBars[0].style.width = `${progress}%`;
                document.getElementById('openStatus').innerHTML = '<span class="text-success">Abierto ahora</span>';
            } else {
                document.getElementById('openStatus').innerHTML = '<span class="text-danger">Cerrado por hoy</span>';
                progressBars[0].style.width = '100%';
            }

            // Sábado (no aplica)
            progressBars[1].style.width = '0%';
        }

        // Sábado (10:00-14:00)
        if (day === 6) {
            const open = 10;
            const close = 14;

            if (currentTime < open) {
                document.getElementById('openStatus').innerHTML = '<span class="text-warning">Abre a las 10:00</span>';
                progressBars[1].style.width = '0%';
            } else if (currentTime >= open && currentTime <= close) {
                const progress = ((currentTime - open) / (close - open)) * 100;
                progressBars[1].style.width = `${progress}%`;
                document.getElementById('openStatus').innerHTML = '<span class="text-success">Abierto ahora</span>';
            } else {
                document.getElementById('openStatus').innerHTML = '<span class="text-danger">Cerrado por hoy</span>';
                progressBars[1].style.width = '100%';
            }

            // Lunes a Viernes (no aplica)
            progressBars[0].style.width = '0%';
        }
    }

    updateScheduleProgress();
    setInterval(updateScheduleProgress, 60000); // Actualizar cada minuto

    // Newsletter con confeti
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function () {
            const email = document.getElementById('newsletterEmail').value;
            const message = document.getElementById('subscribeMessage');

            if (email && email.includes('@')) {
                // Mostrar icono
                this.querySelector('.subscribe-text').classList.add('d-none');
                this.querySelector('.subscribe-icon').classList.remove('d-none');

                // Mostrar mensaje
                message.innerHTML = '<span class="text-success">¡Gracias por suscribirte!</span>';

                // Efecto confeti
                const confettiCanvas = document.getElementById('confetti-canvas');
                confettiCanvas.style.display = 'block';

                const confettiSettings = {
                    target: 'confetti-canvas',
                    max: 150,
                    size: 1.5,
                    animate: true,
                    props: ['circle', 'square', 'triangle', 'line'],
                    colors: [[220, 53, 69], [255, 193, 7], [40, 167, 69], [0, 123, 255]],
                    clock: 25,
                    rotate: true,
                    start_from_edge: true,
                    respawn: true
                };

                const confetti = new ConfettiGenerator(confettiSettings);
                confetti.render();

                // Ocultar confeti después de 3 segundos
                setTimeout(() => {
                    confetti.clear();
                    confettiCanvas.style.display = 'none';
                    this.querySelector('.subscribe-text').classList.remove('d-none');
                    this.querySelector('.subscribe-icon').classList.add('d-none');
                }, 3000);
            } else {
                message.innerHTML = '<span class="text-danger">Por favor ingresa un email válido</span>';
            }
        });
    }

    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});