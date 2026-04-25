// ========================================
// VIEWER.JS - Image Viewer Functionality
// ========================================

// Global variables
let allImages = [];
let currentIndex = 0;

// Get image data from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const imageSrc = urlParams.get('image');
const imageAlt = urlParams.get('alt') || 'Image preview';
const imageIndex = parseInt(urlParams.get('index')) || 0;

// Function to load images from sessionStorage
function loadImages() {
    try {
        const savedImages = sessionStorage.getItem('galleryImages');
        console.log('Saved images:', savedImages); // Debug log
        
        if (savedImages) {
            allImages = JSON.parse(savedImages);
            currentIndex = parseInt(sessionStorage.getItem('currentImageIndex')) || 0;
            console.log('Loaded images:', allImages.length, 'Current index:', currentIndex); // Debug log
            return true;
        }
    } catch (e) {
        console.error('Error loading images:', e);
    }
    
    // If no saved images, create single image array from URL
    if (imageSrc) {
        allImages = [{ src: imageSrc, alt: imageAlt }];
        currentIndex = 0;
        console.log('Using single image from URL:', imageSrc); // Debug log
        return true;
    }
    
    return false;
}

// Display the current image
function displayImage() {
    const imgElement = document.getElementById('viewer-image');
    
    if (!imgElement) {
        console.error('Image element not found');
        return;
    }
    
    if (allImages.length === 0) {
        console.error('No images to display');
        imgElement.alt = 'No image available';
        document.getElementById('current-index').textContent = '0';
        document.getElementById('total-images').textContent = '0';
        return;
    }
    
    const currentImage = allImages[currentIndex];
    
    if (currentImage && currentImage.src) {
        // Add loading effect
        imgElement.classList.add('loading');
        
        // Set image source
        imgElement.src = currentImage.src;
        imgElement.alt = currentImage.alt || 'Image preview';
        
        // Update counter
        document.getElementById('current-index').textContent = currentIndex + 1;
        document.getElementById('total-images').textContent = allImages.length;
        
        // Update page title
        document.title = `${currentImage.alt} - Image Viewer`;
        
        // Remove loading effect when image loads
        imgElement.onload = function() {
            imgElement.classList.remove('loading');
            console.log('Image loaded successfully:', currentImage.src); // Debug log
        };
        
        imgElement.onerror = function() {
            imgElement.classList.remove('loading');
            console.error('Failed to load image:', currentImage.src);
            imgElement.alt = 'Failed to load image';
            imgElement.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" dy=".3em"%3EImage%20not%20found%3C/text%3E%3C/svg%3E';
        };
        
        // Update URL without reload
        const newUrl = `${window.location.pathname}?image=${encodeURIComponent(currentImage.src)}&alt=${encodeURIComponent(currentImage.alt)}&index=${currentIndex}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    } else {
        console.error('Invalid current image:', currentImage);
    }
}

// Navigate to previous image
function previousImage() {
    if (allImages.length > 1) {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        displayImage();
        // Save current index
        sessionStorage.setItem('currentImageIndex', currentIndex);
        showNotification('Previous image');
    } else {
        showNotification('Only one image available');
    }
}

// Navigate to next image
function nextImage() {
    if (allImages.length > 1) {
        currentIndex = (currentIndex + 1) % allImages.length;
        displayImage();
        // Save current index
        sessionStorage.setItem('currentImageIndex', currentIndex);
        showNotification('Next image');
    } else {
        showNotification('Only one image available');
    }
}

// Close viewer and return to projects page
function closeViewer() {
    // Clear saved data
    sessionStorage.removeItem('galleryImages');
    sessionStorage.removeItem('currentImageIndex');
    // Redirect back to projects page
    window.location.href = 'projects.html';
}

// Download current image
function downloadImage() {
    const currentImage = allImages[currentIndex];
    if (currentImage && currentImage.src) {
        // Create a temporary link to download
        const link = document.createElement('a');
        link.href = currentImage.src;
        
        // Extract filename from URL or create one
        let filename = currentImage.alt.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        filename = filename.substring(0, 50) + '.jpg';
        link.download = filename;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Image downloaded successfully!');
    } else {
        showNotification('Cannot download this image');
    }
}

// Show temporary notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.custom-notification');
    if (existingNotif) existingNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #00f3ff, #ff00e6);
        color: #000;
        padding: 10px 20px;
        border-radius: 50px;
        font-weight: bold;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
        font-size: 0.9rem;
        white-space: nowrap;
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification && notification.remove) {
            notification.remove();
        }
    }, 2000);
}

// Fullscreen functionality
function toggleFullscreen() {
    const imgElement = document.getElementById('viewer-image');
    if (!imgElement) return;
    
    if (!document.fullscreenElement) {
        imgElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
            showNotification('Fullscreen not supported');
        });
        showNotification('Fullscreen mode activated! Press ESC to exit');
    } else {
        document.exitFullscreen();
        showNotification('Exited fullscreen mode');
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            previousImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                // Don't close on ESC if not in fullscreen, just show message
                showNotification('Press ESC again or click Close to exit viewer');
            }
            break;
    }
});

// Add click event to image for fullscreen
document.addEventListener('DOMContentLoaded', function() {
    const imgElement = document.getElementById('viewer-image');
    if (imgElement) {
        imgElement.addEventListener('click', toggleFullscreen);
    }
});

// Initialize the viewer
document.addEventListener('DOMContentLoaded', function() {
    console.log('Viewer page loaded'); // Debug log
    
    if (loadImages()) {
        displayImage();
        // Preload adjacent images for smoother navigation
        preloadAdjacentImages();
    } else {
        console.error('Failed to load any images');
        document.getElementById('viewer-image').alt = 'No image available';
        document.getElementById('current-index').textContent = '0';
        document.getElementById('total-images').textContent = '0';
    }
});

// Preload next and previous images
function preloadAdjacentImages() {
    if (allImages.length > 1) {
        const nextIndex = (currentIndex + 1) % allImages.length;
        const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        
        if (allImages[nextIndex] && allImages[nextIndex].src) {
            const nextImg = new Image();
            nextImg.src = allImages[nextIndex].src;
        }
        
        if (allImages[prevIndex] && allImages[prevIndex].src) {
            const prevImg = new Image();
            prevImg.src = allImages[prevIndex].src;
        }
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement) {
        console.log('Fullscreen mode active');
    } else {
        console.log('Fullscreen mode exited');
    }
});