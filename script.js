// Desplazamiento suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cambio de fondo de la barra de navegación al desplazarse
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(63, 211, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Observadora de intersecciones para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para la animación.
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.stat-card, .testimonial-card, .method-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Animación de contador para estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Activar la animación del contador cuando la sección de estadísticas esté visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, number);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Controladores de clics de marcadores de posición de video
document.querySelectorAll('.video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        // Agregar un efecto de carga
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
            // Aquí normalmente se abriría un modal o se redirigiría al video.
            alert('Video would play here - integrate with your video platform');
        }, 500);
    });
});

// Controlador de envío de formularios (para futuros formularios de contacto)
function handleFormSubmission(formData) {
    // Normalmente, esto enviaría datos a su backend.
    console.log('Form submitted:', formData);
    
    // Mostrar mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.textContent = 'Thank you! We\'ll be in touch soon.';
    
    return successMessage;
}

// Añadir efectos de desplazamiento a las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.testimonial-card, .method-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Efecto de paralaje para la sección del hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// El menú móvil se cierra al hacer clic en el enlace
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Agregar estados de carga a los botones CTA
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href && href !== '#' && href !== '#apply') {
            // Redirigir directamente al link
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Redirecting...';
            this.disabled = true;

            setTimeout(() => {
                window.location.href = href;
            }, 1000); // puedes ajustar el tiempo si quieres
        }
    });
});

// Añadir efecto de escritura al título del hero
function typeWriterHTML(element, speed = 50) {
    const html = element.innerHTML;
    element.innerHTML = '';

    let i = 0;
    let isTag = false;
    let text = '';
  
    function type() {
        const char = html[i++];
        if (char === '<') isTag = true;
        if (char === '>') isTag = false;

        text += char;
        element.innerHTML = text;

        if (i < html.length) {
            setTimeout(type, isTag ? 0 : speed);
        }
    }

    type();
}

// Inicializar el efecto de escritura al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriterHTML(heroTitle, 50);
        }, 1000);
    }
});