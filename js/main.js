// Main JavaScript functionality
class Portfolio {
    constructor() {
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 150;
        this.deletingSpeed = 100;
        this.texts = [];
        this.typingElement = null;
        this.cursorElement = null;
        
        this.init();
    }
    
    init() {
        // Initialize EmailJS
        this.initEmailJS();
        
        // Initialize typing effect
        this.initTypingEffect();
        
        // Initialize navigation
        this.initNavigation();
        
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize mouse follower
        this.initMouseFollower();
        
        // Initialize skills chart
        this.initSkillsChart();
        
        // Initialize scroll reveal
        this.initScrollReveal();
        
        // Initialize contact form
        this.initContactForm();
        
        // Initialize navbar scroll effect
        this.initNavbarScroll();
        
        // Initialize hero buttons
        this.initHeroButtons();
        
        // Initialize floating social icons
        this.initFloatingSocial();
    }
    
    initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("22OjOAoH8iUhWPwDB");
        }
    }
    
    initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        const cursorElement = document.querySelector('.typing-cursor');
        
        if (!typingElement || !cursorElement) return;
        
        this.typingElement = typingElement;
        this.cursorElement = cursorElement;
        this.texts = JSON.parse(typingElement.getAttribute('data-texts') || '[]');
        
        if (this.texts.length === 0) return;
        
        this.typeText();
    }
    
    typeText() {
        const currentText = this.texts[this.currentTextIndex];
        const displayText = currentText.substring(0, this.currentCharIndex);
        
        this.typingElement.textContent = displayText;
        
        if (this.isDeleting) {
            this.currentCharIndex--;
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                this.typingSpeed = 150;
            }
        } else {
            this.currentCharIndex++;
            if (this.currentCharIndex === currentText.length) {
                this.isDeleting = true;
                this.typingSpeed = 2000; // Pause before deleting
            }
        }
        
        const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        setTimeout(() => this.typeText(), speed);
    }
    
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Smooth scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            });
        });
        
        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Update active link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    initScrollAnimations() {
        // Intersection Observer for reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        
        // Observe elements for reveal animation
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
        
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-content');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    initMouseFollower() {
        const follower = document.querySelector('.mouse-follower');
        if (!follower) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show follower when mouse moves
            follower.style.opacity = '1';
        });
        
        function animateFollower() {
            // Smooth following with easing
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        
        // Start animation
        animateFollower();
        
        // Add hover effects
        document.querySelectorAll('a, button, .glass-card, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
            });
        });
    }
    
    initSkillsChart() {
        const canvas = document.getElementById('skillsChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Database'],
                datasets: [{
                    label: 'Skill Level',
                    data: [95, 90, 85, 80, 75, 70],
                    backgroundColor: gradient,
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#a1a1aa',
                            font: {
                                size: 14,
                                family: 'Inter'
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.3
                    }
                }
            }
        });
    }
    
    initScrollReveal() {
        // Animate skill bars when they come into view
        const skillBars = document.querySelectorAll('.skill-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const percentage = bar.getAttribute('data-percentage');
                    setTimeout(() => {
                        bar.style.width = percentage + '%';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_c91a0it', 'template_wi7f5y9', {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    message: formData.get('message'),
                    to_name: 'Moses Mwangi',
                    reply_to: formData.get('email')
                })
                .then(() => {
                    this.showSuccessMessage();
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Failed to send email:', error);
                    alert('Failed to send message. Please try again.');
                })
                .finally(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
            } else {
                alert('Email service not available. Please contact directly at +254 720 933 253');
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
    
    showSuccessMessage() {
        const successAnimation = document.getElementById('successAnimation');
        if (successAnimation) {
            successAnimation.classList.add('active');
            setTimeout(() => {
                successAnimation.classList.remove('active');
            }, 3000);
        }
    }
    
    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    initHeroButtons() {
        const ctaButton = document.querySelector('.cta-button');
        const contactButton = document.querySelector('.contact-button');
        
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                document.querySelector('#projects').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
        
        if (contactButton) {
            contactButton.addEventListener('click', () => {
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }
    
    initFloatingSocial() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach((icon, index) => {
            // Add click tracking
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = icon.classList[1]; // Get platform name
                
                // Add click animation
                icon.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 150);
                
                // Open social media link in new tab
                const urls = {
                    facebook: 'https://facebook.com/moses.mwangi',
                    twitter: 'https://twitter.com/moses_mwangi',
                    linkedin: 'https://linkedin.com/in/moses-mwangi',
                    pinterest: 'https://pinterest.com/mosesmwangi'
                };
                
                if (urls[platform]) {
                    window.open(urls[platform], '_blank');
                }
            });
            
            // Add hover sound effect (visual feedback)
            icon.addEventListener('mouseenter', () => {
                icon.style.filter = 'brightness(1.2)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.filter = 'brightness(1)';
            });
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Additional utility functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical resources
        const criticalImages = [
            'images/moses-profile.jpg',
            'images/logo.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
}