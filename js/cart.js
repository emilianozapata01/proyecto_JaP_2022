function displayCarrito(arrayInicial) {
    let htmlToAppend = "";
    let prod = arrayInicial[0];
    let unit = prod.unitCost;
    let cantidad = 1;
    htmlToAppend = `
        <div class="row border-bottom m-1 p-1 P${prod.id}">
            <div class="col-2"><img src="${prod.image}" class="rounded" style="width: 50%"></div>
            <div class="col-2">${prod.name}</div>
            <div class="col-2">${prod.currency} ${prod.unitCost}</div>
            <div class="col-2">
            <input type="number" value="1" style="width: 50%" id="option${prod.id}" class="border border-secondary" min="1"></div>
            <div class="col-2" id="subtotalProc${prod.id}"><b>${prod.currency}<span id="valorInicial${prod.id}"> ${unit * cantidad}</span></b></div>
            <div class="col-2"><button class="btn btn-danger btn-sm rounded-0 btn${prod.id}" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></div> 
        </div>
    `;
    document.getElementById("prodsCarrito").innerHTML = htmlToAppend;
    addELOP(prod, unit);
    let divObjeto = document.getElementsByClassName(`P${prod.id}`);
    let botonEliminar = document.getElementsByClassName(`btn${prod.id}`);
    botonEliminar[0].addEventListener("click", () => {
        eliminarPrecioProd(prod)
        divObjeto[0].parentNode.removeChild(divObjeto[0])
        sumaEnvio()
        precioTotal()
    })
    let prods = JSON.parse(localStorage.getItem("prods"))
    principioDeSumaSubtotales(prods, unit)
    //Envio
    sumaEnvio()
    // Total
    precioTotal()
}

function principioDeSumaSubtotales(prods, unit) {
    let rellenar = document.getElementById("totalSubtotal");
    if (prods.length == 0) {
        rellenar.innerHTML = unit
    } else {
        let suma = 0;
        for (let prod of prods) {
            suma += prod.cost
        }
        suma += unit
        rellenar.innerHTML = suma
    }
}

function sumaSubtotales(precioActual, loQueSale, unidad) {
    let rellenar = document.getElementById("totalSubtotal");
    let rellenarValor = JSON.parse(document.getElementById("totalSubtotal").textContent);
    if (loQueSale > precioActual) {
        rellenar.innerHTML = rellenarValor + unidad
    } else {
        rellenar.innerHTML = rellenarValor - unidad
    }
}

function eliminarPrecioProd(prod) {
    let precioActual = JSON.parse(document.getElementById(`valorInicial${prod.id}`).textContent);
    let rellenar = document.getElementById("totalSubtotal");
    let rellenarValor = JSON.parse(document.getElementById("totalSubtotal").textContent);
    rellenar.innerHTML = rellenarValor - precioActual
}

function sumaEnvio() {
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let standard = document.getElementById("standard");
    let subtotalValor = JSON.parse(document.getElementById("totalSubtotal").textContent);
    let costoEnvio = document.getElementById("costoEnvio")
    if (subtotalValor == 0) {
        costoEnvio.innerHTML = 0
    } else if (premium.checked) {
        costoEnvio.innerHTML = Math.round(subtotalValor * 0.15);
    } else if (express.checked) {
        costoEnvio.innerHTML = Math.round(subtotalValor * 0.07);
    } else if (standard.checked) {
        costoEnvio.innerHTML = Math.round(subtotalValor * 0.05);
    } else {
        costoEnvio.innerHTML = 0
    }
    premium.addEventListener("click", () => {
        costoEnvio.innerHTML = Math.round(subtotalValor * 0.15);
        precioTotal()
    })
    express.addEventListener("click", () => {
        costoEnvio.innerHTML = Math.round(subtotalValor * 0.07);
        precioTotal()
    })
    standard.addEventListener("click", () => {
        costoEnvio.innerHTML = Math.round(subtotalValor * 0.05);
        precioTotal()
    })
}

function precioTotal() {
    let costoEnvio = JSON.parse(document.getElementById("costoEnvio").textContent);
    let subtotalValor = JSON.parse(document.getElementById("totalSubtotal").textContent);
    let costoTotalSpan = document.getElementById("costoTotal");
    let costoTotal = costoEnvio + subtotalValor;
    costoTotalSpan.innerHTML = costoTotal
}

function addELOP(prod, unit) {
    const selectOptions = document.getElementById(`option${prod.id}`)
    selectOptions.addEventListener("change", () => {
        let precioActual = JSON.parse(document.getElementById(`valorInicial${prod.id}`).textContent);
        let cantidad = selectOptions.value
        let result = document.getElementById(`valorInicial${prod.id}`);
        result.innerHTML = `${unit * cantidad}`
        sumaSubtotales(precioActual, unit * cantidad, unit)
        sumaEnvio()
        precioTotal()
    })
}

function comprobarOCrearProds() {
    let comprobar = JSON.parse(localStorage.getItem("prods"));
    if (comprobar == null || comprobar == undefined) {
        let prods = [];
        localStorage.setItem("prods", JSON.stringify(prods))
    }
}

function ProdsViejosCarrito(prods) {
    for (let prod of prods) {
        let unit = prod.cost;
        let cantidad = 1;
        let htmlToCreate = `
            <div class="col-2"><img src="${prod.images[0]}" class="rounded" style="width: 50%"></div>
            <div class="col-2">${prod.name}</div>
            <div class="col-2">${prod.currency} ${prod.cost}</div>
            <div class="col-2">
            <input type="number" value="1" style="width: 50%" id="option${prod.id}" class="border border-secondary" min="1"></div>
            <div class="col-2" id="subtotalProc${prod.id}"><b>${prod.currency}<span id="valorInicial${prod.id}">${unit * cantidad}</span></b></div>
            <div class="col-2"><button class="btn btn-danger btn-sm rounded-0 btn${prod.id}" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></div> 
    `
        let divCarrito = document.getElementById("prodsCarrito");
        let divCreado = document.createElement("div");
        divCarrito.appendChild(divCreado)
        divCreado.classList.add("row", "border-bottom", "m-1", "p-1", `P${prod.id}`)
        divCreado.innerHTML = htmlToCreate
        addELOP(prod, unit)
        let botonEliminar = document.getElementsByClassName(`btn${prod.id}`)
        botonEliminar[0].addEventListener("click", () => {
            eliminarPrecioProd(prod)
            let divselect = document.getElementsByClassName(`P${prod.id}`);
            divselect[0].parentNode.removeChild(divselect[0]);
            let prods1 = JSON.parse(localStorage.getItem("prods"));
            arrayRemove(prods1, prod)
            sumaEnvio()
            precioTotal()
        })
    }
}

function arrayRemove(arr, value) {
    arr.splice(value, 1);
    localStorage.setItem("prods", JSON.stringify(arr))
};

function addELToMetodoPago() {
    let cc = document.getElementById("cc");
    let banco = document.getElementById("banco");
    let ccn = document.getElementById("ccn");
    let cccsn = document.getElementById("cccsn");
    let cced = document.getElementById("cced");
    let accn = document.getElementById("accn");
    let pagoSelect = document.getElementById("pagoSelect")
    cc.addEventListener("change", () => {
        if (cc.checked) {
            pagoSelect.innerHTML = "Tarjeta de crédito"
            accn.classList.remove("border-1", "border-primary")
            ccn.classList.add("border-1", "border-primary")
            cccsn.classList.add("border-1", "border-primary")
            cced.classList.add("border-1", "border-primary")
            ccn.removeAttribute("disabled")
            cccsn.removeAttribute("disabled")
            cced.removeAttribute("disabled")
            accn.setAttribute("disabled", "true")
        }
    })
    banco.addEventListener("change", () => {
        if (banco.checked) {
            pagoSelect.innerHTML = "Transferencia Bancaria"
            ccn.classList.remove("border-1", "border-primary")
            cccsn.classList.remove("border-1", "border-primary")
            cced.classList.remove("border-1", "border-primary")
            accn.classList.add("border-1", "border-primary")
            accn.removeAttribute("disabled")
            ccn.setAttribute("disabled", "true")
            cccsn.setAttribute("disabled", "true")
            cced.setAttribute("disabled", "true")
        }
    })
}

function verificarValidez(ok, field) {
    if (ok) {
        document.getElementById(`${field}`).classList.remove('is-invalid');
        document.getElementById(`${field}`).classList.add('is-valid');
        document.getElementById(`${field}`).classList.remove('error-compra');
    } else {
        document.getElementById(`${field}`).classList.remove('is-valid');
        document.getElementById(`${field}`).classList.add('is-invalid');
        document.getElementById(`${field}`).classList.add('error-compra');
    };
}

function feedback(e) {
    //1
    let premium = document.getElementById("premium");
    let standard = document.getElementById("standard");
    let express = document.getElementById("express");
    if (premium.checked) { verificarValidez(true, "standard") } else if (express.checked) { verificarValidez(true, "standard") } else if (standard.checked) { verificarValidez(true, "standard") } else {
        verificarValidez(false, "standard")
    }

    //2
    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let esquina = document.getElementById("esquina");
    verificarValidez(calle.value.length > 0, "calle");
    verificarValidez(numero.value.length > 0, "numero");
    verificarValidez(esquina.value.length > 0, "esquina")
    //3
    let cc = document.getElementById("cc");
    let banco = document.getElementById("banco");
    let ccn = document.getElementById("ccn");
    let cccsn = document.getElementById("cccsn");
    let cced = document.getElementById("cced");
    let accn = document.getElementById("accn");
    let enviarForm = document.getElementById("enviarForm")
    let patternccn = /[0-9\s]{13,19}/
    let patternccsn = /[0-9]{3}/
    if (cc.checked) {
        verificarValidez(patternccn.test(ccn.value), "ccn")
        verificarValidez(patternccsn.test(cccsn.value), "cccsn")
        verificarValidez(cced.value.length > 0, "cced")
        verificarValidez(patternccn.test(ccn.value), "enviarForm")
        verificarValidez(patternccsn.test(cccsn.value), "enviarForm")
        verificarValidez(cced.value.length > 0, "enviarForm")
        // verificarValidez(true, "enviarForm")
        verificarValidez(true, "accn")
    } else if (banco.checked) {
        verificarValidez(accn.value > 0, "accn")
        verificarValidez(accn.value > 0, "enviarForm")
        verificarValidez(true, "ccn")
        verificarValidez(true, "cccsn")
        verificarValidez(true, "cced")
    } else {
        verificarValidez(false, "enviarForm")
    }
    if (!(standard.className.includes("is-invalid") || calle.className.includes("is-invalid") ||
        numero.className.includes("is-invalid") || esquina.className.includes("is-invalid") ||
        ccn.className.includes("is-invalid") || cccsn.className.includes("is-invalid") ||
        cced.className.includes("is-invalid") || accn.className.includes("is-invalid") ||
        enviarForm.className.includes("is-invalid"))) {
        showAlertSuccess()
    }
}

function validationForms() {
    let form1 = document.getElementById("formPrin")
    form1.addEventListener("submit", (e) => {
        e.preventDefault()
        feedback()
    })
}

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
};

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json").then(r => r.json()).then(d => {
        comprobarOCrearProds()
        let prods = JSON.parse(localStorage.getItem("prods"))
        //para que no haya productos duplicados
        const uniqueIds = [];
        const unique = prods.filter(element => {
            const isDuplicate = uniqueIds.includes(element.id);
            if (!isDuplicate) {
                uniqueIds.push(element.id);
                return true;
            }
            return false;
        });
        localStorage.setItem("prods", JSON.stringify(unique));
        displayCarrito(d.articles);
        ProdsViejosCarrito(unique);
        addELToMetodoPago()
        validationForms()
    })
})