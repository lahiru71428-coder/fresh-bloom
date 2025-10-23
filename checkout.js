// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('flowerCart');
    return savedCart ? JSON.parse(savedCart) : [];
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

// Display order summary
function displayOrderSummary() {
    const cartItems = getCartWithQuantities();
    const orderItemsContainer = document.getElementById('orderItems');
    
    if (cartItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const orderItemDiv = document.createElement('div');
        orderItemDiv.className = 'order-item';
        orderItemDiv.innerHTML = `
            <div class="order-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">Qty: ${item.quantity}</div>
            </div>
            <div class="order-item-price">${item.price}</div>
        `;
        orderItemsContainer.appendChild(orderItemDiv);
    });
    
    updateCheckoutTotals(cartItems);
}

// Get shipping cost based on selected delivery option
function getShippingCost() {
    const deliveryOption = document.querySelector('input[name="delivery"]:checked');
    if (!deliveryOption) {
        return 500.00; // Default to standard
    }
    const shippingCosts = {
        'standard': 500.00,
        'express': 1000.00,
        'sameday': 1500.00
    };
    return shippingCosts[deliveryOption.value] || 500.00;
}

// Update checkout totals
function updateCheckoutTotals(cartItems) {
    const cartTotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('LKR ', '').replace(/,/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    const deliveryCharge = getShippingCost();
    const total = cartTotal + deliveryCharge;
    
    document.getElementById('checkoutCartTotal').textContent = `LKR ${cartTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    document.getElementById('checkoutDelivery').textContent = `LKR ${deliveryCharge.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    document.getElementById('checkoutTotal').textContent = `LKR ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

// Format card number with spaces
function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
}

// Format expiry date
function formatExpiry(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    
    return v;
}

// Validate form
function validateForm(formData) {
    const errors = [];
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Sri Lanka phone number validation
    // Format: +94XXXXXXXXX or 0XXXXXXXXX (10 digits starting with 0, or +94 followed by 9 digits)
    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    const sriLankaPhoneRegex = /^(?:\+94|0)?[1-9]\d{8}$/;
    if (!sriLankaPhoneRegex.test(phoneClean)) {
        errors.push('Please enter a valid Sri Lankan phone number (e.g., 0771234567 or +94771234567)');
    }
    
    // Required fields validation
    if (!formData.firstName.trim()) {
        errors.push('First name is required');
    }
    if (!formData.lastName.trim()) {
        errors.push('Last name is required');
    }
    if (!formData.address.trim()) {
        errors.push('Address is required');
    }
    if (!formData.city.trim()) {
        errors.push('City is required');
    }
    if (!formData.state.trim()) {
        errors.push('State/Province is required');
    }
    if (!formData.zip.trim()) {
        errors.push('ZIP/Postal code is required');
    }
    
    return errors;
}

// Save customer information to localStorage
function saveCustomerInfo(formData) {
    const customerInfo = {
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip
    };
    localStorage.setItem('savedCustomerInfo', JSON.stringify(customerInfo));
}

// Load saved customer information
function loadSavedCustomerInfo() {
    const savedInfo = localStorage.getItem('savedCustomerInfo');
    if (savedInfo) {
        return JSON.parse(savedInfo);
    }
    return null;
}

// Fill form with saved information
function fillFormWithSavedInfo() {
    const savedInfo = loadSavedCustomerInfo();
    if (savedInfo) {
        document.getElementById('email').value = savedInfo.email || '';
        document.getElementById('phone').value = savedInfo.phone || '';
        document.getElementById('firstName').value = savedInfo.firstName || '';
        document.getElementById('lastName').value = savedInfo.lastName || '';
        document.getElementById('address').value = savedInfo.address || '';
        document.getElementById('city').value = savedInfo.city || '';
        document.getElementById('state').value = savedInfo.state || '';
        document.getElementById('zip').value = savedInfo.zip || '';
    }
}

// Handle form submission
async function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = {
        email: form.email.value,
        phone: form.phone.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
        delivery: form.delivery.value
    };
    
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showNotification(errors[0]);
        return;
    }
    
    // Save customer info if checkbox is checked
    const saveInfoCheckbox = document.getElementById('saveInfo');
    if (saveInfoCheckbox && saveInfoCheckbox.checked) {
        saveCustomerInfo(formData);
    }
    
    // Get cart items and calculate total
    const cartItems = getCartWithQuantities();
    const cartTotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('LKR ', '').replace(/,/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    const deliveryCharge = getShippingCost();
    const total = cartTotal + deliveryCharge;
    
    // Prepare order data
    const orderData = {
        ...formData,
        items: cartItems,
        cartTotal: cartTotal,
        deliveryCharge: deliveryCharge,
        total: total
    };
    
    // Show processing message
    showNotification('Redirecting to payment...');
    
    try {
        // Create Stripe checkout session
        const response = await fetch('./create-checkout-session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const session = await response.json();
        
        if (session.error) {
            showNotification(session.error);
            return;
        }
        
        // Redirect to Stripe Checkout
        const stripe = Stripe(session.publishableKey);
        const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId
        });
        
        if (result.error) {
            showNotification(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Payment processing error. Please try again.');
    }
}

// Navigate to cart page
function goToCart() {
    window.location.href = 'cart.html';
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    displayOrderSummary();
    
    // Load saved customer information if available
    fillFormWithSavedInfo();
    
    // Add event listeners for delivery options
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', () => {
            const cartItems = getCartWithQuantities();
            updateCheckoutTotals(cartItems);
        });
    });
    
    // Add form submit handler
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
});
