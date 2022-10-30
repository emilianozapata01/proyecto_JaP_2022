const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
};

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
};

document.addEventListener("DOMContentLoaded", function validate(e) {
    const boton = document.getElementById("ingBtn");
    boton.addEventListener("click", (registro) => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if ((validEmail.test(email)) > 0 && password.length > 0) {
            localStorage.setItem("correo", email);
            showAlertSuccess()
        } else {
            registro.preventDefault()
            showAlertError()
        }
    })
})