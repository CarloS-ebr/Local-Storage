/// Mostrar secciones según el botón clickeado
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.getElementById('quienes-somos').classList.add('d-none');
    document.getElementById('productos').style.display = 'none';
    document.getElementById('servicios').style.display = 'none';
    document.getElementById('contacto').style.display = 'none';

    // Mostrar la sección correspondiente
    if (seccion === 'inicio') {
        document.getElementById('quienes-somos').classList.remove('d-none');
    } else if (seccion === 'productos') {
        document.getElementById('productos').style.display = 'block';
    } else if (seccion === 'servicios') {
        document.getElementById('servicios').style.display = 'block';
    } else if (seccion === 'contacto') {
        document.getElementById('contacto').style.display = 'block';
    }
}

// Mostrar la sección de inicio automáticamente cuando se cargue la página
document.addEventListener("DOMContentLoaded", function() {
    mostrarSeccion('inicio');
});

// Mostrar el formulario de productos
function mostrarFormulario() {
    mostrarSeccion('productos');
}

// Mostrar la tabla de productos
function mostrarTablaProductos() {
    const divListaProductos = document.getElementById('divListaProductos');
    divListaProductos.style.display = 'block';
}

// Ocultar la tabla de productos
function ocultarTablaProductos() {
    const divListaProductos = document.getElementById('divListaProductos');
    divListaProductos.style.display = 'none';
}

// Mostrar el valor del stock en tiempo real
document.getElementById('stock').addEventListener('input', function () {
    document.getElementById('stockOutput').textContent = this.value;
});

// Manejar el envío del formulario para dar de alta productos
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formProducto");
    const tablaBody = document.getElementById("tbodyProductos");
    const tablaContenedor = document.getElementById("divListaProductos");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Formulario enviado");

        const id = document.getElementById("txtIDArticulo").value;
        const marca = document.getElementById("marca").value;
        const precio = document.getElementById("txtPrecio").value;
        const color = document.getElementById("color").value;
        const talla = document.getElementById("talla").value;
        const stock = document.getElementById("stock").value;
        const disponible = document.getElementById("disponible").checked ? "Sí" : "No";
        const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked').value;
        const fecha = document.getElementById("fechaLanzamiento").value;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${id}</td>
            <td>${marca}</td>
            <td>$${parseFloat(precio).toFixed(2)}</td>
            <td>${color}</td>
            <td>${talla}</td>
            <td>${stock}</td>
            <td>${disponible}</td>
            <td>${tipoProducto}</td>
            <td>${fecha}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1 editar">
                  <img src="./src/assets/icon/edit.png" alt="Editar" width="16">
                </button>
                <button class="btn btn-danger btn-sm eliminar">
                  <img src="./src/assets/icon/delete.png" alt="Eliminar" width="16">
                </button>
            </td>
        `;
        tablaBody.appendChild(fila);

        tablaContenedor.style.display = "block";
        form.reset();
        document.getElementById("stockOutput").textContent = "1";

        // Mostrar alerta de producto agregado
        alert("Producto agregado exitosamente!");
    });

    // Delegación de eventos para editar/eliminar/guardar/cancelar
    tablaBody.addEventListener("click", function (e) {
        let boton = e.target;
        if (boton.tagName === 'IMG') boton = boton.parentElement;
        if (!boton || boton.tagName !== 'BUTTON') return;

        const fila = boton.closest("tr");

        // Eliminar
        if (boton.classList.contains("eliminar")) {
            fila.remove();
            if (tablaBody.rows.length === 0) {
                tablaContenedor.style.display = "none";
            }
            return;
        }

      // Cancelar edición
if (boton.classList.contains("cancelar")) {
    // Prevenir el desplazamiento hacia arriba
    e.preventDefault();  // Aquí estamos evitando que el navegador se mueva hacia arriba

    const celdas = fila.querySelectorAll("td");
    for (let i = 0; i < celdas.length - 1; i++) {
        const input = celdas[i].querySelector("input");
        if (input) {
            celdas[i].textContent = input.defaultValue; // Volver al valor original
        }
    }
    // Restaurar botones
    const btnEditar = fila.querySelector(".guardar");
    btnEditar.classList.replace("guardar", "editar");
    btnEditar.innerHTML = `<img src="./src/assets/icon/edit.png" alt="Editar" width="16">`;

    boton.classList.replace("cancelar", "eliminar");
    boton.innerHTML = `<img src="./src/assets/icon/delete.png" alt="Eliminar" width="16">`;

    return;
}

        // Editar → cambiar a Guardar
        if (boton.classList.contains("editar")) {
            // Prevenir el desplazamiento hacia arriba
            e.preventDefault();  // Aquí estamos evitando que el navegador se mueva hacia arriba
        
            const celdas = fila.querySelectorAll("td");
            for (let i = 1; i < celdas.length - 1; i++) {
                const valor = celdas[i].innerText;
                celdas[i].innerHTML = `<input type="text" value="${valor}" class="form-control form-control-sm">`;
                celdas[i].querySelector("input").defaultValue = valor; // Guardar valor original
            }
            boton.classList.replace("editar", "guardar");
            boton.innerHTML = `<img src="./src/assets/icon/update.png" alt="Guardar" width="16">`;
        
            // Cambiar botón Eliminar → Cancelar
            const btnEliminar = fila.querySelector(".eliminar");
            if (btnEliminar) {
                btnEliminar.classList.replace("eliminar", "cancelar");
                btnEliminar.innerHTML = `<img src="./src/assets/icon/cancel.png" alt="Cancelar" width="16">`;
            }
        
            return;
        }

        // Guardar → volver a Editar
        if (boton.classList.contains("guardar")) {
            const celdas = fila.querySelectorAll("td");
            for (let i = 0; i < celdas.length - 1; i++) {
                const input = celdas[i].querySelector("input");
                if (input) {
                    celdas[i].textContent = input.value;
                }
            }
            boton.classList.replace("guardar", "editar");
            boton.innerHTML = `<img src="./src/assets/icon/edit.png" alt="Editar" width="16">`;

            const btnCancelar = fila.querySelector(".cancelar");
            if (btnCancelar) {
                btnCancelar.classList.replace("cancelar", "eliminar");
                btnCancelar.innerHTML = `<img src="./src/assets/icon/delete.png" alt="Eliminar" width="16">`;
            }

            alert("Cambios guardados");
        }
    });
});
