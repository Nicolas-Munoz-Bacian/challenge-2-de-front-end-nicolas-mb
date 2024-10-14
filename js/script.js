// Importar función desde el archivo de API
import { enviarProducto } from './api.js';

// Variables Globales
const productsContainer = document.getElementById('products-container');
const productForm = document.getElementById('product-form');
let products = [];

// Iniciar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', init);

// Función para inicializar el listado
async function init() {
    await fetchProducts();
    renderProducts();
}

// Función para obtener productos desde la API
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        products = await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Función para crear la tarjeta de producto
function createProductCard(product) {
    return `
        <div class="card" data-id="${product.id}">
            <img class="image" src="${product.url}" alt="${product.name}"/>
            <div class="card-container--info">
                <p class="name">${product.name}</p>
                <div class="card-container--value">
                    <p class="price">$${product.price}</p>
                    <button class="btn__eliminar__producto" type="button" data-id="${product.id}">
                        <img src="./assets/bote-de-basura.png" alt="Eliminar producto">
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para renderizar productos en el DOM
function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.innerHTML += productCard;
    });
    
    // Añadir eventos de eliminación después de renderizar
    attachDeleteEventListeners();
}

// Función para manejar eventos de eliminación
function attachDeleteEventListeners() {
    document.querySelectorAll('.btn__eliminar__producto').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = button.parentElement.parentElement.parentElement.getAttribute('data-id');
            await deleteProduct(productId);
        });
    });
}

// Función para eliminar un producto
async function deleteProduct(productId) {
    try {
        await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' });
        products = products.filter(product => product.id !== parseInt(productId));
        renderProducts(); // Volver a renderizar la lista de productos
    } catch (error) {
        console.error('Error eliminating product:', error);
    }
}

// Función para enviar un producto al servidor
async function addProduct(producto) {
    try {
        const response = await fetch('http://localhost:3000/products', {  // Asegúrate de que la ruta sea correcta
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el producto');
        }

        return await response.json();
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

// Agregar un evento submit al formulario
productForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

}
