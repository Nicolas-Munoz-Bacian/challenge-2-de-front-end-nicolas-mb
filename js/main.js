import { enviarProducto, eliminarProducto, listarProductos } from './api.js';

const productsContainer = document.getElementById('products-container');

// Iniciar la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderProducts();
});

// Función para obtener y renderizar productos de la API
async function fetchAndRenderProducts() {
    const products = await listarProductos();
    renderProducts(products);
}

// Función para renderizar productos en el DOM
function renderProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.innerHTML += productCard;
    });

    // Añadir eventos de eliminación
    addDeleteEventListeners();
}

// Crear el HTML de cada tarjeta de producto
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

// Añadir eventos de eliminación a los botones
function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.btn__eliminar__producto');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = button.getAttribute('data-id');
            await deleteProduct(productId);
        });
    });
}

// Manejar eliminación de producto
async function deleteProduct(productId) {
    try {
        await eliminarProducto(productId);
        await fetchAndRenderProducts(); // Refrescar los productos después de la eliminación
    } catch (error) {
        console.error('Error eliminando producto:', error);
    }
}

// Función para agregar un producto nuevo
document.querySelector('[data-formulario]').addEventListener('submit', async (event) => {
    event.preventDefault();
    await addProduct();
});

// Agregar producto
async function addProduct() {
    const name = document.querySelector("[data-name]").value.trim();
    const price = document.querySelector("[data-price]").value.trim();
    const url = document.querySelector("[data-url]").value.trim();
    const id = document.getElementById("edit-product-id").value = product.id; // Establecer el ID en el input oculto

    if (!name || !price || !url) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const newProduct = { name, price, url };

    try {
        const savedProduct = await enviarProducto(newProduct);
        products.push(savedProduct); // Agregar producto a la lista local
        await fetchAndRenderProducts(); // Refrescar la lista de productos
        clearForm(); // Limpiar el formulario
    } catch (error) {
        console.error('Error agregando producto:', error);
    }
}

// Limpiar el formulario
function clearForm() {
    document.querySelector("[data-name]").value = '';
    document.querySelector("[data-price]").value = '';
    document.querySelector("[data-url]").value = '';
}

function addEditEventListeners() {
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const productId = card.getAttribute('data-id');
            const product = products.find(p => p.id == productId); // Encuentra el producto en el array
            if (product) {
                loadProductToEdit(product); // Carga el producto en el formulario
            }
        });
    });
}

