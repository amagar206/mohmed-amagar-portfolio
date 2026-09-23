/* ========================================================
   SCRIPT.JS - High Performance 3D Tilt & Navigation
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer Toggle
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    }

    // 2. High-Performance 60/120fps Smooth 3D Card Tilt
    const card = document.getElementById('interactive-card');

    if (card) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let isMoving = false;

        window.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            // Normalized distance (-1 to 1) relative to screen center
            mouseX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
            mouseY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

            if (!isMoving) {
                window.requestAnimationFrame(animateCard);
                isMoving = true;
            }
        }, { passive: true });

        function animateCard() {
            // Smooth lerp interpolation
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            const rotateX = -currentY * 15; // Max 15 degree pitch
            const rotateY = currentX * 15;  // Max 15 degree yaw

            card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

            if (Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
                window.requestAnimationFrame(animateCard);
            } else {
                isMoving = false;
            }
        }

        // Return to flat position when cursor leaves window
        window.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
            if (!isMoving) {
                window.requestAnimationFrame(animateCard);
                isMoving = true;
            }
        });
    }
});
