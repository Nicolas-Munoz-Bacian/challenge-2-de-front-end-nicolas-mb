export async function enviarProducto(producto) {
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
        console.error('API error:', error);
        throw error;
    }
}
const nuevoProducto = {
    name: "Nuevo Producto",
    image: "https://example.com/image3.jpg",
    price: 300
  };
  
  enviarProducto(nuevoProducto)
    .then(data => {
      console.log("Producto enviado correctamente:", data);
      // Actualizar la interfaz de usuario o realizar otras acciones
    })
    .catch(error => {
      console.error("Error al enviar el producto:", error);
      // Mostrar un mensaje de error al usuario
    });