// Payment system with download restrictions
class PaymentManager {
    constructor() {
        this.purchases = new Map(); // Store purchase data
        this.downloadLimits = 3; // Max downloads per purchase
        this.expiryHours = 24; // Expiry time in hours
        
        this.init();
    }
    
    init() {
        this.initPaymentHandlers();
        this.loadPurchaseData();
        this.initSecurityMeasures();
    }
    
    initPaymentHandlers() {
        // Payment method buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.payment-method')) {
                const method = e.target.closest('.payment-method').dataset.method;
                const projectId = parseInt(document.getElementById('paymentModal').dataset.projectId);
                this.processPayment(method, projectId);
            }
        });
    }
    
    async processPayment(method, projectId) {
        const paymentModal = document.getElementById('paymentModal');
        const project = this.getProjectById(projectId);
        
        if (!project) {
            alert('Project not found');
            return;
        }
        
        // Show processing state
        this.showProcessingState(method);
        
        try {
            // Simulate payment processing
            await this.simulatePayment(method, project);
            
            // Generate secure download link
            const downloadToken = this.generateSecureToken();
            const purchaseId = this.createPurchaseRecord(projectId, downloadToken);
            
            // Show success and close modals
            this.showSuccessAnimation();
            this.closeModals();
            
            // Send download link via email (simulated)
            this.sendDownloadLink(project, downloadToken);
            
        } catch (error) {
            console.error('Payment failed:', error);
            this.showErrorMessage('Payment failed. Please try again.');
        }
    }
    
    async simulatePayment(method, project) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate payment processing based on method
        const paymentConfigs = {
            stripe: { success: true, processingTime: 1500 },
            paypal: { success: true, processingTime: 2000 },
            visa: { success: true, processingTime: 1800 },
            mastercard: { success: true, processingTime: 1600 },
            mpesa: { success: true, processingTime: 2500 }
        };
        
        const config = paymentConfigs[method];
        if (!config || !config.success) {
            throw new Error('Payment processing failed');
        }
        
        // Additional processing time for M-Pesa
        if (method === 'mpesa') {
            // Simulate M-Pesa STK push
            await this.simulateMpesaStkPush(project.price);
        }
    }
    
    async simulateMpesaStkPush(amount) {
        // Simulate M-Pesa STK push notification
        console.log(`M-Pesa STK push sent for amount: ${amount}`);
        
        // Wait for user to complete payment on phone
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Simulate payment confirmation
        const isPaid = Math.random() > 0.1; // 90% success rate
        if (!isPaid) {
            throw new Error('M-Pesa payment not completed');
        }
    }
    
    generateSecureToken() {
        // Generate cryptographically secure token
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    createPurchaseRecord(projectId, downloadToken) {
        const purchaseId = 'PUR' + Date.now() + Math.random().toString(36).substr(2, 9);
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + this.expiryHours);
        
        const purchase = {
            id: purchaseId,
            projectId: projectId,
            downloadToken: downloadToken,
            downloadCount: 0,
            maxDownloads: this.downloadLimits,
            createdAt: new Date().toISOString(),
            expiresAt: expiryTime.toISOString(),
            isActive: true
        };
        
        this.purchases.set(downloadToken, purchase);
        this.savePurchaseData();
        
        return purchaseId;
    }
    
    getProjectById(projectId) {
        // This would normally come from the projects manager
        const projects = [
            { id: 1, title: "E-Commerce Platform", price: "$299" },
            { id: 2, title: "Real Estate Portal", price: "$249" },
            { id: 3, title: "Restaurant Website", price: "$199" },
            { id: 4, title: "Portfolio Website", price: "$179" },
            { id: 5, title: "Healthcare Portal", price: "$399" },
            { id: 6, title: "Education Platform", price: "$349" },
            { id: 7, title: "Travel Booking Site", price: "$329" },
            { id: 8, title: "Fitness Tracker", price: "$279" },
            { id: 9, title: "News Portal", price: "$259" },
            { id: 10, title: "Event Management", price: "$319" }
        ];
        
        return projects.find(p => p.id === projectId);
    }
    
    showProcessingState(method) {
        const paymentModal = document.getElementById('paymentModal');
        const paymentMethods = paymentModal.querySelector('.payment-methods');
        const purchaseInfo = paymentModal.querySelector('.purchase-info');
        
        // Hide payment methods and show processing state
        paymentMethods.innerHTML = `
            <div class="payment-processing">
                <div class="processing-spinner">
                    <div class="spinner"></div>
                </div>
                <h4>Processing ${this.getPaymentMethodName(method)} Payment...</h4>
                <p>Please wait while we process your payment</p>
            </div>
        `;
        
        // Add processing styles
        const style = document.createElement('style');
        style.textContent = `
            .payment-processing {
                text-align: center;
                padding: 2rem;
            }
            
            .processing-spinner {
                margin: 1rem auto;
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(99, 102, 241, 0.3);
                border-top: 4px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .payment-processing h4 {
                color: var(--text-primary);
                margin: 1rem 0 0.5rem;
            }
            
            .payment-processing p {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    getPaymentMethodName(method) {
        const names = {
            stripe: 'Stripe',
            paypal: 'PayPal',
            visa: 'Visa',
            mastercard: 'Mastercard',
            mpesa: 'M-Pesa'
        };
        return names[method] || method;
    }
    
    showSuccessAnimation() {
        const successAnimation = document.getElementById('successAnimation');
        if (successAnimation) {
            successAnimation.classList.add('active');
            setTimeout(() => {
                successAnimation.classList.remove('active');
            }, 3000);
        }
    }
    
    closeModals() {
        const projectModal = document.getElementById('projectModal');
        const paymentModal = document.getElementById('paymentModal');
        
        if (projectModal) projectModal.classList.remove('active');
        if (paymentModal) paymentModal.classList.remove('active');
    }
    
    sendDownloadLink(project, downloadToken) {
        // Simulate sending email with download link
        const downloadUrl = `${window.location.origin}/download?token=${downloadToken}`;
        
        console.log(`Download link sent for ${project.title}: ${downloadUrl}`);
        console.log(`Token: ${downloadToken}`);
        
        // Show confirmation to user
        setTimeout(() => {
            alert(`Purchase successful! Download link sent to your email.\n\nProject: ${project.title}\nPrice: ${project.price}\nDownloads: ${this.downloadLimits}\nExpires: ${this.expiryHours} hours`);
        }, 1000);
    }
    
    showErrorMessage(message) {
        alert(`Error: ${message}`);
        
        // Reset payment modal
        const paymentModal = document.getElementById('paymentModal');
        const paymentMethods = paymentModal.querySelector('.payment-methods');
        paymentMethods.innerHTML = `
            <div class="payment-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Payment Failed</h4>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    Try Again
                </button>
            </div>
        `;
        
        // Add error styles
        const style = document.createElement('style');
        style.textContent = `
            .payment-error {
                text-align: center;
                padding: 2rem;
                color: #ff6b6b;
            }
            
            .payment-error i {
                font-size: 3rem;
                margin-bottom: 1rem;
                display: block;
            }
            
            .payment-error h4 {
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }
            
            .payment-error p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    validateDownloadToken(token) {
        const purchase = this.purchases.get(token);
        
        if (!purchase) {
            return { valid: false, message: 'Invalid download token' };
        }
        
        if (!purchase.isActive) {
            return { valid: false, message: 'Download link has been deactivated' };
        }
        
        if (new Date() > new Date(purchase.expiresAt)) {
            return { valid: false, message: 'Download link has expired' };
        }
        
        if (purchase.downloadCount >= purchase.maxDownloads) {
            return { valid: false, message: 'Download limit exceeded' };
        }
        
        return { valid: true, purchase: purchase };
    }
    
    processDownload(token) {
        const validation = this.validateDownloadToken(token);
        
        if (!validation.valid) {
            return { success: false, message: validation.message };
        }
        
        const purchase = validation.purchase;
        purchase.downloadCount++;
        
        // Deactivate if download limit reached
        if (purchase.downloadCount >= purchase.maxDownloads) {
            purchase.isActive = false;
        }
        
        this.savePurchaseData();
        
        return {
            success: true,
            remainingDownloads: purchase.maxDownloads - purchase.downloadCount,
            expiresAt: purchase.expiresAt
        };
    }
    
    savePurchaseData() {
        // Convert Map to object for localStorage
        const purchasesObj = Object.fromEntries(this.purchases);
        localStorage.setItem('purchases', JSON.stringify(purchasesObj));
    }
    
    loadPurchaseData() {
        const saved = localStorage.getItem('purchases');
        if (saved) {
            const purchasesObj = JSON.parse(saved);
            this.purchases = new Map(Object.entries(purchasesObj));
            
            // Clean up expired purchases
            this.cleanupExpiredPurchases();
        }
    }
    
    cleanupExpiredPurchases() {
        const now = new Date();
        for (const [token, purchase] of this.purchases) {
            if (new Date(purchase.expiresAt) < now) {
                purchase.isActive = false;
            }
        }
        this.savePurchaseData();
    }
    
    initSecurityMeasures() {
        // Prevent right-click on download links
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.download-link')) {
                e.preventDefault();
                return false;
            }
        });
        
        // Prevent F12 and developer tools
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
                return false;
            }
        });
        
        // Add watermark to preview images
        this.addWatermarkProtection();
    }
    
    addWatermarkProtection() {
        const style = document.createElement('style');
        style.textContent = `
            .project-image {
                position: relative;
            }
            
            .project-image::after {
                content: 'PREVIEW';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 0.5rem 2rem;
                font-size: 1.2rem;
                font-weight: bold;
                pointer-events: none;
                z-index: 1;
            }
            
            .project-card:hover .project-image::after {
                opacity: 0.5;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize payment manager
document.addEventListener('DOMContentLoaded', () => {
    new PaymentManager();
});

// Download functionality (would be handled by backend in real implementation)
function handleDownload(token) {
    const paymentManager = new PaymentManager();
    const result = paymentManager.processDownload(token);
    
    if (result.success) {
        // Create download link (simulated)
        const link = document.createElement('a');
        link.href = `#download-${token}`;
        link.download = `website-template-${token}.zip`;
        link.click();
        
        alert(`Download started!\nRemaining downloads: ${result.remainingDownloads}\nExpires: ${new Date(result.expiresAt).toLocaleString()}`);
    } else {
        alert(`Download failed: ${result.message}`);
    }
}