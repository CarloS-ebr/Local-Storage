(function () {
    'use strict';

    // Obtener todos los formularios con la clase 'needs-validation'
    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                // Prevenir el envío del formulario
                event.preventDefault();

                // Obtener los valores del email y la contraseña
                var email = document.getElementById('txtEmail').value.trim();
                var password = document.getElementById('idPassword').value.trim();
                var errorAlert = document.getElementById('loginError'); // Seleccionar el div del mensaje de error

                // Ocultar el error al principio
                errorAlert.classList.add('d-none');

                // Validación del formulario
                if (!form.checkValidity()) {
                    event.stopPropagation(); // Evitar que se propague si el formulario no es válido
                } else {
                    // Comprobación de las credenciales
                    if (email === 'tenisTienda@gmail.com' && password === 'tenis') {
                        // Si las credenciales son correctas, redirigir a la página de la tienda
                        window.location.href = 'tienda.html';
                    } else {
                        // Si las credenciales son incorrectas, mostrar el mensaje de error
                        errorAlert.classList.remove('d-none');
                    }
                }

                // Añadir la clase 'was-validated' para mostrar los estilos de validación
                form.classList.add('was-validated');
            }, false);
        });
})();
