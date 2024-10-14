const lista = document.querySelector("[data-lista]")

function crearCard (titulo,descripcion,precio,url){
    const producto = document.createElement("div");
    producto.className="card";
    producto.innerHTML=`            <div class="card" data-id="${product.id}">
                <img class="image" src="${product.imagen}" alt="${product.name}"/>
                <div class="card-container--info">
                    <p class="name">${product.titulo}</p>
                    <div class="card-container--value">
                        <p class="price">$${product.precio}</p>
                        <button class="btn__eliminar__producto" type="button">
                            <img src="./assets/bote-de-basura.png" alt="Eliminar producto">
                        </button>
                    </div>
                </div>
            </div>`;

                      return producto;
}

async function listarProductos(){
    const listAPI = await conexionAPI.listarProductos()

    listAPI.array.forEach(product => lista.appendChild(crearCard(product.titulo, product.descripcion, product.precio, product.url))
        
    );
}