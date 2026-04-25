// ========================================
// SCRIPT.JS - Interactive Features
// ========================================

// Burger menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Active link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ========================================
// OPEN IMAGES IN NEW WINDOW
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all images from project cards
    const allImages = document.querySelectorAll('.img-container img');
    
    console.log('Found images to make clickable:', allImages.length);
    
    // Add click event to each image to open in new window
    allImages.forEach((img, index) => {
        // Make sure image has a src
        if (img.src && img.src !== '') {
            // Add cursor pointer style
            img.style.cursor = 'pointer';
            img.style.transition = 'all 0.3s';
            
            // Add title attribute to show tooltip
            img.title = 'Click to view full size in new window';
            
            // Add click event
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Open image in new window
                const newWindow = window.open();
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${this.alt || 'Image Viewer'} - AMAGAR MOHMED</title>
                        <meta charset="UTF-8">
                        <style>
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            
                            body {
                                background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2f 50%, #16213e 100%);
                                min-height: 100vh;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                position: relative;
                                overflow: hidden;
                            }
                            
                            /* Animated background */
                            body::before {
                                content: '';
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-image: 
                                    radial-gradient(circle at 20% 30%, rgba(0, 243, 255, 0.15) 0%, transparent 30%),
                                    radial-gradient(circle at 80% 70%, rgba(255, 0, 230, 0.15) 0%, transparent 35%);
                                pointer-events: none;
                                animation: particleFloat 20s ease-in-out infinite alternate;
                            }
                            
                            @keyframes particleFloat {
                                0% { transform: scale(1); opacity: 0.5; }
                                100% { transform: scale(1.1); opacity: 1; }
                            }
                            
                            .image-container {
                                max-width: 90vw;
                                max-height: 90vh;
                                text-align: center;
                                animation: fadeIn 0.5s ease-out;
                                position: relative;
                                z-index: 10;
                            }
                            
                            @keyframes fadeIn {
                                from { opacity: 0; transform: scale(0.95); }
                                to { opacity: 1; transform: scale(1); }
                            }
                            
                            .image-container img {
                                max-width: 90vw;
                                max-height: 80vh;
                                object-fit: contain;
                                border-radius: 20px;
                                border: 3px solid #00f3ff;
                                box-shadow: 0 0 50px rgba(0, 243, 255, 0.5);
                                transition: all 0.3s;
                                cursor: pointer;
                            }
                            
                            .image-container img:hover {
                                transform: scale(1.02);
                                box-shadow: 0 0 80px rgba(0, 243, 255, 0.8);
                            }
                            
                            .info-panel {
                                position: fixed;
                                bottom: 20px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: rgba(0, 0, 0, 0.8);
                                backdrop-filter: blur(10px);
                                padding: 15px 25px;
                                border-radius: 50px;
                                border: 1px solid rgba(0, 243, 255, 0.3);
                                text-align: center;
                                z-index: 20;
                                animation: slideUp 0.6s ease-out;
                            }
                            
                            @keyframes slideUp {
                                from { opacity: 0; transform: translateX(-50%) translateY(30px); }
                                to { opacity: 1; transform: translateX(-50%) translateY(0); }
                            }
                            
                            .info-panel p {
                                color: #00f3ff;
                                margin: 5px 0;
                                font-size: 14px;
                            }
                            
                            .info-panel .title {
                                font-size: 16px;
                                font-weight: bold;
                                margin-bottom: 8px;
                            }
                            
                            .info-panel .instruction {
                                color: #ff00e6;
                                font-size: 12px;
                            }
                            
                            .close-btn {
                                position: fixed;
                                top: 20px;
                                right: 20px;
                                background: linear-gradient(135deg, rgba(255, 0, 230, 0.2), rgba(0, 243, 255, 0.2));
                                backdrop-filter: blur(10px);
                                border: 1px solid #00f3ff;
                                color: #fff;
                                padding: 10px 20px;
                                border-radius: 30px;
                                cursor: pointer;
                                transition: all 0.3s;
                                font-size: 14px;
                                font-weight: bold;
                                z-index: 20;
                            }
                            
                            .close-btn:hover {
                                background: linear-gradient(135deg, #ff00e6, #00f3ff);
                                color: #000;
                                transform: translateY(-2px);
                                box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
                            }
                            
                            .download-btn {
                                position: fixed;
                                bottom: 20px;
                                left: 20px;
                                background: rgba(0, 243, 255, 0.2);
                                backdrop-filter: blur(10px);
                                border: 1px solid #00f3ff;
                                color: #00f3ff;
                                padding: 10px 20px;
                                border-radius: 30px;
                                cursor: pointer;
                                transition: all 0.3s;
                                font-size: 14px;
                                font-weight: bold;
                                z-index: 20;
                            }
                            
                            .download-btn:hover {
                                background: #00f3ff;
                                color: #000;
                                transform: translateY(-2px);
                                box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
                            }
                            
                            @media (max-width: 768px) {
                                .info-panel { padding: 10px 15px; }
                                .info-panel p { font-size: 10px; }
                                .info-panel .title { font-size: 12px; }
                                .close-btn, .download-btn { padding: 6px 12px; font-size: 10px; }
                            }
                        </style>
                    </head>
                    <body>
                        <button class="close-btn" onclick="window.close()">✕ Close Window</button>
                        <button class="download-btn" onclick="downloadImage()">📥 Download Image</button>
                        
                        <div class="image-container">
                            <img src="${this.src}" alt="${this.alt}" id="mainImage" onclick="toggleFullscreen(this)">
                        </div>
                        
                        <div class="info-panel">
                            <p class="title">💡 ${this.alt || 'Image Preview'}</p>
                            <p>🖱️ Click on image = Full Screen Mode</p>
                            <p class="instruction">⌨️ Press ESC to exit full screen | Click Close to return</p>
                        </div>
                        
                        <script>
                            function toggleFullscreen(element) {
                                if (!document.fullscreenElement) {
                                    element.requestFullscreen().catch(err => {
                                        console.error('Error:', err);
                                    });
                                } else {
                                    document.exitFullscreen();
                                }
                            }
                            
                            function downloadImage() {
                                const link = document.createElement('a');
                                link.href = '${this.src}';
                                link.download = '${this.alt || 'image'}'.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                
                                // Show notification
                                const notif = document.createElement('div');
                                notif.textContent = '✓ Image downloaded!';
                                notif.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#00f3ff;color:#000;padding:8px16px;border-radius:20px;z-index:1000;animation:fadeOut 2s';
                                document.body.appendChild(notif);
                                setTimeout(() => notif.remove(), 2000);
                            }
                            
                            // Keyboard shortcuts
                            document.addEventListener('keydown', function(e) {
                                if (e.key === 'Escape' && document.fullscreenElement) {
                                    document.exitFullscreen();
                                }
                            });
                        </script>
                    </body>
                    </html>
                `);
                newWindow.document.close();
            });
            
            // Add hover effect
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.5)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.3)';
            });
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-text-card, .about-card, .contact-wrapper');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
};

animateOnScroll();

// 3D Parallax effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-text-card, .about-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach(card => {
        const rotateX = (mouseY - 0.5) * 5;
        const rotateY = (mouseX - 0.5) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
});

document.querySelector('body').addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.project-text-card, .about-card');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});