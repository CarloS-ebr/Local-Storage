(function () {
    'use strict';

    // Credenciales válidas (en un caso real esto vendría de una base de datos)
    const VALID_EMAIL = "tenisTienda@gmail.com";
    const VALID_PASSWORD = "tenis";

    // Obtener el formulario
    const loginForm = document.getElementById('loginForm');
    const errorAlert = document.getElementById('loginError');

    // Función para mostrar errores específicos
    function showError(message) {
        errorAlert.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i> ${message}`;
        errorAlert.classList.remove('d-none');
    }

    // Función para limpiar errores
    function clearErrors() {
        errorAlert.classList.add('d-none');
        document.getElementById('txtEmail').classList.remove('is-invalid');
        document.getElementById('idPassword').classList.remove('is-invalid');
    }

    // Evento de submit del formulario
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Limpiar errores previos
        clearErrors();

        // Validación básica del formulario
        if (!loginForm.checkValidity()) {
            loginForm.classList.add('was-validated');
            document.getElementById('txtEmail').focus();
            return;
        }

        // Obtener valores del formulario
        const email = document.getElementById('txtEmail').value.trim();
        const password = document.getElementById('idPassword').value.trim();

        // Validar credenciales con mensajes específicos
        if (email !== VALID_EMAIL) {
            showError('Correo electrónico incorrecto');
            document.getElementById('txtEmail').classList.add('is-invalid');
            document.getElementById('txtEmail').focus();
            return;
        }

        if (password !== VALID_PASSWORD) {
            showError('Contraseña incorrecta');
            document.getElementById('idPassword').classList.add('is-invalid');
            document.getElementById('idPassword').focus();
            return;
        }

        // Si todo es correcto, iniciar sesión
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'Tienda.html';
    });

    // Evento para limpiar errores al editar los campos
    document.getElementById('txtEmail').addEventListener('input', clearErrors);
    document.getElementById('idPassword').addEventListener('input', clearErrors);

    // Verificar si el usuario ya está autenticado
    document.addEventListener("DOMContentLoaded", function () {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            window.location.href = "Tienda.html";
        }

        // Enfocar el campo de email al cargar
        document.getElementById('txtEmail').focus();
    });
})();