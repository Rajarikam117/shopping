// Sample products data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99,
        description: 'High-quality sound with noise cancellation',
        emoji: '🎧'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        description: 'Track your fitness and stay connected',
        emoji: '⌚'
    },
    {
        id: 3,
        name: 'USB-C Cable',
        price: 19.99,
        description: 'Fast charging and data transfer',
        emoji: '🔌'
    },
    {
        id: 4,
        name: 'Phone Stand',
        price: 24.99,
        description: 'Adjustable and portable phone holder',
        emoji: '📱'
    },
    {
        id: 5,
        name: 'Power Bank',
        price: 49.99,
        description: '20000mAh portable charger',
        emoji: '🔋'
    },
    {
        id: 6,
        name: 'Webcam',
        price: 89.99,
        description: '1080p HD video for streaming',
        emoji: '📹'
    },
    {
        id: 7,
        name: 'Keyboard',
        price: 69.99,
        description: 'Mechanical keyboard with RGB lights',
        emoji: '⌨️'
    },
    {
        id: 8,
        name: 'Mouse',
        price: 39.99,
        description: 'Wireless mouse with precision tracking',
        emoji: '🖱️'
    }
];

// Cart array
let cart = [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    loadCartFromLocalStorage();
    updateCartCount();
});

// Display products
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartCount();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
        saveCartToLocalStorage();
        updateCartCount();
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        document.querySelector('.checkout-btn').disabled = true;
        return;
    }

    document.querySelector('.checkout-btn').disabled = false;

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    updateCartSummary();
}

// Update cart summary (subtotal, tax, total)
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        updateCartDisplay();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = total * 0.1;
    const finalTotal = total + taxAmount;

    const orderSummary = cart.map(item => 
        `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    alert(`Thank you for your order!\n\n${orderSummary}\n\nSubtotal: $${total.toFixed(2)}\nTax (10%): $${taxAmount.toFixed(2)}\nTotal: $${finalTotal.toFixed(2)}\n\nYour order has been confirmed!`);
    
    // Clear cart
    cart = [];
    saveCartToLocalStorage();
    updateCartCount();
    updateCartDisplay();
    toggleCart();
}

// Local Storage functions
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Notification
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

// Add animation styles
const style = document.createElement('style');
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
