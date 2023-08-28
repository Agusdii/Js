const shopContent = document.getElementById("contenedorProductos");
const verCarrito = document.getElementById("verCarrito");
const headerContainer = document.getElementById("headerContainer");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async () => {
    const response = await fetch("https://agusdii.github.io/Js/data.json");
    const data = await response.json();

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "productos";
        content.innerHTML = `
                <img class="productoImg" src="${product.imagen}">
                <h5 class="productoTitulo">${product.titulo}</h5>
                <p class="productoPrecio"><strong>Precio: ${product.precio} $</strong></p>
                `;
        shopContent.append(content);
        let comprar = document.createElement("button");
        comprar.innerText = "Comprar!";
        comprar.className = "comprar";
        content.append(comprar);
        comprar.addEventListener("click", () => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    titulo: product.titulo,
                    imagen: product.imagen,
                    id: product.id,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
            }
            guardarCarrito();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto Agregado con Exito',
                showConfirmButton: true,
                timer: 1000
            })
        });
    });
};

getProductos();

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
