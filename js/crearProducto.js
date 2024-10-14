import { conexionAPI } from "./conexionAPI.js";

// Capturar el formulario usando el data-attribute
const formulario = document.querySelector("[data-formulario]");

async function crearCard(evento) {

    evento.preventDefault();

    // Capturar cada campo del formulario usando data-attributes
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
    const url = document.querySelector("[data-url]").value;

    const descripcion=Math.floor(Math.random*10).toString();

    await conexionAPI.enviarCard(name,descripcion,price,url,image);

    window.location.href="./index.html"

    // Valida que los campos no estén vacíos, en caso contrario no enviar la petición
    if (!name || !price || !image || !url) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        // Llamar a la función para enviar la información a la API
        await conexionAPI.enviarCard(name, price, url, image);

        // Redireccionar después de enviar el producto
        window.location.href = "path/to/envio-concluido.html";
    } catch (error) {
        console.error('Error al crear tarjeta:', error);
    }
}

// Añadir un oyente de eventos al formulario para manejar la presentación del formulario
formulario.addEventListener("submit",evento => crearCard(evento));

// Función para agregar un producto nuevo
async function addProduct(event) {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value.trim();
    const price = document.querySelector("[data-price]").value.trim();
    const url = document.querySelector("[data-url]").value.trim();

    if (!name || !price || !url) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const newProduct = { name, price, url };

    try {
        const savedProduct = await enviarProducto(newProduct);
        products.push(savedProduct);
        renderProducts();
        clearForm();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Función para limpiar el formulario
function clearForm() {
    document.querySelector("[data-name]").value = '';
    document.querySelector("[data-price]").value = '';
    document.querySelector("[data-url]").value = '';
}

// Evento para manejar el envío del formulario
document.querySelector('[data-formulario]').addEventListener('submit', addOrUpdateProduct);

