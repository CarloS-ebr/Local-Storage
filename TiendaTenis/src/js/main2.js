import Articulo from "./Articulo.js";
import DataManager from "./DataManager.js";

export function mostrarSeccion(seccion) {
    document.getElementById('quienes-somos').classList.add('d-none');
    document.getElementById('productos').classList.add('d-none');
    document.getElementById('servicios').classList.add('d-none');
    document.getElementById('contacto').classList.add('d-none');

    if (seccion === 'inicio') {
        document.getElementById('quienes-somos').classList.remove('d-none');
    } else if (seccion === 'productos') {
        document.getElementById('productos').classList.remove('d-none');
    } else if (seccion === 'servicios') {
        document.getElementById('servicios').classList.remove('d-none');
    } else if (seccion === 'contacto') {
        document.getElementById('contacto').classList.remove('d-none');
    }
}

const dataManager = new DataManager("Articulos");

document.addEventListener("DOMContentLoaded", function () {
    mostrarSeccion('inicio');

    document.getElementById('btnInicio').addEventListener('click', () => mostrarSeccion('inicio'));
    document.getElementById('btnServicios').addEventListener('click', () => mostrarSeccion('servicios'));
    document.getElementById('btnContacto').addEventListener('click', () => mostrarSeccion('contacto'));

    document.getElementById('btnProductos').addEventListener('click', () => {
        mostrarSeccion('productos');
        listarProductos();
    });

    document.getElementById('btnShowProducts').addEventListener('click', () => {
        listarProductos();
    });
    /*
        // Función para validación INMEDIATA al hacer click
        function validarFormulario() {
            let valido = true;
            let mensajeError = 'Faltan los siguientes campos:\n';
    
            // Validar cada campo individualmente
            if (!document.getElementById('txtIDArticulo').value.trim()) {
                document.getElementById('txtIDArticulo').classList.add('is-invalid');
                mensajeError += '• ID del Artículo\n';
                valido = false;
            }
    
            if (!document.getElementById('marca').value.trim()) {
                document.getElementById('marca').classList.add('is-invalid');
                mensajeError += '• Marca\n';
                valido = false;
            }
    
            if (!document.getElementById('txtPrecio').value.trim()) {
                document.getElementById('txtPrecio').classList.add('is-invalid');
                mensajeError += '• Precio\n';
                valido = false;
            }
    
            if (!document.getElementById('color').value.trim()) {
                document.getElementById('color').classList.add('is-invalid');
                mensajeError += '• Color\n';
                valido = false;
            }
    
            if (!document.getElementById('talla').value.trim()) {
                document.getElementById('talla').classList.add('is-invalid');
                mensajeError += '• Talla\n';
                valido = false;
            }
    
            if (!document.getElementById('stock').value.trim()) {
                document.getElementById('stock').classList.add('is-invalid');
                mensajeError += '• Stock\n';
                valido = false;
            }
    
            if (!document.getElementById('fechaLanzamiento').value.trim()) {
                document.getElementById('fechaLanzamiento').classList.add('is-invalid');
                mensajeError += '• Fecha de Lanzamiento\n';
                valido = false;
            }
    
            // Validar radio buttons
            if (!document.querySelector('input[name="tipoProducto"]:checked')) {
                document.querySelectorAll('input[name="tipoProducto"]').forEach(radio => {
                    radio.parentElement.classList.add('border-danger');
                });
                mensajeError += '• Tipo de Producto\n';
                valido = false;
            }
    
            if (!valido) {
                mostrarMensaje('danger', mensajeError);
                // Enfocar el primer campo con error
                const primerError = document.querySelector('.is-invalid, .border-danger');
                if (primerError) primerError.focus();
            }
    
            return valido;
        }
    */
    // Evento principal del formulario MODIFICADO
    document.getElementById('formProducto').addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Validación INMEDIATA (antes de todo)
        if (!validarFormulario()) {
            return; // Si hay errores, salir inmediatamente
        }

        // 2. Verificar ID duplicado (solo si pasó la validación)
        const idArticulo = document.getElementById('txtIDArticulo').value;
        let articulos = JSON.parse(sessionStorage.getItem('productos')) || [];
        if (articulos.some(articulo => articulo.id === idArticulo)) {
            mostrarMensaje('warning', 'El ID del artículo ya existe. No se puede agregar otro con el mismo ID.');
            return;
        }

        // 3. Si todo está bien, guardar el producto
        const nuevoArticulo = {
            id: idArticulo,
            marca: document.getElementById('marca').value,
            precio: document.getElementById('txtPrecio').value,
            color: document.getElementById('color').value,
            talla: document.getElementById('talla').value,
            stock: document.getElementById('stock').value,
            disponible: document.getElementById('disponible').checked ? 'Sí' : 'No',
            tipoProducto: document.querySelector('input[name="tipoProducto"]:checked').value,
            fechaLanzamiento: document.getElementById('fechaLanzamiento').value
        };

        articulos.push(nuevoArticulo);
        sessionStorage.setItem('productos', JSON.stringify(articulos));

        // Limpiar formulario
        document.getElementById('formProducto').reset();
        document.getElementById('stockOutput').textContent = "0";
        mostrarMensaje('success', 'Producto agregado exitosamente.');
    });

    // Eventos para limpiar errores al escribir
    document.querySelectorAll('#formProducto input, #formProducto select').forEach(elemento => {
        elemento.addEventListener('input', function () {
            this.classList.remove('is-invalid');
            if (this.name === 'tipoProducto') {
                document.querySelectorAll('input[name="tipoProducto"]').forEach(radio => {
                    radio.parentElement.classList.remove('border-danger');
                });
            }
        });
    });
    // Función para resetear todos los errores visuales
    function resetearErrores() {
        // Inputs normales
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });

        // Radio buttons
        document.querySelectorAll('input[name="tipoProducto"]').forEach(radio => {
            radio.parentElement.classList.remove('border-danger');
        });
    }

    document.getElementById('stock').addEventListener('input', function () {
        document.getElementById('stockOutput').textContent = this.value;
    });

    document.getElementById('btnDeleteAllProducts').addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán todos los productos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('productos');
                listarProductos();

                Swal.fire({
                    title: 'Eliminados',
                    text: 'Todos los productos han sido eliminados.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });
});

function listarProductos() {
    const lista = JSON.parse(sessionStorage.getItem('productos')) || [];
    const tablaBody = document.getElementById('tbodyProductos');
    const tablaContenedor = document.getElementById('divListaProductos');

    tablaBody.innerHTML = "";

    if (lista.length === 0) {
        tablaContenedor.style.display = "none";
    } else {
        lista.forEach(articulo => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${articulo.id}</td>
                <td>${articulo.marca}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.color}</td>
                <td>${articulo.talla}</td>
                <td>${articulo.stock}</td>
                <td>${articulo.disponible}</td>
                <td>${articulo.tipoProducto}</td>
                <td>${articulo.fechaLanzamiento}</td>
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
        });

        tablaContenedor.style.display = "block";
    }
}

const tablaBody = document.getElementById('tbodyProductos');
const tablaContenedor = document.getElementById('divListaProductos');

tablaBody.addEventListener("click", function (e) {
    let boton = e.target;
    if (boton.tagName === 'IMG') boton = boton.parentElement;
    if (!boton || boton.tagName !== 'BUTTON') return;

    const fila = boton.closest("tr");

    if (boton.classList.contains("eliminar")) {
        const id = fila.cells[0].innerText;

        const existente = document.getElementById('confirmacionEliminar');
        if (existente) existente.remove();

        const confirmDiv = document.createElement('div');
        confirmDiv.id = 'confirmacionEliminar';
        confirmDiv.classList.add(
            'alert', 'alert-warning', 'fade', 'show',
            'position-fixed', 'top-50', 'start-50',
            'translate-middle', 'text-center'
        );
        confirmDiv.style.zIndex = '9999';
        confirmDiv.innerHTML = `
                <strong>¿Estás seguro de que deseas eliminar este producto?</strong><br>
                <button class="btn btn-sm btn-danger mt-2" id="confirmEliminar">Sí</button>
                <button class="btn btn-sm btn-secondary mt-2 ms-2" id="cancelarEliminar">No</button>
            `;

        document.body.appendChild(confirmDiv);

        document.getElementById('confirmEliminar').addEventListener('click', function () {
            let articulos = JSON.parse(sessionStorage.getItem('productos')) || [];
            const nuevosArticulos = articulos.filter(articulo => articulo.id !== id);
            sessionStorage.setItem('productos', JSON.stringify(nuevosArticulos));

            fila.remove();
            if (tablaBody.rows.length === 0) {
                tablaContenedor.style.display = "none";
            }

            confirmDiv.remove();
            mostrarMensaje('success', 'El producto ha sido eliminado correctamente.');
        });

        document.getElementById('cancelarEliminar').addEventListener('click', function () {
            confirmDiv.remove();
        });

        return;
    }

    if (boton.classList.contains("editar")) {
        // Hacer editable los campos
        const celdas = fila.querySelectorAll("td");
        for (let i = 0; i < celdas.length - 1; i++) {
            const valor = celdas[i].innerText;
            if (i === 0) {
                // El ID es solo lectura
                celdas[i].innerHTML = `<input class="form-control form-control-sm" type="text" value="${valor}" readonly>`;
            } else if (i === 6) {
                celdas[i].innerHTML = `
                        <select class="form-select form-select-sm">
                            <option value="Sí" ${valor === "Sí" ? "selected" : ""}>Sí</option>
                            <option value="No" ${valor === "No" ? "selected" : ""}>No</option>
                        </select>`;
            } else if (i === 7) {
                celdas[i].innerHTML = `
                        <select class="form-select form-select-sm">
                            <option value="Deportivo" ${valor === "Deportivo" ? "selected" : ""}>Deportivo</option>
                            <option value="Casual" ${valor === "Casual" ? "selected" : ""}>Casual</option>
                        </select>`;
            } else {
                celdas[i].innerHTML = `<input class="form-control form-control-sm" type="text" value="${valor}">`;
            }
        }

        const btns = fila.querySelectorAll("button");
        btns[0].innerHTML = `<img src="./src/assets/icon/update.png" alt="Guardar" width="16">`;
        btns[0].classList.remove("editar");
        btns[0].classList.add("guardar");

        btns[1].innerHTML = `<img src="./src/assets/icon/cancel.png" alt="Cancelar" width="16">`;
        btns[1].classList.remove("eliminar");
        btns[1].classList.add("cancelar");

        return;
    }

    if (boton.classList.contains("guardar")) {
        // Guardar cambios
        const id = fila.cells[0].querySelector("input").value;
        const marca = fila.cells[1].querySelector("input").value;
        const precio = fila.cells[2].querySelector("input").value;
        const color = fila.cells[3].querySelector("input").value;
        const talla = fila.cells[4].querySelector("input").value;
        const stock = fila.cells[5].querySelector("input").value;
        const disponible = fila.cells[6].querySelector("select").value;
        const tipoProducto = fila.cells[7].querySelector("select").value;
        const fechaLanzamiento = fila.cells[8].querySelector("input").value;

        // Obtener productos desde sessionStorage
        let articulos = JSON.parse(sessionStorage.getItem('productos')) || [];
        const index = articulos.findIndex(a => a.id === id);

        if (index !== -1) {
            articulos[index] = {
                id,
                marca,
                precio,
                color,
                talla,
                stock,
                disponible,
                tipoProducto,
                fechaLanzamiento
            };

            sessionStorage.setItem('productos', JSON.stringify(articulos));
            listarProductos();
            mostrarMensaje('success', 'Producto actualizado correctamente.');
        }
        else {
            mostrarMensaje('danger', 'Error: Producto no encontrado.');
        }

        return;
    }


    if (boton.classList.contains("cancelar")) {
        // Cancelar edición
        actualizarTabla(); // Volver a mostrar la lista sin cambios
        return;
    }
});

// Función para actualizar la tabla
function actualizarTabla() {
    const articulos = JSON.parse(sessionStorage.getItem('productos')) || [];

    tablaBody.innerHTML = ''; // Limpiar tabla

    articulos.forEach(articulo => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
                <td>${articulo.id}</td>
                <td>${articulo.marca}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.color}</td>
                <td>${articulo.talla}</td>
                <td>${articulo.stock}</td>
                <td>${articulo.disponible}</td>
                <td>${articulo.tipoProducto}</td>
                <td>${articulo.fechaLanzamiento}</td>
                <td>
                    <button class="btn btn-sm editar">
                        <img src="./src/assets/icon/edit.png" alt="Editar" width="16">
                    </button>
                    <button class="btn btn-sm eliminar">
                        <img src="./src/assets/icon/delete.png" alt="Eliminar" width="16">
                    </button>
                </td>
            `;

        tablaBody.appendChild(fila);
    });

    if (articulos.length > 0) {
        tablaContenedor.style.display = "block";
    } else {
        tablaContenedor.style.display = "none";
    }
}
function mostrarMensaje(tipo, mensaje) {
    const alertContainer = document.getElementById('alertContainer');

    // Primero limpiamos cualquier mensaje anterior
    alertContainer.innerHTML = '';

    const alerta = document.createElement('div');
    alerta.classList.add('alert', 'alert-' + tipo, 'alert-dismissible', 'fade', 'show');
    alerta.role = 'alert';
    alerta.innerHTML = `
        <strong>${mensaje}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.add('fade');
        alerta.classList.remove('show');
    }, 5000);
}

document.getElementById('formProducto').addEventListener('submit', function (e) {
    e.preventDefault();

    const idArticulo = document.getElementById('txtIDArticulo').value;
    const marca = document.getElementById('marca').value;
    const precio = document.getElementById('txtPrecio').value;
    const color = document.getElementById('color').value;
    const talla = document.getElementById('talla').value;
    const stock = document.getElementById('stock').value;
    const disponible = document.getElementById('disponible').checked ? 'Sí' : 'No';
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked').value;
    const fechaLanzamiento = document.getElementById('fechaLanzamiento').value;

    if (!idArticulo || !marca || !precio || !color || !talla || !stock || !fechaLanzamiento) {
        mostrarMensaje('danger', 'Por favor, complete todos los campos obligatorios.');
        return;
    }

    let articulos = JSON.parse(sessionStorage.getItem('productos')) || [];

    // Verificar si el ID del artículo ya existe (quitar alert)
    const existeArticulo = articulos.some(articulo => articulo.id === idArticulo);
    if (existeArticulo) {
        mostrarMensaje('warning', 'El ID del artículo ya existe. No se puede agregar otro con el mismo ID.');
        return;
    }

    const nuevoArticulo = {
        id: idArticulo,
        marca,
        precio,
        color,
        talla,
        stock,
        disponible,
        tipoProducto,
        fechaLanzamiento
    };

    articulos.push(nuevoArticulo);
    sessionStorage.setItem('productos', JSON.stringify(articulos));

    document.getElementById('formProducto').reset();
    document.getElementById('stockOutput').textContent = "0";
    mostrarMensaje('success', 'Producto agregado exitosamente.');
});

document.getElementById('btnBuscar').addEventListener('click', function () {
    const termino = document.getElementById('busquedaProducto').value.toLowerCase().trim();
    const filas = tablaBody.getElementsByTagName('tr');

    if (filas.length === 0) {
        mostrarMensaje('warning', 'No hay productos en la base de datos.');
        return;
    }

    let encontrado = false;

    for (let fila of filas) {
        const textoFila = fila.innerText.toLowerCase();
        if (textoFila.includes(termino)) {
            fila.style.display = ""; // Mostrar coincidencia
            encontrado = true;
        } else {
            fila.style.display = "none"; // Ocultar
        }
    }

    if (!encontrado) {
        mostrarMensaje('warning', 'No se encontró ningún producto con ese dato.');
    }
});

