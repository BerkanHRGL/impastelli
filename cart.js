document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function displayCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Combine duplicates
        const uniqueCart = cart.reduce((acc, item) => {
            const existingItem = acc.find(i => i.name === item.name);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
            } else {
                acc.push({...item, quantity: item.quantity || 1});
            }
            return acc;
        }, []);

        localStorage.setItem('cart', JSON.stringify(uniqueCart));
        
        let total = 0;
        cartItemsContainer.innerHTML = uniqueCart.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>€${item.price}</p>
                    </div>
                    <div class="item-controls">
                        <button onclick="decreaseQuantity('${item.name}')" class="quantity-btn">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.name}')" class="quantity-btn">+</button>
                        <button onclick="removeItem('${item.name}')" class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        cartTotal.textContent = total.toFixed(2);
    }

    window.increaseQuantity = function(name) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity = (item.quantity || 1) + 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartCount();
        }
    }

    window.decreaseQuantity = function(name) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.name === name);
        if (item) {
            if ((item.quantity || 1) > 1) {
                item.quantity = item.quantity - 1;
            } else {
                cart = cart.filter(i => i.name !== name);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartCount();
        }
    }

    window.removeItem = function(name) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }

    function updateCartCount() {
        const count = document.querySelector('.cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        if (count) count.textContent = totalCount;
    }

    displayCart();
    updateCartCount();
});