// Products Data
const products = [
    {
        id: 1,
        name: "سماعات لاسلكية فاخرة",
        category: "electronics",
        price: 299,
        oldPrice: 450,
        rating: 5,
        image: "🎧",
        badge: "خصم 30%",
        description: "سماعات بلوتوث عالية الجودة مع إلغاء الضوضاء النشط وبطارية تدوم 30 ساعة"
    },
    {
        id: 2,
        name: "ساعة ذكية رياضية",
        category: "electronics",
        price: 499,
        oldPrice: null,
        rating: 4,
        image: "⌚",
        badge: "جديد",
        description: "تتبع اللياقة البدنية، قياس ضربات القلب، مقاومة للماء حتى 50 متر"
    },
    {
        id: 3,
        name: "حقيبة جلد طبيعي",
        category: "fashion",
        price: 350,
        oldPrice: 500,
        rating: 5,
        image: "👜",
        badge: "الأكثر مبيعاً",
        description: "حقيبة يد فاخرة من الجلد الطبيعي الإيطالي بتصميم عصري"
    },
    {
        id: 4,
        name: "طقم أواني طهي",
        category: "home",
        price: 599,
        oldPrice: 899,
        rating: 4,
        image: "🍳",
        badge: "خصم",
        description: "طقم كامل من الستانلس ستيل غير اللاصق مع مقابض مريحة"
    },
    {
        id: 5,
        name: "حذاء رياضي احترافي",
        category: "sports",
        price: 450,
        oldPrice: null,
        rating: 5,
        image: "👟",
        badge: "new",
        description: "تصميم مريح للجري مع تقنية امتصاص الصدمات المتقدمة"
    },
    {
        id: 6,
        name: "لابتوب احترافي",
        category: "electronics",
        price: 3499,
        oldPrice: 4299,
        rating: 5,
        image: "💻",
        badge: "خصم 20%",
        description: "معالج i7، رام 16GB، تخزين SSD 512GB، شاشة 15.6 بوصة"
    },
    {
        id: 7,
        name: "أريكة مودرن",
        category: "home",
        price: 1899,
        oldPrice: 2499,
        rating: 4,
        image: "🛋️",
        badge: null,
        description: "أريكة 3 مقاعد قماش مقاوم للبقع مع وسائد مريحة"
    },
    {
        id: 8,
        name: "بدلة رسمية",
        category: "fashion",
        price: 799,
        oldPrice: null,
        rating: 4,
        image: "👔",
        badge: "new",
        description: "بدلة رسمية أنيقة قصة سليم فيت مناسبة للمناسبات الرسمية"
    }
];

let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});

// Render Products
function renderProducts(productsToRender) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<span class="product-badge ${product.badge === 'new' ? 'new' : ''}">${product.badge}</span>` : ''}
            <div class="product-img">
                ${product.image}
                <div class="product-actions">
                    <button class="action-btn" onclick="openModal(${product.id})" title="عرض سريع"><i class="fas fa-eye"></i></button>
                    <button class="action-btn" onclick="addToCart(${product.id})" title="أضف للسلة"><i class="fas fa-shopping-bag"></i></button>
                    <button class="action-btn" title="المفضلة"><i class="fas fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${product.price} ريال</span>
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ريال</span>` : ''}
                </div>
                <div class="rating">
                    ${Array(product.rating).fill('<i class="fas fa-star"></i>').join('')}
                    ${Array(5 - product.rating).fill('<i class="far fa-star"></i>').join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(cat) {
    const names = {
        'electronics': 'إلكترونيات',
        'fashion': 'أزياء',
        'home': 'منزل',
        'sports': 'رياضة'
    };
    return names[cat] || cat;
}

// Filter Products
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (category === 'all' && btn.textContent.includes('الكل')) {
            btn.classList.add('active');
        } else if (category !== 'all' && btn.textContent.includes(getCategoryName(category))) {
            btn.classList.add('active');
        }
    });

    // Filter and render
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showToast();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;"><i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 15px;"></i><p>السلة فارغة</p></div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} ريال</div>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total + ' ريال';
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.querySelector('.overlay').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    alert('جاري تحويلك لصفحة الدفع... (هذا نموذج تجريبي)');
}

// Modal Functions
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-img">${product.image}</div>
        <div class="modal-info">
            <span class="product-category">${getCategoryName(product.category)}</span>
            <h2>${product.name}</h2>
            <div class="modal-price">${product.price} ريال</div>
            <div class="rating" style="margin-bottom: 20px;">
                ${Array(product.rating).fill('<i class="fas fa-star"></i>').join('')}
                ${Array(5 - product.rating).fill('<i class="far fa-star"></i>').join('')}
            </div>
            <p class="modal-description">${product.description}</p>
            
            <div class="size-options">
                <h4>الكمية:</h4>
                <div class="quantity-control" style="justify-content: flex-start;">
                    <button class="qty-btn" onclick="this.nextElementSibling.textContent--">-</button>
                    <span>1</span>
                    <button class="qty-btn" onclick="this.previousElementSibling.textContent++">+</button>
                </div>
            </div>
            
            <button class="add-to-cart" onclick="addToCart(${product.id}); closeModal();">
                <i class="fas fa-shopping-bag"></i> أضف إلى السلة
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Toast Notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modal on outside click
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});