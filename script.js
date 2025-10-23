const products = [
    // Roses
    { id: 1, name: 'Classic Red Rose Bouquet', category: 'roses', price: 'LKR 5,950', image: 'https://i.imgur.com/HndeyEf.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Timeless red roses arranged with elegant greenery' },
    { id: 2, name: 'Pink Rose Garden', category: 'roses', price: 'LKR 6,950', image: 'https://i.imgur.com/APKvjem.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Soft pink roses perfect for romantic occasions' },
    { id: 3, name: 'White Rose Elegance', category: 'roses', price: 'LKR 7,950', image: 'https://i.imgur.com/PYl8cPb.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Pure white roses symbolizing grace and sophistication' },
    { id: 4, name: 'Sunset Rose Collection', category: 'roses', price: 'LKR 8,950', image: 'https://i.imgur.com/609dEuH.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Vibrant orange and coral roses in stunning arrangement' },
    { id: 5, name: 'Luxury Rose Basket', category: 'roses', price: 'LKR 9,950', image: 'https://i.imgur.com/mMclVel.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Premium roses in a beautiful wicker basket' },
    { id: 6, name: 'Ivory Rose Romance', category: 'roses', price: 'LKR 8,950', image: 'https://i.imgur.com/rws7e8W.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Delicate ivory roses with baby\'s breath accents' },
    { id: 7, name: 'Ruby Red Dozen', category: 'roses', price: 'LKR 10,950', image: 'https://i.imgur.com/JxpcQDI.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Twelve premium red roses in luxury presentation' },
    { id: 8, name: 'Blush Rose Arrangement', category: 'roses', price: 'LKR 6,950', image: 'https://i.imgur.com/iqLxQqc.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Soft blush roses with eucalyptus leaves' },

    // Tulips
    { id: 9, name: 'Spring Tulip Mix', category: 'tulips', price: 'LKR 4,950', image: 'https://i.imgur.com/fnVYENz.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Colorful tulips celebrating the beauty of spring' },
    { id: 10, name: 'Purple Tulip Garden', category: 'tulips', price: 'LKR 5,950', image: 'https://i.imgur.com/SXCDH72.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Rich purple tulips in elegant glass vase' },
    { id: 11, name: 'Pink Tulip Delight', category: 'tulips', price: 'LKR 4,550', image: 'https://i.imgur.com/iGGjeED.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Fresh pink tulips arranged with artistic flair' },
    { id: 12, name: 'Yellow Tulip Sunshine', category: 'tulips', price: 'LKR 4,950', image: 'https://i.imgur.com/QsVLsFq.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Bright yellow tulips bringing warmth and joy' },
    { id: 13, name: 'Red Tulip Romance', category: 'tulips', price: 'LKR 5,950', image: 'https://i.imgur.com/uOgcuAu.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Passionate red tulips in contemporary design' },
    { id: 14, name: 'White Tulip Purity', category: 'tulips', price: 'LKR 5,950', image: 'https://i.imgur.com/aPvWAtc.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Pristine white tulips with minimalist elegance' },
    { id: 15, name: 'Rainbow Tulip Collection', category: 'tulips', price: 'LKR 6,950', image: 'https://i.imgur.com/lGH02u6.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Vibrant mix of multicolored tulips' },
    { id: 16, name: 'Peach Tulip Dream', category: 'tulips', price: 'LKR 4,950', image: 'https://i.imgur.com/seON5ll.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Soft peach tulips in charming arrangement' },

    // Sunflowers
    { id: 17, name: 'Golden Sunflower Bouquet', category: 'sunflowers', price: 'LKR 3,950', image: 'https://i.imgur.com/nmptiKR.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Radiant sunflowers bringing sunshine indoors' },
    { id: 18, name: 'Sunflower Garden Basket', category: 'sunflowers', price: 'LKR 5,950', image: 'https://i.imgur.com/CxYBaCF.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Large sunflowers arranged in rustic basket' },
    { id: 19, name: 'Mini Sunflower Charm', category: 'sunflowers', price: 'LKR 3,550', image: 'https://i.imgur.com/p8x7Vua.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Adorable mini sunflowers with wildflower accents' },
    { id: 20, name: 'Sunflower & Wheat Bundle', category: 'sunflowers', price: 'LKR 4,950', image: 'https://i.imgur.com/1oSn2NY.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Country-style sunflowers with wheat stalks' },
    { id: 21, name: 'Premium Sunflower Display', category: 'sunflowers', price: 'LKR 7,950', image: 'https://i.imgur.com/NKyAkUH.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Magnificent sunflowers in luxury presentation' },
    { id: 22, name: 'Sunflower Field Collection', category: 'sunflowers', price: 'LKR 5,950', image: 'https://i.imgur.com/gL97lg4.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Multiple sunflower stems in natural style' },
    { id: 23, name: 'Rustic Sunflower Jar', category: 'sunflowers', price: 'LKR 3,950', image: 'https://i.imgur.com/cL2SBvB.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Charming sunflowers in vintage mason jar' },
    { id: 24, name: 'Sunflower Celebration', category: 'sunflowers', price: 'LKR 6,950', image: 'https://i.imgur.com/OuxYPs2.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Grand sunflower arrangement for special events' },

    // Mixed Collections
    { id: 25, name: 'Garden Party Mix', category: 'mixed', price: 'LKR 9,950', image: 'https://i.imgur.com/bzl7YlJ.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Beautiful blend of roses, tulips and seasonal flowers' },
    { id: 26, name: 'Wildflower Meadow', category: 'mixed', price: 'LKR 8,950', image: 'https://i.imgur.com/OWUFN61.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Natural mix of wildflowers and greenery' },
    { id: 27, name: 'Tropical Paradise', category: 'mixed', price: 'LKR 11,950', image: 'https://i.imgur.com/7wkynaR.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Exotic tropical flowers in vibrant colors' },
    { id: 28, name: 'Elegant Mixed Bouquet', category: 'mixed', price: 'LKR 10,950', image: 'https://i.imgur.com/ynDmOLT.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Sophisticated mix of premium seasonal blooms' },
    { id: 29, name: 'Spring Garden Collection', category: 'mixed', price: 'LKR 9,950', image: 'https://i.imgur.com/xwp1yrJ.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Fresh spring flowers in pastel shades' },
    { id: 30, name: 'Designer\'s Choice Deluxe', category: 'mixed', price: 'LKR 12,950', image: 'https://i.imgur.com/xKewXKO.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Premium mixed arrangement by expert florists' },
    { id: 31, name: 'Country Garden Basket', category: 'mixed', price: 'LKR 10,950', image: 'https://i.imgur.com/Wox4tiP.jpg', rating: '⭐⭐⭐⭐⭐', description: 'Charming mix of cottage-style flowers' },
    { id: 32, name: 'Seasonal Spectacular', category: 'mixed', price: 'LKR 11,950', image: 'https://i.imgur.com/RMF4f9Q.jpg', rating: '⭐⭐⭐⭐⭐', description: 'The finest seasonal flowers in luxury display' }
];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('flowerCart');
    return savedCart ? JSON.parse(savedCart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('flowerCart', JSON.stringify(cart));
}

let cart = loadCart();
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 18; // 3 columns x 6 rows

function getFilteredProducts() {
    return currentFilter === 'all'
        ? products
        : products.filter(p => p.category === currentFilter);
}

function getTotalPages() {
    const filtered = getFilteredProducts();
    return Math.ceil(filtered.length / itemsPerPage);
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filtered = getFilteredProducts();
    const totalPages = getTotalPages();
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageProducts = filtered.slice(startIdx, endIdx);

    pageProducts.forEach((product, index) => {
        const delay = index * 0.05;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${delay}s`;

        card.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <div class="rating">${product.rating}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-footer">
              <span class="price">${product.price}</span>
              <button class="add-to-cart" onclick="addToCart(${product.id})">Add</button>
            </div>
          </div>
        `;
        productsGrid.appendChild(card);
    });

    updatePaginationControls(totalPages);
}

function updatePaginationControls(totalPages) {
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function changePage(direction) {
    const totalPages = getTotalPages();
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderProducts();
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function filterProducts(category) {
    currentFilter = category;
    currentPage = 1;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = loadCart();
    cart.push(product);
    saveCart(cart);
    updateCartBadge();
    showNotification('Added to cart');
}

function updateCartBadge() {
    cart = loadCart();
    document.getElementById('cartBadge').textContent = cart.length;
}

function toggleCart() {
    window.location.href = 'cart.html';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 30px;
        background: var(--gold);
        color: var(--white);
        padding: 1.2rem 2rem;
        border-radius: 0;
        z-index: 1001;
        animation: slideInDown 0.3s;
        font-weight: 600;
        letter-spacing: 0.5px;
        font-size: 0.9rem;
      `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    showCustomerLogin();
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showCustomerLogin() {
    document.getElementById('customerForm').style.display = 'flex';
    document.getElementById('adminForm').style.display = 'none';
    document.querySelectorAll('.modal-tabs-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.modal-tabs-btn')[0].classList.add('active');
}

function showAdminLogin() {
    document.getElementById('customerForm').style.display = 'none';
    document.getElementById('adminForm').style.display = 'flex';
    document.querySelectorAll('.modal-tabs-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.modal-tabs-btn')[1].classList.add('active');
}

window.onclick = function (event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
};

// Initialize
renderProducts();
updateCartBadge();
