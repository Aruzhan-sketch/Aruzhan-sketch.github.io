// Smooth scrolling for navigation links
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

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.experience-card, .project-card, .timeline-item, .skill-tag, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        const message = formData.get('message') || this.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:aruzhan.seidaliyeva@nu.edu.kz?subject=Message from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
        
        // Show success message
        alert('Thank you for your message! Your email client will open to send the message.');
        window.location.href = mailtoLink;
        
        // Reset form
        this.reset();
    });
}

// Add active class to navbar on scroll
window.addEventListener('scroll', () => {
    const navlinks = document.querySelectorAll('.nav-links a');
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navlinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-purple)';
        } else {
            link.style.color = '';
        }
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Mobile menu toggle (optional enhancement)
function handleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navlinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        navbar.style.position = 'sticky';
    }
}

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu();

// Add hover effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
    });
    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Language proficiency animation
document.querySelectorAll('.proficiency').forEach(bar => {
    const width = window.getComputedStyle(bar).width;
    bar.style.animation = 'fillBar 1s ease forwards';
});

// Add fill animation to CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fillBar {
        from {
            width: 0 !important;
        }
        to {
            width: 100% !important;
        }
    }
`;
document.head.appendChild(style);

console.log('Portfolio loaded successfully!');