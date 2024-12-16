// Selección de elementos del DOM
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Variables para el carrito
let allProducts = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en localStorage
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(allProducts));
};

// Mostrar/Ocultar carrito al hacer clic
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Cerrar el carrito al hacer clic en "Cerrar"
document.getElementById('btn-close-cart').addEventListener('click', () => {
    containerCartProducts.classList.add('hidden-cart');
});

// Agregar productos al carrito
productsList?.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(product => product.title === infoProduct.title);

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                }
                return product;
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
        guardarCarritoEnLocalStorage();
    }
});

// Manejo de eventos dentro del carrito (eliminar, aumentar, disminuir)
rowProduct?.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const productTitle = e.target.closest('.cart-product').querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(product => product.title !== productTitle);

        showHTML();
        guardarCarritoEnLocalStorage();
    }

    if (e.target.classList.contains('btn-increase')) {
        const productTitle = e.target.closest('.cart-product').querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.map(product => {
            if (product.title === productTitle) {
                product.quantity++;
            }
            return product;
        });

        showHTML();
        guardarCarritoEnLocalStorage();
    }

    if (e.target.classList.contains('btn-decrease')) {
        const productTitle = e.target.closest('.cart-product').querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(product => {
            if (product.title === productTitle) {
                if (product.quantity > 1) {
                    product.quantity--;
                    return true;
                }
                return false;
            }
            return true;
        });

        showHTML();
        guardarCarritoEnLocalStorage();
    }
});

// Función para mostrar los productos del carrito en el HTML
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        const price = parseFloat(product.price.slice(1));
        const subtotal = price * product.quantity;

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <div class="cantidad-productos">
                    <button class="btn-decrease">-</button>
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <button class="btn-increase">+</button>
                </div>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">$${subtotal.toLocaleString('es-CO')}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon-close">
                <rect width="24" height="24" fill="none" />
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total += subtotal;
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total.toLocaleString('es-CO')}`;
    countProducts.innerText = totalOfProducts;
};

// Mostrar los productos guardados al cargar la página
showHTML();
