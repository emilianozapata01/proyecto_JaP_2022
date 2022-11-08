let email = localStorage.getItem("correo");
let emailInput = document.getElementById("email");
emailInput.value = email;

const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const validPhone = /[0-9]{3}-[0-9]{3}-[0-9]{3}/
let form = document.forms.form;
let firstname = document.getElementById("firstname");
let secondname = document.getElementById("secondname");
let lastname = document.getElementById("lastname");
let secondlastname = document.getElementById("secondlastname");
let phone = document.getElementById("phone");
let btnForm = document.getElementById("enviar");
btnForm.addEventListener("click", (e) => {
    e.preventDefault()
    validar(firstname.value.length > 0, firstname);
    validar(lastname.value.length > 0, lastname);
    validar(validEmail.test(emailInput.value), emailInput)
    validar(validPhone.test(phone.value), phone)
    form.addEventListener("input", () => {
        validar(firstname.value.length > 0, firstname);
        validar(lastname.value.length > 0, lastname);
        validar(validEmail.test(emailInput.value), emailInput)
        validar(validPhone.test(phone.value), phone)
    })
})

function validar(condicion, elemento) {
    if (condicion) {
        elemento.classList.add("is-valid");
        elemento.classList.add("border-success");
        elemento.classList.remove("is-invalid");
        elemento.classList.remove("border-danger");
    } else {
        elemento.classList.remove("is-valid");
        elemento.classList.remove("border-success");
        elemento.classList.add("is-invalid");
        elemento.classList.add("border-danger");
    }
}