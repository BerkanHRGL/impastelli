document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector('.cart-count');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    function addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function setupAddToCartButtons() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const item = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: button.dataset.price,
                    image: button.dataset.image || button.closest('.menu-item')?.querySelector('img').src
                };
                addToCart(item);
            });
        });
    }

    function handleIndexPage() {
        const pizzaNavLinks = document.querySelectorAll('.pizza-nav a');
        const pizzaDisplay = document.querySelector('.pizza-display');
        const pizzaImage = pizzaDisplay.querySelector('.pizza-image');
        const pizzaName = pizzaDisplay.querySelector('h2');
        const pizzaDescription = pizzaDisplay.querySelector('p');
        const addToCartBtn = pizzaDisplay.querySelector('.add-to-cart-btn');

        if (pizzaNavLinks.length > 0) {
            pizzaNavLinks[0].classList.add('active');
        }

        pizzaNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Remove active class from all links
                pizzaNavLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');

            });
        });

        const pizzaData = {
            pepperoni: {
                image: 'imgs/pizza_pepperoni.png',
                name: 'Pizza Pepperoni',
                description: 'Hand-stretched pizza dough, tomato sauce, creamy mozzarella cheese, and premium sliced pepperoni.',
                price: '12.99',
            },
            hawaii: {
                image: 'imgs/pizza_hawaii.png',
                name: 'Pizza Hawaii',
                description: 'Tomato sauce, mozzarella, ham, and pineapple.',
                price: '13.99',
            },
            margherita: {
                image: 'imgs/pizza_margherita.png',
                name: 'Pizza Margherita',
                description: 'Tomato sauce, mozzarella cheese, and fresh basil.',
                price: '11.99',
            },
            napoletana: {
                image: 'imgs/pizza_napoletana.png',
                name: 'Pizza Napoletana',
                description: 'Tomato sauce, mozzarella, anchovies, and olives.',
                price: '14.99',
            },
            pollo: {
                image: 'imgs/pizza_pollo.png',
                name: 'Pizza Pollo',
                description: 'Tomato sauce, mozzarella cheese, tomatoes, and grilled chicken.',
                price: '12.99',
            }
        };

        pizzaNavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedPizza = event.target.dataset.pizza;
                const pizza = pizzaData[selectedPizza];

                if (pizza) {
                    pizzaImage.src = pizza.image;
                    pizzaName.textContent = pizza.name;
                    pizzaDescription.textContent = pizza.description;
                    addToCartBtn.dataset.name = pizza.name;
                    addToCartBtn.dataset.price = pizza.price;
                    addToCartBtn.dataset.image = pizza.image;
                }
            });
        });

        // Attach event listener to add to cart button after updating pizza details
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const item = {
                    id: addToCartBtn.dataset.id,
                    name: addToCartBtn.dataset.name,
                    price: addToCartBtn.dataset.price,
                    image: addToCartBtn.dataset.image
                };
                addToCart(item);
            });
        }
    }


    function handleMenuPage() {
        setupAddToCartButtons();
        setupSorting();
    }

    function setupSorting() {
        const sortSelect = document.getElementById('sort-select');
        const menuGrid = document.querySelector('.menu-grid');

        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                const menuItems = Array.from(document.querySelectorAll('.menu-item'));
                
                menuItems.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace('€', ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace('€', ''));
                    
                    if (this.value === 'low-high') {
                        return priceA - priceB;
                    } else if (this.value === 'high-low') {
                        return priceB - priceA;
                    }
                    return 0;
                });

                menuGrid.innerHTML = '';
                menuItems.forEach(item => menuGrid.appendChild(item));
            });
        }
    }

    // Determine which page is currently loaded and initialize accordingly
    if (document.querySelector('.pizza-nav')) {
        handleIndexPage();
    } else if (document.querySelector('.menu-item')) {
        handleMenuPage();
    }

    updateCartCount();
});
