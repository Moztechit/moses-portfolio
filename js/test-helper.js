// Test Configuration and Helper Functions
class TestHelper {
    constructor() {
        this.isTestMode = true;
        this.testCredentials = {
            stripe: {
                cardNumber: '4242424242424242',
                expiry: '12/25',
                cvv: '123',
                name: 'Test User'
            },
            paypal: {
                email: 'test@example.com',
                password: 'testpass123'
            },
            mpesa: {
                phone: '0720933253',
                amount: '299'
            }
        };
    }
    
    // Auto-fill test credentials
    autoFillCredentials(method) {
        if (!this.isTestMode) return;
        
        setTimeout(() => {
            switch (method) {
                case 'stripe':
                case 'visa':
                case 'mastercard':
                    const cardInput = document.querySelector('.payment-input[placeholder*="1234"]');
                    const expiryInput = document.querySelector('.payment-input[placeholder*="MM/YY"]');
                    const cvvInput = document.querySelector('.payment-input[placeholder*="123"]');
                    const nameInput = document.querySelector('.payment-input[placeholder*="John Doe"]');
                    
                    if (cardInput) cardInput.value = this.testCredentials.stripe.cardNumber;
                    if (expiryInput) expiryInput.value = this.testCredentials.stripe.expiry;
                    if (cvvInput) cvvInput.value = this.testCredentials.stripe.cvv;
                    if (nameInput) nameInput.value = this.testCredentials.stripe.name;
                    break;
                    
                case 'paypal':
                    const emailInput = document.querySelector('.payment-input[type="email"]');
                    const passwordInput = document.querySelector('.payment-input[type="password"]');
                    
                    if (emailInput) emailInput.value = this.testCredentials.paypal.email;
                    if (passwordInput) passwordInput.value = this.testCredentials.paypal.password;
                    break;
                    
                case 'mpesa':
                    const phoneInput = document.querySelector('.payment-input[placeholder*="07XX"]');
                    if (phoneInput) phoneInput.value = this.testCredentials.mpesa.phone;
                    break;
            }
        }, 500);
    }
    
    // Show test mode banner
    showTestBanner() {
        if (!this.isTestMode) return;
        
        const banner = document.createElement('div');
        banner.className = 'test-banner';
        banner.innerHTML = `
            <div class="test-banner-content">
                <i class="fas fa-flask"></i>
                <span><strong>Test Mode Active:</strong> Use provided test credentials for payment simulation</span>
                <button class="test-banner-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Add banner styles
        const style = document.createElement('style');
        style.textContent = `
            .test-banner {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                color: #1a1a1a;
                z-index: 10000;
                padding: 1rem;
                font-weight: 600;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .test-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .test-banner-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            
            .test-banner-close:hover {
                background: rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Test purchase flow
    testPurchaseFlow(projectId = 1) {
        console.log('🧪 Testing purchase flow for project:', projectId);
        
        // Step 1: Open purchase modal
        if (window.paymentSystem) {
            const project = window.projectsManager ? window.projectsManager.getProjectById(projectId) : null;
            if (project) {
                window.paymentSystem.openPurchaseModal(projectId, project.title, project.price);
                console.log('✅ Purchase modal opened');
                
                // Step 2: Select payment method
                setTimeout(() => {
                    const stripeMethod = document.querySelector('[data-method="stripe"]');
                    if (stripeMethod) {
                        stripeMethod.click();
                        console.log('✅ Stripe payment method selected');
                        
                        // Step 3: Auto-fill credentials
                        this.autoFillCredentials('stripe');
                        console.log('✅ Test credentials filled');
                        
                        // Step 4: Complete purchase (manual step for security)
                        console.log('📝 Ready to complete purchase. Click "Complete Purchase" button to finish test.');
                    }
                }, 1000);
            }
        }
    }
    
    // Test download flow
    testDownloadFlow(projectId = 1) {
        console.log('🧪 Testing download flow for project:', projectId);
        
        if (window.paymentSystem) {
            const purchase = window.paymentSystem.getValidPurchase(projectId);
            if (purchase) {
                console.log('✅ Valid purchase found:', purchase);
                window.paymentSystem.downloadProject();
                console.log('✅ Download initiated');
            } else {
                console.log('❌ No valid purchase found. Please purchase first.');
            }
        }
    }
    
    // Reset purchase history (for testing)
    resetPurchaseHistory() {
        if (confirm('Are you sure you want to reset all purchase history? This cannot be undone.')) {
            localStorage.removeItem('purchaseHistory');
            location.reload();
            console.log('🗑️ Purchase history reset');
        }
    }
    
    // Show purchase history
    showPurchaseHistory() {
        if (window.paymentSystem) {
            const history = window.paymentSystem.purchaseHistory;
            console.log('📊 Purchase History:', history);
            
            if (history.length === 0) {
                console.log('No purchases found');
                return;
            }
            
            history.forEach((purchase, index) => {
                console.log(`Purchase ${index + 1}:`, {
                    Project: purchase.projectId,
                    Method: purchase.method,
                    Downloads: purchase.downloadsRemaining,
                    Expires: new Date(purchase.expiryTime).toLocaleString(),
                    PurchaseID: purchase.id
                });
            });
        }
    }
}

// Initialize test helper
let testHelper;

document.addEventListener('DOMContentLoaded', () => {
    testHelper = new TestHelper();
    
    // Show test banner in test mode
    if (testHelper.isTestMode) {
        testHelper.showTestBanner();
        
        // Add keyboard shortcuts for testing
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey) {
                switch (e.key) {
                    case 'T':
                        e.preventDefault();
                        testHelper.testPurchaseFlow();
                        break;
                    case 'D':
                        e.preventDefault();
                        testHelper.testDownloadFlow();
                        break;
                    case 'R':
                        e.preventDefault();
                        testHelper.resetPurchaseHistory();
                        break;
                    case 'H':
                        e.preventDefault();
                        testHelper.showPurchaseHistory();
                        break;
                }
            }
        });
        
        console.log('🧪 Test Helper Loaded!');
        console.log('Keyboard shortcuts:');
        console.log('  Ctrl+Shift+T: Test purchase flow');
        console.log('  Ctrl+Shift+D: Test download flow');
        console.log('  Ctrl+Shift+R: Reset purchase history');
        console.log('  Ctrl+Shift+H: Show purchase history');
    }
});