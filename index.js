// ===== NAVIGATION TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle functionality
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.backgroundColor = 'rgba(10, 10, 15, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // Initialize particles.js for space background
    initParticles();
    
    // Form submission (for contact form)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // For GitHub Pages, you might want to use a service like Formspree
            alert('Thank you for your message! This form functionality requires backend integration. Please connect a form service like Formspree or Netlify Forms to make it work.');
            contactForm.reset();
        });
    }
    
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project__card');
    if (projectCards.length > 0) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const projectObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            projectObserver.observe(card);
        });
    }

    // Ensure iframes are properly loaded
    adjustIframeHeights();
});

// Initialize particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles')) {
        particlesJS('particles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#ffffff", "#e62b4a", "#8c14fc"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#e62b4a",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Function to adjust iframe heights
function adjustIframeHeights() {
    // Special handling for Expo Snack
    const expoContainers = document.querySelectorAll('.project__iframe--expo div');
    expoContainers.forEach(container => {
        if (container.hasAttribute('data-snack-id')) {
            // Ensure inline styles don't override CSS
            container.style.removeProperty('height');
            // Set !important for width and height
            container.setAttribute('style', 'width: 100% !important; height: 100% !important; overflow: hidden; background: #212121; border-radius: 8px;');
        }
    });
    
    // Handle p5.js iframes
    const p5Iframes = document.querySelectorAll('.project__iframe--p5js iframe');
    p5Iframes.forEach(iframe => {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
    });
}

// Add a resize event listener to adjust iframe sizes when window size changes
window.addEventListener('resize', adjustIframeHeights);