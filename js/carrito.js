const pintarCarrito = () => {
    headerContainer.innerHTML = "";
    const headerCarrito = document.createElement("div");
    headerCarrito.className = "headerCarrito"
    headerContainer.style.display = "flex";

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "carrito-main"
        carritoContent.innerHTML = `
        <img class="productoImg" src="${product.imagen}">
        <h5 class="productoTitulo">${product.titulo}</h5>
        <p class="productoPrecio"> <strong>Precio: ${product.precio} $</strong></p>
        <p class="productoCantidad"> <strong>Cantidad: ${product.cantidad}</strong></p>
        <p class="productoTotal"> <strong>Total Cantidad: ${product.cantidad * product.precio}</strong></p>
        `;
        headerContainer.append(carritoContent)

        let eliminar = document.createElement("button");
        eliminar.innerText = "Eliminar Producto❌";
        eliminar.className = "eliminarProducto";
        carritoContent.append(eliminar);
        eliminar.addEventListener("click", eliminarProducto);

    });

    const total = carrito.reduce((acc, elemento) => acc + elemento.precio * elemento.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "compraTotal"
    totalCompra.innerHTML = `
    Total Pago: ${total} $`
    headerContainer.append(totalCompra);

    headerContainer.append(headerCarrito);
    const headerBoton = document.createElement("button");
    headerBoton.innerHTML = "Cerrar Carrito ❌";
    headerBoton.className = "headerBoton";
    headerBoton.addEventListener("click", () => {
        headerContainer.style.display = "none";
    });
    headerContainer.append(headerBoton);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const buscarProducto = carrito.find((Element) => Element.id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarProducto
    });
    pintarCarrito();
    guardarCarrito();

    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Producto Eliminado con Exito',
        showConfirmButton: false,
        timer: 1000
    })
};



