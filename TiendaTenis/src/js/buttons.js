// src/js/buttons.js

const botones = {
    btnEdit: { id: 'btnEditar', className: 'btn-img', ruta: './src/assets/icon/edit.png', title: 'Editar', alt: 'Editar' },
    btnDelete: { id: 'btnEliminar', className: 'btn-img', ruta: './src/assets/icon/delete.png', title: 'Eliminar', alt: 'Eliminar' },
    btnSave: { id: 'btnGuardar', className: 'btn-img', ruta: './src/assets/icon/update.png', title: 'Guardar', alt: 'Guardar' },
    btnCan: { id: 'btnCancelar', className: 'btn-img', ruta: './src/assets/icon/cancel.png', title: 'Cancelar', alt: 'Cancelar' },
};

function crearBotonesAcciones(parent, imgEl, id, ruta, title) {
    imgEl.id = id;
    imgEl.src = ruta;
    imgEl.title = title;
    imgEl.alt = title;
    imgEl.className = 'btn-img';
    parent.appendChild(imgEl);
}

function cambiarNombreBoton(imgEl, id, ruta, title) {
    imgEl.id = id;
    imgEl.src = ruta;
    imgEl.title = title;
    imgEl.alt = title;
}

// Guardamos las funciones en window para que script.js las vea
window.botones = botones;
window.crearBotonesAcciones = crearBotonesAcciones;
window.cambiarNombreBoton = cambiarNombreBoton;
