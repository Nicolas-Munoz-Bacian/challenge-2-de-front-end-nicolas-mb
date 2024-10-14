// api.js

// Obtener los productos desde la API
export async function listarProductos() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Error al listar productos.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al listar productos:', error);
        return []; // Retorna un arreglo vacío en caso de error
    }
}

// Enviar un nuevo producto a la API
export async function enviarProducto(producto) {
    // Lógica para enviar un producto
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el producto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al enviar el producto:', error);
        throw error; // Lanza el error para manejarlo en el lugar de llamada
    }
}

// Eliminar un producto específico por ID
export async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        return true; // Retorna true si la operación es exitosa
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error; // Lanza el error para manejarlo en el lugar de llamada
    }
}

// Actualizar un producto por ID
export async function actualizarProducto(id, productoActualizado) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizado)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error; // Lanza el error para manejarlo en el lugar que invoca
    }
}
