// Projects data and functionality
class ProjectsManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "Premium e-commerce solution with advanced features, payment integration, and admin dashboard.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                price: "$299",
                category: "ecommerce",
                features: [
                    "Advanced product management",
                    "Multiple payment gateways",
                    "Admin dashboard",
                    "Order tracking system",
                    "Customer analytics"
                ]
            },
            {
                id: 2,
                title: "Real Estate Portal",
                description: "Professional real estate website with property listings, search filters, and virtual tours.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
                tech: ["Vue.js", "Laravel", "MySQL", "Google Maps"],
                price: "$249",
                category: "realestate",
                features: [
                    "Property listings with filters",
                    "Virtual tour integration",
                    "Agent profiles",
                    "Mortgage calculator",
                    "Location-based search"
                ]
            },
            {
                id: 3,
                title: "Restaurant Website",
                description: "Elegant restaurant website with online reservations, menu showcase, and customer reviews.",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                tech: ["HTML5", "CSS3", "JavaScript", "PHP"],
                price: "$199",
                category: "restaurant",
                features: [
                    "Online reservation system",
                    "Interactive menu",
                    "Customer reviews",
                    "Photo gallery",
                    "Contact forms"
                ]
            },
            {
                id: 4,
                title: "Portfolio Website",
                description: "Modern portfolio website with smooth animations, project showcase, and contact integration.",
                image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
                tech: ["React", "GSAP", "Three.js", "EmailJS"],
                price: "$179",
                category: "portfolio",
                features: [
                    "Smooth animations",
                    "3D background effects",
                    "Project showcase",
                    "Contact forms",
                    "Responsive design"
                ]
            },
            {
                id: 5,
                title: "Healthcare Portal",
                description: "Comprehensive healthcare platform with appointment booking, patient records, and telemedicine.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
                tech: ["Angular", "Firebase", "WebRTC", "Stripe"],
                price: "$399",
                category: "healthcare",
                features: [
                    "Appointment booking",
                    "Patient records management",
                    "Telemedicine integration",
                    "Prescription management",
                    "Health tracking"
                ]
            },
            {
                id: 6,
                title: "Education Platform",
                description: "Interactive learning management system with course creation, student tracking, and assessments.",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
                tech: ["React", "Django", "PostgreSQL", "WebRTC"],
                price: "$349",
                category: "education",
                features: [
                    "Course creation tools",
                    "Student progress tracking",
                    "Interactive assessments",
                    "Video conferencing",
                    "Gradebook management"
                ]
            },
            {
                id: 7,
                title: "Travel Booking Site",
                description: "Complete travel booking platform with hotel reservations, flight search, and travel packages.",
                image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
                tech: ["Vue.js", "Express.js", "MongoDB", "Stripe"],
                price: "$329",
                category: "travel",
                features: [
                    "Hotel booking system",
                    "Flight search integration",
                    "Travel packages",
                    "Payment processing",
                    "Booking management"
                ]
            },
            {
                id: 8,
                title: "Fitness Tracker",
                description: "Comprehensive fitness tracking website with workout plans, nutrition tracking, and progress monitoring.",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
                tech: ["React Native", "Node.js", "MongoDB", "Chart.js"],
                price: "$279",
                category: "fitness",
                features: [
                    "Workout planning",
                    "Nutrition tracking",
                    "Progress charts",
                    "Goal setting",
                    "Social features"
                ]
            },
            {
                id: 9,
                title: "News Portal",
                description: "Professional news website with content management, user subscriptions, and advertising integration.",
                image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
                tech: ["Next.js", "Strapi", "PostgreSQL", "Google AdSense"],
                price: "$259",
                category: "news",
                features: [
                    "Content management",
                    "User subscriptions",
                    "Advertising integration",
                    "Social sharing",
                    "SEO optimization"
                ]
            },
            {
                id: 10,
                title: "Event Management",
                description: "Complete event management platform with ticketing, attendee tracking, and event analytics.",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
                tech: ["React", "Laravel", "MySQL", "Stripe"],
                price: "$319",
                category: "events",
                features: [
                    "Event ticketing",
                    "Attendee management",
                    "Payment processing",
                    "Event analytics",
                    "Check-in system"
                ]
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.initModalHandlers();
        this.initProjectHoverEffects();
    }
    
    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = this.projects.map(project => `
            <div class="project-card reveal" data-project-id="${project.id}">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-overlay">
                        <button class="btn btn-primary preview-btn" data-project-id="${project.id}">
                            <span>Preview</span>
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-price">${project.price}</div>
                    <button class="btn btn-secondary purchase-btn" data-project-id="${project.id}">
                        <span>Purchase</span>
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add CSS for overlay
        const style = document.createElement('style');
        style.textContent = `
            .project-image-container {
                position: relative;
                overflow: hidden;
                border-radius: 15px 15px 0 0;
            }
            
            .project-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: all 0.3s var(--transition-smooth);
            }
            
            .project-card:hover .project-overlay {
                opacity: 1;
            }
            
            .preview-btn {
                padding: 0.8rem 1.5rem;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    initModalHandlers() {
        // Project preview buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.preview-btn') || e.target.closest('.project-card')) {
                const projectId = parseInt(e.target.closest('[data-project-id]').dataset.projectId);
                this.openProjectModal(projectId);
            }
        });
        
        // Purchase buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.purchase-btn')) {
                const projectId = parseInt(e.target.closest('[data-project-id]').dataset.projectId);
                this.openPaymentModal(projectId);
            }
        });
        
        // Modal close buttons
        const modalClose = document.getElementById('modalClose');
        const paymentModalClose = document.getElementById('paymentModalClose');
        const projectModal = document.getElementById('projectModal');
        const paymentModal = document.getElementById('paymentModal');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                projectModal.classList.remove('active');
            });
        }
        
        if (paymentModalClose) {
            paymentModalClose.addEventListener('click', () => {
                paymentModal.classList.remove('active');
            });
        }
        
        // Close modals on overlay click
        [projectModal, paymentModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                projectModal.classList.remove('active');
                paymentModal.classList.remove('active');
            }
        });
    }
    
    openProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        const modal = document.getElementById('projectModal');
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        const modalTech = modal.querySelector('.modal-tech');
        const modalPrice = modal.querySelector('.modal-price');
        const purchaseBtn = modal.querySelector('.purchase-btn');
        
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalPrice.textContent = project.price;
        purchaseBtn.dataset.projectId = project.id;
        
        // Add tech tags
        modalTech.innerHTML = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        modal.classList.add('active');
    }
    
    openPaymentModal(projectId) {
        const paymentModal = document.getElementById('paymentModal');
        paymentModal.dataset.projectId = projectId;
        paymentModal.classList.add('active');
    }
    
    initProjectHoverEffects() {
        // 3D hover effect for project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(5deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
            
            // Mouse move effect for 3D rotation
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }
    
    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
    
    getAllProjects() {
        return this.projects;
    }
    
    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    }
}

// Initialize projects manager
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});