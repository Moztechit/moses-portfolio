// Enhanced Payment Manager with Testing Features
class PaymentManager {
    constructor() {
        this.purchases = new Map();
        this.downloadLimits = 3;
        this.expiryHours = 24;
        this.testMode = true; // Enable test mode for easy testing
        this.testPayments = new Set(); // Track test payments
        
        this.init();
    }
    
    init() {
        this.initPaymentHandlers();
        this.loadPurchaseData();
        this.initSecurityMeasures();
        this.initTestFeatures();
    }
    
    initTestFeatures() {
        // Add test payment shortcuts
        this.addTestPaymentButtons();
        this.addTestPaymentConsole();
    }
    
    addTestPaymentButtons() {
        // Add test payment section to payment modal
        const paymentModal = document.getElementById('paymentModal');
        if (!paymentModal) return;
        
        const testSection = document.createElement('div');
        testSection.className = 'test-payment-section';
        testSection.innerHTML = `
            <div class="test-payment-header">
                <i class="fas fa-flask"></i>
                <span>Test Payment Mode</span>
            </div>
            <div class="test-payment-buttons">
                <button class="test-payment-btn success" data-test="success">
                    <i class="fas fa-check"></i>
                    <span>Simulate Success</span>
                </button>
                <button class="test-payment-btn fail" data-test="fail">
                    <i class="fas fa-times"></i>
                    <span>Simulate Failure</span>
                </button>
                <button class="test-payment-btn timeout" data-test="timeout">
                    <i class="fas fa-clock"></i>
                    <span>Simulate Timeout</span>
                </button>
            </div>
            <div class="test-payment-info">
                <p><strong>Test Mode Active:</strong> Use these buttons to test different payment scenarios</p>
            </div>
        `;
        
        paymentModal.querySelector('.modal-body').appendChild(testSection);
        
        // Add test button event listeners
        testSection.addEventListener('click', (e) => {
            if (e.target.closest('.test-payment-btn')) {
                const testType = e.target.closest('.test-payment-btn').dataset.test;
                this.simulateTestPayment(testType);
            }
        });
        
        // Add test styles
        this.addTestStyles();
    }
    
    addTestStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .test-payment-section {
                background: rgba(255, 193, 7, 0.1);
                border: 2px solid #ffc107;
                border-radius: 15px;
                padding: 1.5rem;
                margin-top: 2rem;
            }
            
            .test-payment-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
                color: #ffc107;
                font-weight: 600;
            }
            
            .test-payment-buttons {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .test-payment-btn {
                background: var(--bg-glass);
                border: 1px solid var(--border-glass);
                border-radius: 10px;
                padding: 1rem;
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.3s var(--transition-smooth);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
            
            .test-payment-btn:hover {
                transform: translateY(-3px);
                border-color: var(--primary-color);
            }
            
            .test-payment-btn.success:hover {
                border-color: #28a745;
                color: #28a745;
            }
            
            .test-payment-btn.fail:hover {
                border-color: #dc3545;
                color: #dc3545;
            }
            
            .test-payment-btn.timeout:hover {
                border-color: #ffc107;
                color: #ffc107;
            }
            
            .test-payment-info {
                background: rgba(255, 193, 7, 0.05);
                border-radius: 10px;
                padding: 1rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            
            .test-payment-info strong {
                color: #ffc107;
            }
            
            /* Payment Processing States */
            .payment-processing-enhanced {
                text-align: center;
                padding: 2rem;
                position: relative;
            }
            
            .processing-animation {
                width: 80px;
                height: 80px;
                margin: 0 auto 1.5rem;
                position: relative;
            }
            
            .processing-spinner-enhanced {
                width: 100%;
                height: 100%;
                border: 4px solid rgba(99, 102, 241, 0.2);
                border-top: 4px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                position: relative;
            }
            
            .processing-dots {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                gap: 0.3rem;
            }
            
            .processing-dot {
                width: 6px;
                height: 6px;
                background: var(--accent-color);
                border-radius: 50%;
                animation: dotPulse 1.5s infinite;
            }
            
            .processing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .processing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes dotPulse {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.5); }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .processing-text {
                color: var(--text-primary);
                font-size: 1.1rem;
                margin-bottom: 0.5rem;
            }
            
            .processing-subtext {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .payment-method-indicator {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(99, 102, 241, 0.1);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                margin-bottom: 1rem;
                font-size: 0.9rem;
                color: var(--primary-color);
            }
            
            .payment-method-indicator i {
                font-size: 1.1rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    simulateTestPayment(testType) {
        const paymentModal = document.getElementById('paymentModal');
        const projectId = parseInt(paymentModal.dataset.projectId);
        const project = this.getProjectById(projectId);
        
        // Show processing state
        this.showEnhancedProcessingState('Test Payment', testType);
        
        // Simulate different test scenarios
        setTimeout(() => {
            switch (testType) {
                case 'success':
                    this.completeTestPayment(project, true);
                    break;
                case 'fail':
                    this.failTestPayment('Payment was declined. Please try a different payment method.');
                    break;
                case 'timeout':
                    this.failTestPayment('Payment timed out. Please try again.');
                    break;
            }
        }, 3000);
    }
    
    showEnhancedProcessingState(method, testType = null) {
        const paymentModal = document.getElementById('paymentModal');
        const paymentMethods = paymentModal.querySelector('.payment-methods');
        
        const methodIcons = {
            stripe: 'fab fa-stripe',
            paypal: 'fab fa-paypal',
            visa: 'fab fa-cc-visa',
            mastercard: 'fab fa-cc-mastercard',
            mpesa: 'fas fa-mobile-alt',
            'Test Payment': 'fas fa-flask'
        };
        
        const methodNames = {
            stripe: 'Stripe',
            paypal: 'PayPal',
            visa: 'Visa',
            mastercard: 'Mastercard',
            mpesa: 'M-Pesa',
            'Test Payment': 'Test Payment'
        };
        
        paymentMethods.innerHTML = `
            <div class="payment-processing-enhanced">
                <div class="payment-method-indicator">
                    <i class="${methodIcons[method] || 'fas fa-credit-card'}"></i>
                    <span>${methodNames[method] || method}</span>
                </div>
                <div class="processing-animation">
                    <div class="processing-spinner-enhanced">
                        <div class="processing-dots">
                            <div class="processing-dot"></div>
                            <div class="processing-dot"></div>
                            <div class="processing-dot"></div>
                        </div>
                    </div>
                </div>
                <div class="processing-text">Processing Payment...</div>
                <div class="processing-subtext">
                    ${testType ? `Simulating ${testType} scenario` : 'Please wait while we process your payment'}
                </div>
                <div class="processing-info">
                    <small>This is a ${testType ? 'test' : 'demo'} payment - no real charges will be made</small>
                </div>
            </div>
        `;
    }
    
    completeTestPayment(project, success = true) {
        if (success) {
            // Generate secure download link
            const downloadToken = this.generateSecureToken();
            const purchaseId = this.createPurchaseRecord(project.id, downloadToken);
            
            // Show enhanced success animation
            this.showEnhancedSuccessAnimation(project);
            
            // Close modals
            this.closeModals();
            
            // Send download link (simulated)
            this.sendTestDownloadLink(project, downloadToken);
            
            // Track test payment
            this.testPayments.add(purchaseId);
            
        } else {
            this.failTestPayment('Payment processing failed.');
        }
    }
    
    showEnhancedSuccessAnimation(project) {
        // Create enhanced success modal
        const successModal = document.createElement('div');
        successModal.className = 'modal-overlay success-modal';
        successModal.id = 'successModal';
        successModal.innerHTML = `
            <div class="modal-content success-content">
                <div class="success-animation-enhanced">
                    <div class="success-icon-large">
                        <i class="fas fa-check"></i>
                    </div>
                    <h2>Purchase Successful!</h2>
                    <div class="success-details">
                        <div class="success-project">
                            <strong>Project:</strong> ${project.title}
                        </div>
                        <div class="success-price">
                            <strong>Price:</strong> ${project.price}
                        </div>
                        <div class="success-downloads">
                            <strong>Downloads:</strong> ${this.downloadLimits} remaining
                        </div>
                        <div class="success-expiry">
                            <strong>Expires:</strong> ${this.expiryHours} hours
                        </div>
                    </div>
                    <div class="success-actions">
                        <button class="btn btn-primary" onclick="window.open('#download-${Date.now()}', '_blank')">
                            <i class="fas fa-download"></i>
                            Download Now
                        </button>
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                            Close
                        </button>
                    </div>
                    <div class="success-note">
                        <small>Download link also sent to your email address</small>
                    </div>
                </div>
            </div>
        `;
        
        // Add success styles
        const style = document.createElement('style');
        style.textContent = `
            .success-modal {
                z-index: 3000;
            }
            
            .success-content {
                max-width: 500px;
                text-align: center;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-glass);
                border-radius: 20px;
                padding: 3rem 2rem;
            }
            
            .success-animation-enhanced {
                animation: successBounce 0.6s var(--transition-bounce);
            }
            
            @keyframes successBounce {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .success-icon-large {
                width: 100px;
                height: 100px;
                background: var(--gradient-primary);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 3rem;
                color: white;
                animation: successPulse 0.8s var(--transition-bounce);
            }
            
            @keyframes successPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .success-details {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 1.5rem;
                margin: 1.5rem 0;
                text-align: left;
            }
            
            .success-details > div {
                margin-bottom: 0.8rem;
                color: var(--text-secondary);
            }
            
            .success-details strong {
                color: var(--text-primary);
                display: inline-block;
                width: 100px;
            }
            
            .success-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin: 1.5rem 0;
            }
            
            .success-actions .btn {
                min-width: 120px;
            }
            
            .success-note {
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin-top: 1rem;
            }
            
            .success-details h2 {
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                font-size: 1.8rem;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(successModal);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (successModal.parentNode) {
                successModal.remove();
            }
        }, 10000);
    }
    
    sendTestDownloadLink(project, downloadToken) {
        const downloadUrl = `${window.location.origin}/download?token=${downloadToken}&test=true`;
        
        console.log(`Test download link created for ${project.title}: ${downloadUrl}`);
        console.log(`Token: ${downloadToken}`);
        
        // Show notification
        this.showTestNotification(project, downloadToken);
    }
    
    showTestNotification(project, downloadToken) {
        const notification = document.createElement('div');
        notification.className = 'test-notification';
        notification.innerHTML = `
            <div class="test-notification-content">
                <div class="test-notification-header">
                    <i class="fas fa-check-circle"></i>
                    <span>Test Purchase Complete!</span>
                </div>
                <div class="test-notification-body">
                    <strong>${project.title}</strong> purchased successfully!
                    <br>
                    <small>Token: ${downloadToken.substring(0, 8)}...</small>
                </div>
                <div class="test-notification-actions">
                    <button class="test-download-btn" onclick="handleTestDownload('${downloadToken}')">
                        <i class="fas fa-download"></i>
                        Test Download
                    </button>
                    <button class="test-close-btn" onclick="this.closest('.test-notification').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .test-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-glass);
                border-radius: 15px;
                padding: 1.5rem;
                max-width: 350px;
                z-index: 4000;
                animation: slideInRight 0.3s var(--transition-smooth);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .test-notification-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.8rem;
                color: #28a745;
                font-weight: 600;
            }
            
            .test-notification-body {
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .test-notification-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .test-download-btn {
                background: var(--gradient-primary);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.3rem;
                transition: all 0.3s var(--transition-smooth);
            }
            
            .test-download-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
            }
            
            .test-close-btn {
                background: var(--bg-glass);
                border: 1px solid var(--border-glass);
                color: var(--text-secondary);
                padding: 0.5rem;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s var(--transition-smooth);
            }
            
            .test-close-btn:hover {
                color: var(--accent-color);
                border-color: var(--accent-color);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 15000);
    }
    
    failTestPayment(message) {
        const paymentModal = document.getElementById('paymentModal');
        const paymentMethods = paymentModal.querySelector('.payment-methods');
        
        paymentMethods.innerHTML = `
            <div class="payment-error-enhanced">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h4>Payment Failed</h4>
                <p>${message}</p>
                <div class="error-actions">
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i class="fas fa-redo"></i>
                        Try Again
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            </div>
        `;
        
        // Add error styles
        const style = document.createElement('style');
        style.textContent = `
            .payment-error-enhanced {
                text-align: center;
                padding: 2rem;
                color: #dc3545;
            }
            
            .error-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                animation: errorShake 0.5s var(--transition-bounce);
            }
            
            @keyframes errorShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            .payment-error-enhanced h4 {
                color: var(--text-primary);
                margin-bottom: 0.5rem;
                font-size: 1.3rem;
            }
            
            .payment-error-enhanced p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .error-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .error-actions .btn {
                min-width: 120px;
            }
        `;
        document.head.appendChild(style);
    }
    
    addTestPaymentConsole() {
        // Add console logging for debugging
        console.log(`
            🚀 TEST PAYMENT SYSTEM ACTIVE
            
            Available Test Commands:
            ======================
            
            paymentManager.simulateTestPayment('success') - Test successful payment
            paymentManager.simulateTestPayment('fail') - Test failed payment
            paymentManager.simulateTestPayment('timeout') - Test timeout scenario
            
            paymentManager.processDownload('test_token') - Test download functionality
            paymentManager.validateDownloadToken('test_token') - Test token validation
            
            paymentManager.showTestPurchaseHistory() - Show all test purchases
            paymentManager.clearTestData() - Clear all test data
            
            📊 Current Status: Test Mode Active
            💳 Available Methods: Stripe, PayPal, Visa, Mastercard, M-Pesa
            ⏱️  Download Limits: ${this.downloadLimits} per purchase
            🕒 Expiry Time: ${this.expiryHours} hours
        `);
        
        // Make payment manager globally accessible for testing
        window.paymentManager = this;
    }
    
    // Test console commands
    showTestPurchaseHistory() {
        console.log('📊 Test Purchase History:');
        console.log('========================');
        
        if (this.testPayments.size === 0) {
            console.log('No test purchases found.');
            return;
        }
        
        this.testPayments.forEach(purchaseId => {
            console.log(`- Purchase ID: ${purchaseId}`);
        });
    }
    
    clearTestData() {
        this.testPayments.clear();
        localStorage.removeItem('purchases');
        this.purchases.clear();
        console.log('🗑️ Test data cleared successfully!');
    }
    
    // Enhanced processing state for real payments
    showProcessingState(method) {
        const paymentModal = document.getElementById('paymentModal');
        const paymentMethods = paymentModal.querySelector('.payment-methods');
        
        const methodIcons = {
            stripe: 'fab fa-stripe',
            paypal: 'fab fa-paypal',
            visa: 'fab fa-cc-visa',
            mastercard: 'fab fa-cc-mastercard',
            mpesa: 'fas fa-mobile-alt'
        };
        
        const methodNames = {
            stripe: 'Stripe',
            paypal: 'PayPal',
            visa: 'Visa',
            mastercard: 'Mastercard',
            mpesa: 'M-Pesa'
        };
        
        paymentMethods.innerHTML = `
            <div class="payment-processing-enhanced">
                <div class="payment-method-indicator">
                    <i class="${methodIcons[method] || 'fas fa-credit-card'}"></i>
                    <span>${methodNames[method] || method}</span>
                </div>
                <div class="processing-animation">
                    <div class="processing-spinner-enhanced">
                        <div class="processing-dots">
                            <div class="processing-dot"></div>
                            <div class="processing-dot"></div>
                            <div class="processing-dot"></div>
                        </div>
                    </div>
                </div>
                <div class="processing-text">Processing Payment...</div>
                <div class="processing-subtext">Please wait while we process your payment</div>
            </div>
        `;
    }
    
    // Original methods remain the same but enhanced
    processPayment(method, projectId) {
        const paymentModal = document.getElementById('paymentModal');
        const project = this.getProjectById(projectId);
        
        if (!project) {
            alert('Project not found');
            return;
        }
        
        // Show enhanced processing state
        this.showEnhancedProcessingState(method);
        
        // Simulate payment processing
        setTimeout(() => {
            // Generate secure download link
            const downloadToken = this.generateSecureToken();
            const purchaseId = this.createPurchaseRecord(project.id, downloadToken);
            
            // Show enhanced success animation
            this.showEnhancedSuccessAnimation(project);
            
            // Close modals
            this.closeModals();
            
            // Send download link
            this.sendDownloadLink(project, downloadToken);
            
        }, 2500);
    }
    
    // All other original methods remain the same...
    getProjectById(projectId) {
        const projects = [
            { id: 1, title: "E-Commerce Platform Pro", price: "$299" },
            { id: 2, title: "Real Estate Portal Elite", price: "$249" },
            { id: 3, title: "Restaurant Hub Pro", price: "$199" },
            { id: 4, title: "Portfolio Showcase Pro", price: "$179" },
            { id: 5, title: "Healthcare Portal Pro", price: "$399" },
            { id: 6, title: "Education Platform Plus", price: "$349" },
            { id: 7, title: "Travel Booking Pro", price: "$329" },
            { id: 8, title: "Fitness Tracker Pro", price: "$279" },
            { id: 9, title: "News Portal Pro", price: "$259" },
            { id: 10, title: "Event Management Pro", price: "$319" }
        ];
        
        return projects.find(p => p.id === projectId);
    }
    
    generateSecureToken() {
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
            isActive: true,
            testMode: this.testMode
        };
        
        this.purchases.set(downloadToken, purchase);
        this.savePurchaseData();
        
        return purchaseId;
    }
    
    sendDownloadLink(project, downloadToken) {
        const downloadUrl = `${window.location.origin}/download?token=${downloadToken}`;
        
        console.log(`Purchase successful for ${project.title}`);
        console.log(`Download URL: ${downloadUrl}`);
        console.log(`Token: ${downloadToken}`);
        
        // Show confirmation
        setTimeout(() => {
            alert(`Purchase successful!\n\nProject: ${project.title}\nPrice: ${project.price}\nDownloads: ${this.downloadLimits}\nExpires: ${this.expiryHours} hours\n\nDownload link sent to your email.`);
        }, 1000);
    }
    
    closeModals() {
        const projectModal = document.getElementById('projectModal');
        const paymentModal = document.getElementById('paymentModal');
        const previewModal = document.getElementById('previewModal');
        
        [projectModal, paymentModal, previewModal].forEach(modal => {
            if (modal) modal.classList.remove('active');
        });
    }
    
    initPaymentHandlers() {
        // Payment method buttons (same as before)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.payment-method')) {
                const method = e.target.closest('.payment-method').dataset.method;
                const projectId = parseInt(document.getElementById('paymentModal').dataset.projectId);
                this.processPayment(method, projectId);
            }
        });
    }
    
    initSecurityMeasures() {
        // Same security measures as before
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.download-link')) {
                e.preventDefault();
                return false;
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
                return false;
            }
        });
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
        const purchasesObj = Object.fromEntries(this.purchases);
        localStorage.setItem('purchases', JSON.stringify(purchasesObj));
    }
    
    loadPurchaseData() {
        const saved = localStorage.getItem('purchases');
        if (saved) {
            const purchasesObj = JSON.parse(saved);
            this.purchases = new Map(Object.entries(purchasesObj));
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
}

// Global function for test downloads
window.handleTestDownload = function(token) {
    const paymentManager = window.paymentManager || new PaymentManager();
    const result = paymentManager.processDownload(token);
    
    if (result.success) {
        // Simulate download
        const link = document.createElement('a');
        link.href = `#download-${token}`;
        link.download = `website-template-${token}.zip`;
        link.click();
        
        alert(`✅ Download successful!\n\nRemaining downloads: ${result.remainingDownloads}\nExpires: ${new Date(result.expiresAt).toLocaleString()}`);
    } else {
        alert(`❌ Download failed: ${result.message}`);
    }
};

// Initialize payment manager
document.addEventListener('DOMContentLoaded', () => {
    window.paymentManager = new PaymentManager();
});