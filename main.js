// Jake Walker Photography - Interactive Features

// DOM Elements
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const contactForm = document.querySelector('.contact-form');
const serviceTypeInput = document.getElementById('service-type');
const modalTitle = document.querySelector('.modal-title');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Service booking data
const serviceData = {
    wedding: {
        title: 'Book Wedding Photography',
        defaultBudget: '2500-5000'
    },
    corporate: {
        title: 'Book Corporate Headshots',
        defaultBudget: '1000-2500'
    },
    commercial: {
        title: 'Book Commercial Photography',
        defaultBudget: '1000-2500'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollEffects();
    initializePortfolioFilter();
    initializeMobileMenu();
    initializeFormSubmissions();
    initializeModalEvents();
    initializeSmoothScrolling();
});

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
}

// Scroll effects for header
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Portfolio filtering
function initializePortfolioFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle menu icon animation
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
}

// Booking modal functions
function openBookingModal(serviceType) {
    const service = serviceData[serviceType];
    
    if (service) {
        serviceTypeInput.value = serviceType;
        modalTitle.textContent = service.title;
        
        // Set default budget if available
        const budgetSelect = document.getElementById('budget-range');
        if (service.defaultBudget && budgetSelect) {
            budgetSelect.value = service.defaultBudget;
        }
        
        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('client-name').focus();
        }, 100);
    }
}

function closeBookingModal() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    bookingForm.reset();
}

// Modal event listeners
function initializeModalEvents() {
    // Close modal events
    document.querySelector('.modal-close').addEventListener('click', closeBookingModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal.style.display === 'block') {
            closeBookingModal();
        }
    });
}

// Form submissions
function initializeFormSubmissions() {
    // Booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSubmission(this);
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmission(this);
    });
}

function handleBookingSubmission(form) {
    const formData = new FormData(form);
    const serviceType = formData.get('service-type');
    
    // Create booking summary
    const bookingData = {
        serviceType: serviceType,
        clientName: formData.get('client-name'),
        clientEmail: formData.get('client-email'),
        clientPhone: formData.get('client-phone'),
        eventDate: formData.get('event-date'),
        location: formData.get('event-location'),
        details: formData.get('project-details'),
        budget: formData.get('budget-range')
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Request...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handler)
    setTimeout(() => {
        showBookingSuccess(bookingData);
        closeBookingModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleContactSubmission(form) {
    const formData = new FormData(form);
    
    const contactData = {
        name: formData.get('contact-name'),
        email: formData.get('contact-email'),
        subject: formData.get('contact-subject'),
        message: formData.get('contact-message')
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showContactSuccess(contactData);
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function showBookingSuccess(bookingData) {
    const serviceNames = {
        wedding: 'Wedding Photography',
        corporate: 'Corporate Headshots',
        commercial: 'Commercial Photography'
    };
    
    const serviceName = serviceNames[bookingData.serviceType] || 'Photography Service';
    
    alert(`Thank you, ${bookingData.clientName}! Your ${serviceName} booking request has been sent. I'll contact you within 24 hours at ${bookingData.clientEmail} to discuss your project details.`);
}

function showContactSuccess(contactData) {
    alert(`Thank you, ${contactData.name}! Your message has been sent successfully. I'll get back to you within 24 hours at ${contactData.email}.`);
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[^\d\+]/g, ''));
}

// Add real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#e74c3c';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '';
                hideFieldError(this);
            }
        });
    });
    
    // Phone validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#e74c3c';
                showFieldError(this, 'Please enter a valid phone number');
            } else {
                this.style.borderColor = '';
                hideFieldError(this);
            }
        });
    });
});

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Make functions globally available
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;