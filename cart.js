document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        cartItemsDiv.innerHTML = cart.map((item, index) => {
            total += parseFloat(item.price);
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>€${item.price}</p>
                    </div>
                    <button onclick="removeItem(${index})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');

        cartTotal.textContent = total.toFixed(2);
    }

    window.removeItem = function(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }

    function updateCartCount() {
        const count = document.querySelector('.cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (count) count.textContent = cart.length;
    }

    displayCart();
    updateCartCount();
});