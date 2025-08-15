document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Menú "Sticky" (Fijo al hacer scroll) ---
    const header = document.querySelector('header');
    const heroSection = document.getElementById('hero'); // Asumiendo que existe una sección #hero
    let headerHeight = header.offsetHeight; // Obtener la altura inicial del header

    // Función para actualizar la altura del header en caso de cambios de tamaño
    const updateHeaderHeight = () => {
        headerHeight = header.offsetHeight;
        // Ajustar el padding-top del body si el header ya es sticky y su altura ha cambiado
        if (header.classList.contains('sticky')) {
            document.body.style.paddingTop = headerHeight + 'px';
        }
    };

    // Escuchar cambios de tamaño de ventana para actualizar la altura del header
    window.addEventListener('resize', updateHeaderHeight);

    window.addEventListener('scroll', () => {
        // Solo activar sticky si hay una sección hero y el scroll pasa su altura
        if (heroSection && window.scrollY > heroSection.offsetHeight - headerHeight) {
            header.classList.add('sticky');
            document.body.style.paddingTop = headerHeight + 'px'; // Añadir padding al body para evitar salto
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0'; // Remover padding
        }
    });

    // --- 2. Menú Hamburguesa para Móviles ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) { // Asegurarse de que los elementos existen
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para cambiar el ícono de hamburguesa a una X
            // Opcional: Desactivar scroll del body cuando el menú está abierto
            document.body.classList.toggle('no-scroll');
        });

        // Cerrar menú al hacer clic en un enlace (para cuando navegas en la misma página o simplemente al elegir)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll'); // Re-activar scroll
            });
        });
    }

    // --- 3. Animación de Elementos al Hacer Scroll (Fade-in / Slide-up) ---
    const faders = document.querySelectorAll('.fade-in');
    const slideUps = document.querySelectorAll('.slide-up');

    const appearOptions = {
        threshold: 0.2, // El elemento debe estar 20% visible para activar la animación
        rootMargin: "0px 0px -50px 0px" // Opcional: ajustar el margen de activación para que aparezca un poco antes de llegar al centro
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target); // Dejar de observar una vez que ha aparecido
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    slideUps.forEach(slideUp => {
        appearOnScroll.observe(slideUp);
    });

    // --- 4. Validación de Formularios (Ejemplo para Contacto.html) ---
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('mensaje');
            let isValid = true;

            // Simple validación de email (regex básico)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Por favor, introduce un email válido.');
                isValid = false;
                event.preventDefault(); // Detiene el envío del formulario
            }

            // Validar que el mensaje no esté vacío y tenga una longitud mínima
            if (messageInput.value.trim().length < 10) {
                alert('El mensaje debe tener al menos 10 caracteres.');
                isValid = false;
                event.preventDefault();
            }

            // Si el formulario es válido, se enviará (debido a action="mailto:...")
            if (isValid) {
                // Puedes añadir un mensaje de éxito o redirigir
                alert('Tu mensaje ha sido enviado. Te responderemos pronto.');
            }
        });
    }

    // --- 5. Desplazamiento Suave (Smooth Scroll) para enlaces ancla ---
    // Esto es útil si añades enlaces como <a href="#seccion-especifica">Ir a Sección</a>
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 6. Animación del FAQ (Acordeón) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.addEventListener('click', () => {
            // Cierra todos los demás FAQs si están abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Abre o cierra el FAQ clickeado
            item.classList.toggle('active');
        });
    });
});