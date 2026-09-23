/* ========================================
   SCRIPT.JS - High-Performance Interaction
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Navigation Toggle
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    }

    // 2. High-Performance 60/120fps Mouse Tracking
    const homeImage = document.querySelector('.home-image');

    if (homeImage) {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let isTicking = false;

        window.addEventListener('mousemove', (e) => {
            // Normalize values from -1 to 1
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

            if (!isTicking) {
                window.requestAnimationFrame(updateCardPosition);
                isTicking = true;
            }
        }, { passive: true });

        function updateCardPosition() {
            // Smooth lerp interpolation for silky motion
            targetX += (mouseX - targetX) * 0.1;
            targetY += (mouseY - targetY) * 0.1;

            const rotateX = -targetY * 8; // Max 8-degree tilt
            const rotateY = targetX * 8;

            homeImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Continue animation until motion rests
            if (Math.abs(mouseX - targetX) > 0.001 || Math.abs(mouseY - targetY) > 0.001) {
                window.requestAnimationFrame(updateCardPosition);
            } else {
                isTicking = false;
            }
        }

        // Reset image angle on mouse exit
        window.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
            if (!isTicking) {
                window.requestAnimationFrame(updateCardPosition);
                isTicking = true;
            }
        });
    }
});
