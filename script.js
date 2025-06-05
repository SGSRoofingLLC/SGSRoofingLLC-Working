// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gallery functionality
const galleryImages = [
    '20230724_095628.jpg',
    '20230724_130655.jpg',
    '20230724_193025.jpg',
    '20240713_114458.jpg',
    '20240713_142205.jpg',
    'IMG_3592.JPG',
    'IMG_3634.JPG',
    'IMG_4066.JPG',
    'IMG_4111.JPG',
    'IMG_4084.JPG',
    'Roof 2024 1.jpg',
    'Roof 2024 2.jpg',
    'Roof 2024 3.jpg',
    'Roof 2024 4.jpg',
    'Roof 2024 5.jpg',
    'Roof 2024 6.jpg',
    'Roof 2024 7.jpg',
    'Roof 2024 8.jpg',
    'Roof 2024 9.jpg',
    'Roof 2024 10.jpg'
    'Roof 2024 11.jpg',
    'Roof 2024 12.jpg',
    'Roof 2024 13.jpg',
    'Roof 2024 14.jpg',
    'Roof 2024 15.jpg',
    'Roof 2024 16.jpg',
    'Roof 2024 17.jpg',
    'Roof 2024 18.jpg',
    'Roof 2024 19.jpg',
    'Roof 2024 20.jpg',
    'Roof 2024 21.jpg',
    'Roof 2024 22.jpg',
];

const galleryTitles = [
    'Professional Roofing Installation - July 2023',
    'Residential Roof Completion - July 2023',
    'Evening Project Completion - July 2023',
    'Commercial Roofing Project - July 2024',
    'Quality Workmanship - July 2024',
    'Expert Installation Work',
    'Premium Roofing Materials',
    'Detailed Craftsmanship',
    'Professional Results',
    'Quality Roofing Solutions',
    'Recent Roofing Project 2024',
    'Residential Roofing Excellence',
    'Modern Roofing Installation',
    'Quality Roof Replacement',
    'Professional Roofing Service',
    'Expert Installation Team',
    'Completed Roofing Project'
];

let currentImageIndex = 0;

// Load gallery images
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        galleryItem.innerHTML = `
            <img src="${image}" alt="${galleryTitles[index]}" loading="lazy">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openModal(index);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Modal functionality
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function openModal(index) {
    currentImageIndex = index;
    modal.style.display = 'block';
    modalImage.src = galleryImages[index];
    modalImage.alt = galleryTitles[index];
    document.body.style.overflow = 'hidden';
}

function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex];
    modalImage.alt = galleryTitles[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex];
    modalImage.alt = galleryTitles[currentImageIndex];
}

// Modal event listeners
closeModal.addEventListener('click', closeModalFunction);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunction();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closeModalFunction();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${rate}px`;
    }
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll event listeners
window.addEventListener('scroll', throttle(() => {
    handleScrollAnimations();
    handleParallax();
}, 10));

// Live chat functionality (placeholder)
function openChat() {
    showNotification('Live chat feature coming soon! Please use our contact form or call us directly.', 'info');
}

// Add click-to-call functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // For mobile devices, this will trigger the phone dialer
        // For desktop, show a notification
        if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            e.preventDefault();
            const phoneNumber = link.getAttribute('href').replace('tel:', '');
            showNotification(`Call us at ${phoneNumber}`, 'info');
        }
    });
});

// Form validation
function validateForm() {
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add real-time form validation
contactForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', validateForm);
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(231, 76, 60)') {
            input.style.borderColor = '#e0e0e0';
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Loading and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Load gallery
    loadGallery();
    
    // Initialize animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }, 100);
    
    // Add fade-in class to animated elements
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .cs-card, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Initial scroll check
    handleScrollAnimations();
    
    // Preload images
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Service worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
lazyLoadImages();

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.log('Image failed to load:', e.target.src);
    }
}, true);

// Back to top functionality
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #916d30;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 18px;
`;

document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Add your analytics tracking code here (Google Analytics, etc.)
    console.log('Event tracked:', { category, action, label });
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent);
    });
});

// Track form submissions
contactForm.addEventListener('submit', () => {
    trackEvent('Form', 'Submit', 'Contact Form');
});
