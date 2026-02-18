// Payment System with Test Mode and Purchase Limits
class PaymentSystem {
    constructor() {
        this.STRIPE_PUBLIC_KEY = 'pk_test_1234567890'; // Test key - replace with real key
        this.isTestMode = true; // Set to false for production
        this.purchaseHistory = this.loadPurchaseHistory();
        this.downloadLimits = {
            maxDownloadsPerPurchase: 3,
            downloadExpiryHours: 24
        };
        this.init();
    }
    
    init() {
        this.initPaymentHandlers();
        this.initDownloadHandlers();
        this.createPaymentModal();
        this.createSuccessModal();
    }
    
    createPaymentModal() {
        const modalHTML = `
            <div class="modal-overlay payment-modal" id="paymentModal">
                <div class="modal-content payment-modal">
                    <div class="payment-header">
                        <h3 class="payment-title">Complete Your Purchase</h3>
                        <button class="modal-close" id="paymentClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="payment-body">
                        <div class="purchase-summary" id="purchaseSummary">
                            <!-- Summary will be populated dynamically -->
                        </div>
                        
                        <div class="payment-methods">
                            <h4>Choose Payment Method</h4>
                            <div class="payment-methods-grid">
                                <div class="payment-method" data-method="stripe">
                                    <div class="payment-icon">
                                        <i class="fab fa-stripe"></i>
                                    </div>
                                    <div class="payment-name">Credit/Debit Card</div>
                                    <div class="payment-subtitle">via Stripe</div>
                                </div>
                                <div class="payment-method" data-method="paypal">
                                    <div class="payment-icon">
                                        <i class="fab fa-paypal"></i>
                                    </div>
                                    <div class="payment-name">PayPal</div>
                                    <div class="payment-subtitle">Fast & Secure</div>
                                </div>
                                <div class="payment-method" data-method="mpesa">
                                    <div class="payment-icon">
                                        <i class="fas fa-mobile-alt"></i>
                                    </div>
                                    <div class="payment-name">M-Pesa</div>
                                    <div class="payment-subtitle">Lipa na M-Pesa</div>
                                </div>
                                <div class="payment-method" data-method="visa">
                                    <div class="payment-icon">
                                        <i class="fab fa-cc-visa"></i>
                                    </div>
                                    <div class="payment-name">Visa</div>
                                    <div class="payment-subtitle">Secure Payment</div>
                                </div>
                                <div class="payment-method" data-method="mastercard">
                                    <div class="payment-icon">
                                        <i class="fab fa-cc-mastercard"></i>
                                    </div>
                                    <div class="payment-name">Mastercard</div>
                                    <div class="payment-subtitle">Global Payment</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="payment-form" id="paymentForm">
                            <!-- Payment form will be populated based on selected method -->
                        </div>
                        
                        <div class="payment-security">
                            <div class="security-notice">
                                <i class="fas fa-lock"></i>
                                <span>Your payment information is encrypted and secure</span>
                            </div>
                        </div>
                    </div>
                    <div class="payment-footer">
                        <button class="btn btn-secondary" id="cancelPayment">Cancel</button>
                        <button class="btn btn-primary" id="completePurchase" disabled>
                            Complete Purchase
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addPaymentStyles();
    }
    
    createSuccessModal() {
        const modalHTML = `
            <div class="modal-overlay success-modal" id="successModal">
                <div class="modal-content success-modal">
                    <div class="success-animation">
                        <div class="success-icon">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                    <h3 class="success-title">Purchase Successful!</h3>
                    <p class="success-message">
                        Thank you for your purchase. You can now download your project.
                        You have <span id="downloadCount">3</span> downloads remaining.
                    </p>
                    <div class="success-details">
                        <div class="download-info">
                            <i class="fas fa-info-circle"></i>
                            <span>Downloads expire in 24 hours</span>
                        </div>
                    </div>
                    <div class="success-actions">
                        <button class="btn btn-primary" id="downloadNow">
                            <i class="fas fa-download"></i>
                            Download Now
                        </button>
                        <button class="btn btn-secondary" id="closeSuccess">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addSuccessStyles();
    }
    
    addPaymentStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .payment-modal .modal-content {
                max-width: 600px;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-glass);
                border-radius: 20px;
                padding: 2rem;
            }
            
            .payment-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-glass);
            }
            
            .payment-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .purchase-summary {
                background: var(--bg-glass);
                border-radius: 15px;
                padding: 1.5rem;
                margin-bottom: 2rem;
                border: 1px solid var(--border-glass);
            }
            
            .purchase-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .purchase-item:last-child {
                margin-bottom: 0;
                padding-top: 1rem;
                border-top: 1px solid var(--border-glass);
                font-weight: 600;
                font-size: 1.1rem;
            }
            
            .payment-methods {
                margin-bottom: 2rem;
            }
            
            .payment-methods h4 {
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .payment-methods-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
            }
            
            .payment-method {
                background: var(--bg-glass);
                border: 2px solid var(--border-glass);
                border-radius: 15px;
                padding: 1.5rem 1rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s var(--transition-smooth);
                position: relative;
                overflow: hidden;
            }
            
            .payment-method:hover {
                border-color: var(--accent-color);
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
            }
            
            .payment-method.active {
                border-color: var(--accent-color);
                background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
                color: white;
            }
            
            .payment-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .payment-name {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .payment-subtitle {
                font-size: 0.8rem;
                opacity: 0.8;
            }
            
            .payment-form {
                margin-bottom: 2rem;
                min-height: 200px;
            }
            
            .payment-security {
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .security-notice {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            
            .payment-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-glass);
            }
            
            .test-mode-notice {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                color: #1a1a1a;
                padding: 1rem;
                border-radius: 10px;
                margin-bottom: 1rem;
                text-align: center;
                font-weight: 600;
            }
            
            /* Payment Form Styles */
            .payment-input-group {
                margin-bottom: 1.5rem;
            }
            
            .payment-label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-primary);
                font-weight: 500;
            }
            
            .payment-input {
                width: 100%;
                padding: 1rem;
                background: var(--bg-glass);
                border: 1px solid var(--border-glass);
                border-radius: 10px;
                color: var(--text-primary);
                font-size: 1rem;
                transition: all 0.3s var(--transition-smooth);
            }
            
            .payment-input:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            }
            
            .payment-input::placeholder {
                color: var(--text-secondary);
            }
            
            .payment-row {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 1rem;
            }
            
            .mpesa-instructions {
                background: var(--bg-glass);
                border-radius: 10px;
                padding: 1.5rem;
                margin-bottom: 1rem;
                border: 1px solid var(--border-glass);
            }
            
            .mpesa-instructions h5 {
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .mpesa-steps {
                list-style: none;
                padding: 0;
            }
            
            .mpesa-steps li {
                margin-bottom: 0.5rem;
                padding-left: 1.5rem;
                position: relative;
            }
            
            .mpesa-steps li:before {
                content: counter(step-counter);
                counter-increment: step-counter;
                position: absolute;
                left: 0;
                top: 0;
                background: var(--accent-color);
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .mpesa-steps {
                counter-reset: step-counter;
            }
        `;
        document.head.appendChild(style);
    }
    
    addSuccessStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .success-modal .modal-content {
                max-width: 500px;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-glass);
                border-radius: 20px;
                padding: 3rem 2rem;
                text-align: center;
            }
            
            .success-animation {
                margin-bottom: 2rem;
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #10b981, #059669);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                animation: successBounce 0.6s ease-out;
            }
            
            .success-icon i {
                font-size: 2rem;
                color: white;
            }
            
            @keyframes successBounce {
                0% { transform: scale(0); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .success-title {
                font-size: 1.8rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }
            
            .success-message {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .success-message span {
                color: var(--accent-color);
                font-weight: 600;
            }
            
            .success-details {
                background: var(--bg-glass);
                border-radius: 15px;
                padding: 1.5rem;
                margin-bottom: 2rem;
                border: 1px solid var(--border-glass);
            }
            
            .download-info {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .success-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .success-actions .btn {
                min-width: 120px;
            }
        `;
        document.head.appendChild(style);
    }
    
    initPaymentHandlers() {
        // Payment method selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.payment-method')) {
                const method = e.target.closest('.payment-method').dataset.method;
                this.selectPaymentMethod(method);
            }
        });
        
        // Complete purchase button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'completePurchase') {
                this.processPayment();
            }
        });
        
        // Cancel payment
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cancelPayment' || e.target.id === 'paymentClose') {
                this.closePaymentModal();
            }
        });
        
        // Close on overlay click
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('paymentModal');
            if (e.target === modal) {
                this.closePaymentModal();
            }
        });
        
        // Success modal handlers
        document.addEventListener('click', (e) => {
            if (e.target.id === 'downloadNow') {
                this.downloadProject();
            }
            if (e.target.id === 'closeSuccess') {
                this.closeSuccessModal();
            }
        });
    }
    
    initDownloadHandlers() {
        // Download button handlers will be added when projects are rendered
    }
    
    selectPaymentMethod(method) {
        // Remove active class from all methods
        document.querySelectorAll('.payment-method').forEach(el => {
            el.classList.remove('active');
        });
        
        // Add active class to selected method
        document.querySelector(`[data-method="${method}"]`).classList.add('active');
        
        // Generate payment form
        this.generatePaymentForm(method);
        
        // Enable complete purchase button
        document.getElementById('completePurchase').disabled = false;
    }
    
    generatePaymentForm(method) {
        const formContainer = document.getElementById('paymentForm');
        let formHTML = '';
        
        switch (method) {
            case 'stripe':
            case 'visa':
            case 'mastercard':
                formHTML = `
                    <div class="payment-row">
                        <div class="payment-input-group" style="grid-column: 1 / -1;">
                            <label class="payment-label">Card Number</label>
                            <input type="text" class="payment-input" placeholder="1234 5678 9012 3456" maxlength="19">
                        </div>
                    </div>
                    <div class="payment-row">
                        <div class="payment-input-group">
                            <label class="payment-label">Expiry Date</label>
                            <input type="text" class="payment-input" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="payment-input-group">
                            <label class="payment-label">CVV</label>
                            <input type="text" class="payment-input" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <div class="payment-input-group">
                        <label class="payment-label">Cardholder Name</label>
                        <input type="text" class="payment-input" placeholder="John Doe">
                    </div>
                `;
                break;
            case 'paypal':
                formHTML = `
                    <div class="payment-input-group">
                        <label class="payment-label">PayPal Email</label>
                        <input type="email" class="payment-input" placeholder="your@email.com">
                    </div>
                    <div class="payment-input-group">
                        <label class="payment-label">Password</label>
                        <input type="password" class="payment-input" placeholder="Your PayPal password">
                    </div>
                    <div class="payment-info">
                        <small style="color: var(--text-secondary);">
                            You'll be redirected to PayPal to complete the payment securely.
                        </small>
                    </div>
                `;
                break;
            case 'mpesa':
                formHTML = `
                    <div class="mpesa-instructions">
                        <h5>How to pay with M-Pesa</h5>
                        <ol class="mpesa-steps">
                            <li>Go to M-Pesa menu on your phone</li>
                            <li>Select Lipa na M-Pesa</li>
                            <li>Select Pay Bill</li>
                            <li>Enter Business No: <strong>123456</strong></li>
                            <li>Enter Account No: <strong id="mpesaAccount">PROJECT${Math.random().toString(36).substr(2, 9).toUpperCase()}</strong></li>
                            <li>Enter Amount: <strong id="mpesaAmount"></strong></li>
                            <li>Enter your M-Pesa PIN and send</li>
                        </ol>
                    </div>
                    <div class="payment-input-group">
                        <label class="payment-label">Your M-Pesa Number (for confirmation)</label>
                        <input type="tel" class="payment-input" placeholder="07XX XXX XXX" maxlength="10">
                    </div>
                `;
                break;
        }
        
        formContainer.innerHTML = formHTML;
        
        // Add test mode notice if in test mode
        if (this.isTestMode) {
            const notice = document.createElement('div');
            notice.className = 'test-mode-notice';
            notice.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <strong>Test Mode:</strong> Use test credentials to simulate payment
            `;
            formContainer.insertBefore(notice, formContainer.firstChild);
        }
    }
    
    processPayment() {
        const selectedMethod = document.querySelector('.payment-method.active');
        if (!selectedMethod) {
            this.showNotification('Please select a payment method', 'error');
            return;
        }
        
        const method = selectedMethod.dataset.method;
        const projectId = document.getElementById('paymentModal').dataset.projectId;
        
        // Simulate payment processing
        this.simulatePayment(method, projectId);
    }
    
    async simulatePayment(method, projectId) {
        // Show loading state
        const completeBtn = document.getElementById('completePurchase');
        const originalText = completeBtn.innerHTML;
        completeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        completeBtn.disabled = true;
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate payment success
            const purchaseId = this.generatePurchaseId();
            const purchaseData = {
                id: purchaseId,
                projectId: parseInt(projectId),
                method: method,
                timestamp: Date.now(),
                downloadsRemaining: this.downloadLimits.maxDownloadsPerPurchase,
                expiryTime: Date.now() + (this.downloadLimits.downloadExpiryHours * 60 * 60 * 1000)
            };
            
            // Save purchase
            this.savePurchase(purchaseData);
            
            // Show success
            this.closePaymentModal();
            this.showSuccessModal(purchaseData);
            
            // Log for testing
            console.log('Purchase successful:', purchaseData);
            
        } catch (error) {
            console.error('Payment failed:', error);
            this.showNotification('Payment failed. Please try again.', 'error');
        } finally {
            completeBtn.innerHTML = originalText;
            completeBtn.disabled = false;
        }
    }
    
    showSuccessModal(purchaseData) {
        const modal = document.getElementById('successModal');
        const downloadCount = document.getElementById('downloadCount');
        
        downloadCount.textContent = purchaseData.downloadsRemaining;
        modal.classList.add('active');
        
        // Add success sound (optional)
        this.playSuccessSound();
    }
    
    downloadProject() {
        const projectId = parseInt(document.getElementById('paymentModal').dataset.projectId);
        const purchase = this.getValidPurchase(projectId);
        
        if (!purchase) {
            this.showNotification('No valid purchase found. Please purchase first.', 'error');
            return;
        }
        
        if (purchase.downloadsRemaining <= 0) {
            this.showNotification('Download limit exceeded. Please purchase again.', 'error');
            return;
        }
        
        if (Date.now() > purchase.expiryTime) {
            this.showNotification('Download link has expired. Please purchase again.', 'error');
            this.removePurchase(purchase.id);
            return;
        }
        
        // Simulate download
        this.simulateDownload(projectId, purchase);
    }
    
    simulateDownload(projectId, purchase) {
        // Update download count
        purchase.downloadsRemaining--;
        this.updatePurchase(purchase);
        
        // Create download URL (simulate)
        const downloadUrl = this.generateDownloadUrl(projectId);
        
        // Create temporary download link
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `project-${projectId}-template.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        this.showNotification('Download started successfully!', 'success');
        
        // Update UI
        this.updateDownloadButtons(projectId, purchase.downloadsRemaining);
        
        // Close success modal
        this.closeSuccessModal();
        
        console.log(`Downloaded project ${projectId}. Remaining downloads: ${purchase.downloadsRemaining}`);
    }
    
    generateDownloadUrl(projectId) {
        // In a real implementation, this would generate a secure, time-limited URL
        // For testing, we'll create a blob with sample content
        const sampleContent = `Project ${projectId} Template Files\n\nThis is a sample download for testing purposes.\nIn a real implementation, this would contain the actual project files.\n\nDownloaded on: ${new Date().toISOString()}\nRemaining downloads: Check your purchase history`;
        
        const blob = new Blob([sampleContent], { type: 'application/zip' });
        return URL.createObjectURL(blob);
    }
    
    updateDownloadButtons(projectId, remainingDownloads) {
        const downloadBtns = document.querySelectorAll(`[data-project-id="${projectId}"] .download-btn`);
        downloadBtns.forEach(btn => {
            const countSpan = btn.querySelector('.download-count');
            if (countSpan) {
                countSpan.textContent = remainingDownloads;
            }
            
            if (remainingDownloads <= 0) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-lock"></i> Downloads Exhausted';
                btn.classList.add('disabled');
            }
        });
    }
    
    // Purchase management
    loadPurchaseHistory() {
        const history = localStorage.getItem('purchaseHistory');
        return history ? JSON.parse(history) : [];
    }
    
    savePurchase(purchaseData) {
        this.purchaseHistory.push(purchaseData);
        localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory));
    }
    
    updatePurchase(updatedPurchase) {
        const index = this.purchaseHistory.findIndex(p => p.id === updatedPurchase.id);
        if (index !== -1) {
            this.purchaseHistory[index] = updatedPurchase;
            localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory));
        }
    }
    
    removePurchase(purchaseId) {
        this.purchaseHistory = this.purchaseHistory.filter(p => p.id !== purchaseId);
        localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory));
    }
    
    getValidPurchase(projectId) {
        const now = Date.now();
        return this.purchaseHistory.find(p => 
            p.projectId === projectId && 
            p.downloadsRemaining > 0 && 
            now < p.expiryTime
        );
    }
    
    // Utility methods
    generatePurchaseId() {
        return 'PURCHASE_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    closePaymentModal() {
        const modal = document.getElementById('paymentModal');
        modal.classList.remove('active');
    }
    
    closeSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('active');
    }
    
    playSuccessSound() {
        // Create a simple success sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Could not play success sound:', error);
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Public methods for external use
    openPurchaseModal(projectId, projectTitle, projectPrice) {
        const modal = document.getElementById('paymentModal');
        const summary = document.getElementById('purchaseSummary');
        
        // Update summary
        summary.innerHTML = `
            <div class="purchase-item">
                <span>${projectTitle}</span>
                <span>${projectPrice}</span>
            </div>
            <div class="purchase-item">
                <span>Total</span>
                <span>${projectPrice}</span>
            </div>
        `;
        
        // Update M-Pesa amount if needed
        const mpesaAmount = document.getElementById('mpesaAmount');
        if (mpesaAmount) {
            mpesaAmount.textContent = projectPrice.replace('$', 'KES ');
        }
        
        modal.dataset.projectId = projectId;
        modal.classList.add('active');
    }
    
    checkPurchaseStatus(projectId) {
        return this.getValidPurchase(projectId) !== undefined;
    }
    
    getRemainingDownloads(projectId) {
        const purchase = this.getValidPurchase(projectId);
        return purchase ? purchase.downloadsRemaining : 0;
    }
}

// Initialize payment system
document.addEventListener('DOMContentLoaded', () => {
    window.paymentSystem = new PaymentSystem();
});