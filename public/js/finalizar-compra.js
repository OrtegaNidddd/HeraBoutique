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
     // Configurar el botón de enviar
    const btnEnviar = document.getElementById('btn-enviar');
    
     // Prevenir el comportamiento por defecto del formulario al hacer clic
    btnEnviar.addEventListener('click', (event) => {
        event.preventDefault();
        enviarWhatsapp();
    });
});

// Función para enviar el mensaje a WhatsApp
function enviarWhatsapp() {
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const cedula = document.getElementById('cedula').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const ciudad = document.getElementById('ciudad').value;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let resumenCarrito = "Resumen del carrito:\n\n"; // Agregar un salto de línea después del título
    let totalPagar = 0;

    // Formatear los productos en el carrito
    carrito.forEach((item, index) => {
        const precioUnitario = parseFloat(item.price.slice(1)); // Convierte el precio a número
        const subtotal = precioUnitario * item.quantity;

        resumenCarrito += `${index + 1}. Producto: ${item.title}\n` +
                            `   Cantidad: ${item.quantity}\n` +
                            `   Precio Unitario: $${precioUnitario.toLocaleString('es-CO')}\n` +
                            `   Subtotal: $${subtotal.toLocaleString('es-CO')}\n\n`; // Añadir doble salto de línea entre productos

        totalPagar += subtotal;
    });

    // Agregar total al final del resumen
    resumenCarrito += `\nTotal a pagar: $${totalPagar.toLocaleString('es-CO')}\n\n`;

    const mensaje = `Hola, soy ${nombres} ${apellidos}, he realizado un pedido en la página web Hera Boutique.\n\n` +
                    `Mis datos son:\n` +
                    `Nombres: ${nombres}\n` +
                    `Apellidos: ${apellidos}\n` +
                    `Cédula: ${cedula}\n` +
                    `Correo: ${email}\n` +
                    `Teléfono: ${telefono}\n` +
                    `Ciudad: ${ciudad}\n\n` +
                    `Mi pedido es:\n${resumenCarrito}`; // Agregar el resumen del carrito

    const numeroDestino = "+573235141712";
    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
    localStorage.removeItem('carrito');
}
