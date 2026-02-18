// Enhanced Projects Manager with Preview and Purchase Testing
class ProjectsManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "E-Commerce Platform Pro",
                description: "Premium online store with advanced features, multi-vendor support, and comprehensive admin dashboard.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
                price: "$299",
                category: "ecommerce",
                preview_url: "https://demo1.example.com",
                features: [
                    "Multi-vendor marketplace",
                    "Advanced product management",
                    "Real-time inventory tracking",
                    "Customer analytics dashboard",
                    "Mobile app integration"
                ],
                download_size: "45.2 MB",
                last_updated: "2024-01-15"
            },
            {
                id: 2,
                title: "Real Estate Portal Elite",
                description: "Professional property listing platform with virtual tours, agent management, and advanced search.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
                tech: ["Vue.js", "Laravel", "MySQL", "Google Maps", "WebRTC"],
                price: "$249",
                category: "realestate",
                preview_url: "https://demo2.example.com",
                features: [
                    "Virtual property tours",
                    "Agent commission system",
                    "Advanced property search",
                    "Document management",
                    "Client relationship management"
                ],
                download_size: "38.7 MB",
                last_updated: "2024-01-20"
            },
            {
                id: 3,
                title: "Restaurant Hub Pro",
                description: "Complete restaurant management system with table booking, menu management, and POS integration.",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                tech: ["Angular", "Django", "PostgreSQL", "Stripe", "Twilio"],
                price: "$199",
                category: "restaurant",
                preview_url: "https://demo3.example.com",
                features: [
                    "Table reservation system",
                    "Digital menu with QR codes",
                    "Kitchen display system",
                    "Inventory management",
                    "Customer loyalty program"
                ],
                download_size: "32.1 MB",
                last_updated: "2024-01-18"
            },
            {
                id: 4,
                title: "Portfolio Showcase Pro",
                description: "Modern portfolio website with smooth animations, project showcase, and blog integration.",
                image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
                tech: ["Next.js", "Tailwind CSS", "Framer Motion", "GraphQL", "Prismic"],
                price: "$179",
                category: "portfolio",
                preview_url: "https://demo4.example.com",
                features: [
                    "Smooth scroll animations",
                    "Project gallery with filters",
                    "Blog with CMS integration",
                    "Contact forms with validation",
                    "SEO optimization"
                ],
                download_size: "28.5 MB",
                last_updated: "2024-01-22"
            },
            {
                id: 5,
                title: "Healthcare Portal Pro",
                description: "Comprehensive healthcare platform with appointment booking, patient records, and telemedicine.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
                tech: ["React", "Node.js", "MongoDB", "WebRTC", "HIPAA"],
                price: "$399",
                category: "healthcare",
                preview_url: "https://demo5.example.com",
                features: [
                    "Appointment scheduling",
                    "Electronic health records",
                    "Telemedicine video calls",
                    "Prescription management",
                    "Insurance integration"
                ],
                download_size: "52.3 MB",
                last_updated: "2024-01-12"
            },
            {
                id: 6,
                title: "Education Platform Plus",
                description: "Advanced learning management system with course creation, assessments, and student tracking.",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
                tech: ["MERN Stack", "Socket.io", "AWS", "AI/ML", "SCORM"],
                price: "$349",
                category: "education",
                preview_url: "https://demo6.example.com",
                features: [
                    "Course authoring tools",
                    "Interactive assessments",
                    "Student progress tracking",
                    "Live virtual classrooms",
                    "AI-powered recommendations"
                ],
                download_size: "48.9 MB",
                last_updated: "2024-01-25"
            },
            {
                id: 7,
                title: "Travel Booking Pro",
                description: "Complete travel booking platform with hotel reservations, flight search, and package deals.",
                image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
                tech: ["Vue.js", "Express.js", "MongoDB", "Redis", "Amadeus API"],
                price: "$329",
                category: "travel",
                preview_url: "https://demo7.example.com",
                features: [
                    "Hotel booking engine",
                    "Flight search integration",
                    "Package deal builder",
                    "Payment processing",
                    "Booking management"
                ],
                download_size: "41.6 MB",
                last_updated: "2024-01-16"
            },
            {
                id: 8,
                title: "Fitness Tracker Pro",
                description: "Comprehensive fitness tracking platform with workout plans, nutrition tracking, and progress monitoring.",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
                tech: ["React Native", "Firebase", "TensorFlow", "HealthKit", "Google Fit"],
                price: "$279",
                category: "fitness",
                preview_url: "https://demo8.example.com",
                features: [
                    "Workout plan generator",
                    "Nutrition tracking",
                    "Progress analytics",
                    "Wearable device integration",
                    "Social challenges"
                ],
                download_size: "35.4 MB",
                last_updated: "2024-01-19"
            },
            {
                id: 9,
                title: "News Portal Pro",
                description: "Professional news website with content management, subscriptions, and advertising integration.",
                image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
                tech: ["Next.js", "Strapi", "PostgreSQL", "Algolia", "Google AdSense"],
                price: "$259",
                category: "news",
                preview_url: "https://demo9.example.com",
                features: [
                    "Content management system",
                    "Subscription management",
                    "Advanced search",
                    "Advertising integration",
                    "SEO optimization"
                ],
                download_size: "31.2 MB",
                last_updated: "2024-01-21"
            },
            {
                id: 10,
                title: "Event Management Pro",
                description: "Complete event management platform with ticketing, attendee tracking, and event analytics.",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
                tech: ["Angular", "Laravel", "MySQL", "Stripe", "Socket.io"],
                price: "$319",
                category: "events",
                preview_url: "https://demo10.example.com",
                features: [
                    "Event ticketing system",
                    "Attendee management",
                    "Check-in system",
                    "Event analytics",
                    "Mobile app integration"
                ],
                download_size: "46.8 MB",
                last_updated: "2024-01-14"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.initModalHandlers();
        this.initProjectHoverEffects();
        this.initPreviewHandlers();
        this.initPurchaseHandlers();
    }
    
    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = this.projects.map(project => `
            <div class="project-card reveal" data-project-id="${project.id}">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-overlay">
                        <div class="overlay-buttons">
                            <button class="btn btn-primary preview-btn" data-project-id="${project.id}">
                                <i class="fas fa-eye"></i>
                                <span>Live Preview</span>
                            </button>
                            <button class="btn btn-secondary purchase-btn" data-project-id="${project.id}">
                                <i class="fas fa-shopping-cart"></i>
                                <span>Purchase</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-meta">
                        <div class="project-price">${project.price}</div>
                        <div class="project-size">
                            <i class="fas fa-download"></i>
                            <span>${project.download_size}</span>
                        </div>
                    </div>
                    <div class="project-updated">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Updated: ${project.last_updated}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add enhanced styles
        this.addProjectStyles();
    }
    
    addProjectStyles() {
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
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: all 0.3s var(--transition-smooth);
                backdrop-filter: blur(5px);
            }
            
            .project-card:hover .project-overlay {
                opacity: 1;
            }
            
            .overlay-buttons {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }
            
            .preview-btn, .purchase-btn {
                padding: 0.8rem 1.5rem;
                font-size: 0.9rem;
                min-width: 140px;
                justify-content: center;
                gap: 0.5rem;
            }
            
            .preview-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
            }
            
            .purchase-btn:hover {
                transform: translateY(-2px);
                border-color: var(--accent-color);
            }
            
            .project-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .project-size {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .project-updated {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-size: 0.8rem;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-glass);
            }
            
            .project-size i, .project-updated i {
                color: var(--accent-color);
            }
            
            /* Preview Modal Styles */
            .preview-modal {
                max-width: 90vw;
                max-height: 90vh;
                width: 1200px;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-glass);
                border-radius: 20px;
                overflow: hidden;
            }
            
            .preview-header {
                padding: 1.5rem 2rem;
                border-bottom: 1px solid var(--border-glass);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .preview-title {
                font-size: 1.5rem;
                color: var(--text-primary);
                margin: 0;
            }
            
            .preview-body {
                padding: 0;
                height: 70vh;
                overflow: hidden;
            }
            
            .preview-iframe {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 0 0 20px 20px;
            }
            
            .preview-actions {
                padding: 1.5rem 2rem;
                border-top: 1px solid var(--border-glass);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .preview-features {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .preview-feature-tag {
                background: rgba(99, 102, 241, 0.2);
                color: var(--primary-color);
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .preview-purchase-btn {
                background: var(--gradient-primary);
                color: white;
                padding: 0.8rem 1.5rem;
                border-radius: 50px;
                text-decoration: none;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.3s var(--transition-smooth);
            }
            
            .preview-purchase-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
            }
            
            .preview-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s var(--transition-smooth);
            }
            
            .preview-close:hover {
                color: var(--accent-color);
                background: var(--bg-glass);
            }
        `;
        document.head.appendChild(style);
    }
    
    initPreviewHandlers() {
        // Preview button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.preview-btn')) {
                const projectId = parseInt(e.target.closest('[data-project-id]').dataset.projectId);
                this.openPreviewModal(projectId);
            }
        });
    }
    
    initPurchaseHandlers() {
        // Purchase button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.purchase-btn')) {
                const projectId = parseInt(e.target.closest('[data-project-id]').dataset.projectId);
                this.openPurchaseModal(projectId);
            }
        });
    }
    
    openPreviewModal(projectId) {
        const project = this.getProjectById(projectId);
        if (!project) return;
        
        // Create preview modal
        this.createPreviewModal(project);
    }
    
    createPreviewModal(project) {
        // Remove existing preview modal if any
        const existingModal = document.getElementById('previewModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay preview-modal" id="previewModal">
                <div class="modal-content preview-modal">
                    <div class="preview-header">
                        <h3 class="preview-title">${project.title}</h3>
                        <button class="preview-close" id="previewClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="preview-body">
                        <iframe 
                            src="${project.preview_url}" 
                            class="preview-iframe"
                            sandbox="allow-scripts allow-same-origin"
                            title="${project.title} Preview">
                        </iframe>
                    </div>
                    <div class="preview-actions">
                        <div class="preview-features">
                            ${project.features.map(feature => 
                                `<span class="preview-feature-tag">${feature}</span>`
                            ).join('')}
                        </div>
                        <button class="preview-purchase-btn" data-project-id="${project.id}">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Purchase ${project.price}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        this.initPreviewModalHandlers(project);
        
        // Show modal
        const modal = document.getElementById('previewModal');
        modal.classList.add('active');
        
        // Load preview content (simulate if demo URL doesn't exist)
        this.loadPreviewContent(project);
    }
    
    loadPreviewContent(project) {
        const iframe = document.querySelector('.preview-iframe');
        if (!iframe) return;
        
        // Since demo URLs might not exist, create a sample preview
        const sampleContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white; 
                        margin: 0;
                        padding: 2rem;
                        text-align: center;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .preview-header {
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    }
                    .preview-description {
                        font-size: 1.2rem;
                        margin-bottom: 2rem;
                        max-width: 600px;
                        line-height: 1.6;
                    }
                    .preview-features {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 1rem;
                        margin-top: 2rem;
                        width: 100%;
                        max-width: 800px;
                    }
                    .feature-card {
                        background: rgba(255,255,255,0.1);
                        backdrop-filter: blur(10px);
                        border-radius: 15px;
                        padding: 1.5rem;
                        border: 1px solid rgba(255,255,255,0.2);
                        transition: transform 0.3s ease;
                    }
                    .feature-card:hover {
                        transform: translateY(-5px);
                    }
                    .feature-title {
                        font-size: 1.1rem;
                        font-weight: bold;
                        margin-bottom: 0.5rem;
                    }
                    .tech-stack {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                        justify-content: center;
                        margin-top: 2rem;
                    }
                    .tech-tag {
                        background: rgba(255,255,255,0.2);
                        padding: 0.3rem 0.8rem;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        border: 1px solid rgba(255,255,255,0.3);
                    }
                    .notice {
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        padding: 1rem;
                        margin-top: 2rem;
                        border: 1px solid rgba(255,255,255,0.2);
                        font-size: 0.9rem;
                    }
                </style>
            </head>
            <body>
                <div class="preview-header">${project.title}</div>
                <div class="preview-description">${project.description}</div>
                <div class="preview-features">
                    ${project.features.map(feature => `
                        <div class="feature-card">
                            <div class="feature-title">${feature}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="tech-stack">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="notice">
                    <strong>Note:</strong> This is a preview simulation. The actual website will have full functionality, responsive design, and all interactive features.
                </div>
            </body>
            </html>
        `;
        
        // Create blob URL for iframe
        const blob = new Blob([sampleContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframe.src = url;
    }
    
    initPreviewModalHandlers(project) {
        // Close button
        const closeBtn = document.getElementById('previewClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closePreviewModal();
            });
        }
        
        // Purchase button in preview
        const purchaseBtn = document.querySelector('.preview-purchase-btn');
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', () => {
                this.closePreviewModal();
                this.openPurchaseModal(project.id);
            });
        }
        
        // Close on overlay click
        const modal = document.getElementById('previewModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closePreviewModal();
                }
            });
        }
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePreviewModal();
            }
        });
    }
    
    closePreviewModal() {
        const modal = document.getElementById('previewModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    openPurchaseModal(projectId) {
        const project = this.getProjectById(projectId);
        if (!project) return;
        
        // Check if already purchased
        if (window.paymentSystem && window.paymentSystem.checkPurchaseStatus(projectId)) {
            const remaining = window.paymentSystem.getRemainingDownloads(projectId);
            if (remaining > 0) {
                // Show download option instead of purchase
                this.showDownloadOption(projectId, remaining);
                return;
            }
        }
        
        // Open purchase modal through payment system
        if (window.paymentSystem) {
            window.paymentSystem.openPurchaseModal(projectId, project.title, project.price);
        } else {
            // Fallback if payment system not loaded
            console.error('Payment system not loaded');
        }
    }
    
    showDownloadOption(projectId, remainingDownloads) {
        // Create download modal
        const modalHTML = `
            <div class="modal-overlay download-modal" id="downloadModal">
                <div class="modal-content download-modal">
                    <div class="download-header">
                        <h3 class="download-title">Download Project</h3>
                        <button class="modal-close" id="downloadClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="download-body">
                        <div class="download-info">
                            <div class="download-icon">
                                <i class="fas fa-download"></i>
                            </div>
                            <p class="download-text">
                                You have already purchased this project.
                                You have <strong>${remainingDownloads}</strong> downloads remaining.
                            </p>
                            <div class="download-expiry">
                                <i class="fas fa-clock"></i>
                                <span>Downloads expire in 24 hours</span>
                            </div>
                        </div>
                    </div>
                    <div class="download-footer">
                        <button class="btn btn-secondary" id="cancelDownload">Cancel</button>
                        <button class="btn btn-primary" id="proceedDownload">
                            <i class="fas fa-download"></i>
                            Download Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addDownloadStyles();
        
        // Add event listeners
        this.initDownloadModalHandlers(projectId);
        
        // Show modal
        const modal = document.getElementById('downloadModal');
        modal.classList.add('active');
    }
    
    addDownloadStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .download-modal .modal-content {
                max-width: 500px;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-glass);
                border-radius: 20px;
                padding: 2rem;
                text-align: center;
            }
            
            .download-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-glass);
            }
            
            .download-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .download-info {
                margin-bottom: 2rem;
            }
            
            .download-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
            }
            
            .download-icon i {
                font-size: 1.5rem;
                color: white;
            }
            
            .download-text {
                color: var(--text-secondary);
                margin-bottom: 1rem;
                line-height: 1.6;
            }
            
            .download-text strong {
                color: var(--accent-color);
                font-weight: 600;
            }
            
            .download-expiry {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-size: 0.9rem;
                background: var(--bg-glass);
                padding: 0.5rem 1rem;
                border-radius: 10px;
                border: 1px solid var(--border-glass);
            }
            
            .download-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-glass);
            }
            
            .download-footer .btn {
                min-width: 120px;
            }
        `;
        document.head.appendChild(style);
    }
    
    initDownloadModalHandlers(projectId) {
        // Close handlers
        ['downloadClose', 'cancelDownload'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.closeDownloadModal();
                });
            }
        });
        
        // Proceed download
        const proceedBtn = document.getElementById('proceedDownload');
        if (proceedBtn) {
            proceedBtn.addEventListener('click', () => {
                this.closeDownloadModal();
                if (window.paymentSystem) {
                    window.paymentSystem.downloadProject();
                }
            });
        }
        
        // Close on overlay click
        const modal = document.getElementById('downloadModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeDownloadModal();
                }
            });
        }
    }
    
    closeDownloadModal() {
        const modal = document.getElementById('downloadModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
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