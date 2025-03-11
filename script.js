document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling para los enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo si el enlace apunta a un elemento en la página
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar el menú móvil si está abierto
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Preparar los datos para enviar por email
            const templateParams = {
                from_name: formValues.name,
                from_email: formValues.email,
                from_phone: formValues.phone || 'No proporcionado',
                message: formValues.message,
                to_email: 'streamlitapps@gmail.com'
            };
            
            // Mostrar mensaje de carga
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Enviar el email usando EmailJS
            emailjs.send('service_id', 'template_id', templateParams, 'user_id')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.');
                    contactForm.reset();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Lo sentimos, hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos directamente por email.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Animación de elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .feature, .client-type, .featured-service, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Ejecutar la animación al cargar la página
    animateOnScroll();
    
    // Ejecutar la animación al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
});