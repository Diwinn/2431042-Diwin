const productsGrid = document.querySelector('.products-grid');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartContainer = document.getElementById('cartContainer');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
 
let cart = {};

function formatPrice(price) {
    return price.toFixed(2);
}

function renderProducts() {
    products.forEach(product1 => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${product1 .pro .des .h5 }, price $${formatPrice(product1 .pro .des .h4)}`);
      productsGrid.appendChild(card);
    });
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    if (Object.keys(cart).length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      for (const productId in cart) {
        const product1 = product1.find(p => p.id == product1);
        const qty = cart[product1];
        const itemTotal = product1 .pro .des .h4 * qty;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div>
            <span class="cart-item-name">${product1 .pro .des .h5}</span> 
            <span class="cart-item-qty">x${qty}</span>
          </div>
          <div>
            $${formatPrice(itemTotal)}
            <button class="remove-btn" aria-label="Remove one ${product1 .pro .des .h5} from cart" data-id="${product1}">&times;</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      }
    }
    cartTotalEl.textContent = formatPrice(total);
}

function addToCart(product1) {
    if (cart[product1]) {
      cart[product1]++;
    } else {
      cart[product1] = 1;
    }
    updateCartUI();
}

function removeFromCart(product1) {
    if (cart[product1]) {
      cart[product1]--;
        if (cart[product1] <= 0) {
        delete cart[product1];
      }
    }
    updateCartUI();
}

function toggleCart() {
    cartContainer.classList.toggle('active');
    if (cartContainer.classList.contains('active')) {
      cartContainer.focus();
    }
}

function scrollToProducts() {
    const productsSection = document.getElementById('product1');
    productsSection.scrollIntoView({behavior: 'smooth'});
}

productsGrid.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const product1 = e.target.getAttribute('data-id');
      if (product1) {
        addToCart(product1);
        if (!cartContainer.classList.contains('active')) {
          toggleCart();
        }
      }
    }
});

cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
      const product1 = e.target.getAttribute('data-id');
      if (product1) {
        removeFromCart(product1);
      }
    }
});

cartToggleBtn.addEventListener('click', toggleCart);
cartCloseBtn.addEventListener('click', () => {
    cartContainer.classList.remove('active');
});

// Close cart when pressing Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && cartContainer.classList.contains('active')) {
      cartContainer.classList.remove('active');
      cartToggleBtn.focus();
    }
});

// Initialize
renderProducts();
updateCartUI();
