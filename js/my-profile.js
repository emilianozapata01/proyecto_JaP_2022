let email = localStorage.getItem("correo");
let emailInput = document.getElementById("email");
emailInput.value = email;

const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const validPhone = /[0-9]{9}/
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
    if (firstname.value.length > 0 && lastname.value.length > 0 && validEmail.test(emailInput.value) && validPhone.test(phone.value)) {
        localStorage.setItem("infoPerfil", JSON.stringify({
            "firstname": firstname.value,
            "secondname": secondname.value,
            "lastname": lastname.value,
            "secondlastname": secondlastname.value,
            "phone": phone.value
        }));
    }
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

function cambiarPFP() {
    document.getElementById("avatar").addEventListener("change", function () {
        const lector = new FileReader();
        lector.addEventListener("load", () => {
            localStorage.setItem("pfp", lector.result)
            mostrarPFP()
        })
        lector.readAsDataURL(this.files[0]);
    })
}

function mostrarPFP() {
    let PFP = document.getElementById("pfp");
    let localPFP = localStorage.getItem("pfp");
    if (localPFP) {
        PFP.setAttribute("src", localPFP)
    }
}

function hoverPFP() {
    let divTexto = document.getElementById("divChangeImage");
    let div = document.getElementById("divHover");
    div.addEventListener("mouseover", (e) => {
        divTexto.classList.remove("d-none")
    })
    div.addEventListener("mouseleave", (e) => {
        divTexto.classList.add("d-none")
    })
}

document.addEventListener("DOMContentLoaded", () => {
    let checkearLogIn = localStorage.getItem("correo")
    if (checkearLogIn == null || checkearLogIn == undefined) {
        window.location.href = "index.html"
    }
    let infoPerfil = JSON.parse(localStorage.getItem("infoPerfil"))
    if (infoPerfil != null) {
        firstname.value = infoPerfil.firstname;
        secondname.value = infoPerfil.secondname;
        lastname.value = infoPerfil.lastname;
        secondlastname.value = infoPerfil.secondlastname;
        phone.value = infoPerfil.phone;
    }
    cambiarPFP()
    mostrarPFP()
    hoverPFP()
})