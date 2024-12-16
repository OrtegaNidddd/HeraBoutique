document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const resumenCarrito = document.querySelector('#resumen-carrito');

    // Verificar si el carrito tiene productos
    if (carrito.length === 0) {
        resumenCarrito.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    // Crear el resumen de los productos
    carrito.forEach(product => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-resumen');

        // Calcular el subtotal con separación de miles
        const precioUnitario = parseFloat(product.price.slice(1));
        const subtotal = precioUnitario * product.quantity;

        productoDiv.innerHTML = `
            <p><strong>Producto:</strong> ${product.title}</p>
            <p><strong>Cantidad:</strong> ${product.quantity}</p>
            <p><strong>Precio Unitario:</strong> $${Math.round(precioUnitario).toLocaleString('es-CO')}</p>
            <p><strong>Subtotal:</strong> $${Math.round(subtotal).toLocaleString('es-CO')}</p>
            <hr>
        `;

        resumenCarrito.appendChild(productoDiv);
    });

    // Calcular y mostrar el total
    const total = carrito.reduce((acc, product) => {
        return acc + product.quantity * parseFloat(product.price.slice(1));
    }, 0);

    const totalRedondeado = Math.round(total);

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-carrito');
    totalDiv.innerHTML = `
        <h3>Total a pagar: $${totalRedondeado.toLocaleString('es-CO')}</h3>
        <a href="../content/ropa.html" id="btn-editar-pedido">Editar pedido</a>
    `;

    resumenCarrito.appendChild(totalDiv);
});
