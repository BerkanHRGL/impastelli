document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cart-items');
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    function addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function displayCartItems() {
        if (!cartItems) return; // Only run on cart page
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        
        cartItems.innerHTML = cart.map((item, index) => {
            total += parseFloat(item.price);
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>€${item.price}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');

        if (document.getElementById('total-price')) {
            document.getElementById('total-price').textContent = total.toFixed(2);
        }
    }

    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: button.dataset.price,
                image: button.closest('.menu-item').querySelector('img').src
            };
            addToCart(item);
        });
    });

    // Initialize
    updateCartCount();
    displayCartItems();
});

// Make removeFromCart available globally
window.removeFromCart = removeFromCart;
