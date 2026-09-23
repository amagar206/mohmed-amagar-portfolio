/* ========================================================
   SCRIPT.JS - 4D Entry Button, Navigation, Card Tilt & Contact Form
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            burger.classList.toggle('toggle', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', (event) => {
            if (!burger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const enterButton = document.getElementById('enter-btn');

    if (enterButton) {
        enterButton.addEventListener('click', () => {
            if (enterButton.disabled) return;
            enterButton.disabled = true;
            enterButton.classList.add('is-entering');
            window.setTimeout(() => window.location.assign('home.html'), 450);
        });
    }

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const submitButton = contactForm.querySelector('.submit-btn');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending…';
            }
            if (formStatus) formStatus.textContent = 'Sending your message…';
        });

        if (new URLSearchParams(window.location.search).get('sent') === '1' && formStatus) {
            formStatus.textContent = 'Message sent successfully. Thank you!';
        }
    }

    const card = document.getElementById('interactive-card');

    if (card && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let pointerX = 0;
        let pointerY = 0;
        let currentX = 0;
        let currentY = 0;
        let animationFrame = null;

        const animateCard = () => {
            currentX += (pointerX - currentX) * 0.1;
            currentY += (pointerY - currentY) * 0.1;
            card.style.transform = `rotateX(${(-currentY * 15).toFixed(2)}deg) rotateY(${(currentX * 15).toFixed(2)}deg)`;

            if (Math.abs(pointerX - currentX) > 0.001 || Math.abs(pointerY - currentY) > 0.001) {
                animationFrame = window.requestAnimationFrame(animateCard);
            } else {
                animationFrame = null;
            }
        };

        const requestAnimation = () => {
            if (animationFrame === null) animationFrame = window.requestAnimationFrame(animateCard);
        };

        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            pointerX = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
            pointerY = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
            requestAnimation();
        }, { passive: true });

        card.addEventListener('pointerleave', () => {
            pointerX = 0;
            pointerY = 0;
            requestAnimation();
        });
    }
});
