// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('flowerCart');
    return savedCart ? JSON.parse(savedCart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('flowerCart', JSON.stringify(cart));
}

// Get cart with quantities
function getCartWithQuantities() {
    const cart = loadCart();
    const cartMap = new Map();
    
    cart.forEach(item => {
        if (cartMap.has(item.id)) {
            cartMap.get(item.id).quantity++;
        } else {
            cartMap.set(item.id, { ...item, quantity: 1 });
        }
    });
    
    return Array.from(cartMap.values());
}

// Update cart badge
function updateCartBadge() {
    const cart = loadCart();
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

// Display cart items
function displayCart() {
    const cartItems = getCartWithQuantities();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartContent = document.getElementById('cartContent');
    
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    cartContent.style.display = 'grid';
    
    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-header">
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-description">${item.description}</div>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
                <div class="cart-item-footer">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
    
    updateOrderSummary(cartItems);
}

// Update order summary
function updateOrderSummary(cartItems) {
    const total = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('LKR ', '').replace(/,/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    document.getElementById('total').textContent = `LKR ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

// Increase quantity
function increaseQuantity(productId) {
    const cart = loadCart();
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        saveCart(cart);
        updateCartBadge();
        displayCart();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    let cart = loadCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCart(cart);
        updateCartBadge();
        displayCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = loadCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartBadge();
    displayCart();
    showNotification('Item removed from cart');
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = loadCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    window.location.href = 'checkout.html';
}

// Toggle cart - navigate to cart page or reload if already on cart page
function toggleCart() {
    // Already on cart page, just reload
    window.location.reload();
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    displayCart();
});
