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

        if ((email.length) > 0 && password.length > 0) {
            showAlertSuccess()
        } else {
            registro.preventDefault()
            showAlertError()
        }
    })
})