// API functions

async function listarProductos() {
    try {
        const response = await fetch("http://localhost:3000/products");
        return await response.json();
    } catch (error) {
        console.error('Error al listar productos:', error);
        return []; // Retorna un arreglo vacío en caso de error
    }
}

async function enviarCard(titulo, price, url, imagen) {
    try {
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: titulo,
                price: price,
                url: url,
                imagen: imagen
            })
        });

        if (!response.ok) {
            throw new Error('Error al enviar producto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al enviar producto:', error);
        throw error; // Lanza el error para que pueda ser manejado más adelante
    }
}

async function buscarProductos(palabraClave) {
    try {
        const response = await fetch(`http://localhost:3000/products?q=${palabraClave}`);
        return await response.json();
    } catch (error) {
        console.error('Error al buscar productos:', error);
        return []; // Retorna un arreglo vacío en caso de error
    }
}

export const conexionAPI = {
    listarProductos,
    enviarCard,
    buscarProductos
};

// Función para crear un producto desde el formulario
async function crearCard(evento) {
    evento.preventDefault(); // Evita el comportamiento predeterminado

    // Capturar cada valor de input
    const name = document.querySelector("[data-name]").value; // Nombre del producto
    const price = document.querySelector("[data-price]").value; // Precio del producto
    const image = document.querySelector("[data-image]").value; // URL de la imagen
    const url = document.querySelector("[data-url]").value; // Otro campo que puedas necesitar

    // Validación básica de campos vacíos
    if (!name || !price || !image || !url) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        // Llamada a la API para enviar el producto nuevo
        await conexionAPI.enviarCard(name, price, url, image);

        // Redireccionar o notificar al usuario que la operación fue exitosa
        window.location.href = "path/to/envio-concluido.html"; 
    } catch (error) {
        // Manejo de posibles errores en la operación
        console.error('Error al crear producto:', error);
        alert('Ocurrió un error al intentar crear el producto.'); // Puede notificar al usuario
    }
}

// Agregar evento al formulario (Ejecutar al cargar el DOM)
document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    productForm.addEventListener("submit", crearCard); // Agregar manejador de evento al formulario
});
