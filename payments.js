// Payment details functionality

// Handle payment form submission
document.getElementById('payment-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const qrFile = document.getElementById('qr-upload').files[0];
    const bankName = document.getElementById('bank-name').value;
    const accountNumber = document.getElementById('account-number').value;
    const accountHolder = document.getElementById('account-holder').value;
    const ifsc = document.getElementById('ifsc').value;
    
    if (!qrFile) {
        showNotification('Please upload a QR code!');
        return;
    }
    
    // For demo purposes, store file name. In real app, upload to server.
    const paymentDetails = {
        qrFileName: qrFile.name,
        bankName,
        accountNumber,
        accountHolder,
        ifsc
    };
    
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    
    showNotification('Payment details saved successfully!');
    
    // Optionally, redirect or clear form
    document.getElementById('payment-form').reset();
});

// Notification function (reuse from script.js)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles if not present
if (!document.querySelector('style[data-payments]')) {
    const style = document.createElement('style');
    style.setAttribute('data-payments', '');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}