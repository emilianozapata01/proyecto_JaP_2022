function displayCarrito(arrayInicial) {
    let htmlToAppend = "";
    let prod = arrayInicial[0];
    let unit = prod.unitCost;
    let cantidad = 1;
    htmlToAppend = `
    <div class="row border-bottom border-dark m-1">
        <div class="col-2"></div>
        <div class="col-2"><b>Nombre</b></div>
        <div class="col-2"><b>Costo</b></div>
        <div class="col-2"><b>Cantidad</b></div>
        <div class="col-2"><b>Subtotal</b></div>
    </div>
    <div id="prodsCarrito">
        <div class="row border-bottom m-1 p-1 P${prod.id}">
            <div class="col-2"><img src="${prod.image}" class="rounded" style="width: 50%"></div>
            <div class="col-2">${prod.name}</div>
            <div class="col-2">${prod.currency} ${prod.unitCost}</div>
            <div class="col-2">
            <input type="number" value="1" style="width: 50%" id="option${prod.id}" class="border border-secondary" min="1"></div>
            <div class="col-2" id="subtotalProc${prod.id}"><b>${prod.currency}<span id="valorInicial${prod.id}"> ${unit * cantidad}</span></b></div>
            <div class="col-2"><button class="btn btn-danger btn-sm rounded-0 btn${prod.id}" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></div> 
        </div>
    </div>
    <hr>
    <div>
        <h3>Tipo de envío</h3>
        <form action="">
            <input type="radio" id="premium" value="premium" name="envio">
            <label for="premium">Premium 2 a 5 días (%15)</label><br>
            <input type="radio" id="express" value="express" name="envio">
            <label for="express">Express 5 a 8 días (%7)</label><br>
            <input type="radio" id="standard" value="standard" name="envio">
            <label for="standard">Standard 12 a 15 días (%5)</label><br><br>
            <h3>Dirección de envío</h3><br>
            <div class="direccion">
                <div class="direccionItem">
                    <label for="calle">Calle</label><br>
                    <input type="text" id="calle" class="inputCart">
                </div>
                <div class="direccionItem">
                    <label for="numero">Número</label><br>
                    <input type="text" id="numero" class="inputCart">
                </div>
                <div class="direccionItem">
                    <label for="esquina">Esquina</label><br>
                    <input type="text" id="esquina" class="inputCart">
                </div>
            </div>
        </form>
    </div>
    <br>
    <hr>
    <br>
    <h3>Costos</h3>
    <div>
        <div class="row border p-1">
            <div class="col-6">
            <span>Subtotal</span>
            <p class="text-muted small">Costo unitario por cantidad</p>
            </div>
            <div class="col-6">
            <p>USD<span id="totalSubtotal"></span</p>
            </div>
        </div>
        <div class="row border p-1">
            <div class="col-6">
            <span>Costo de envío</span>
            <p class="text-muted small">Según el tipo de envío</p>
            </div>
            <div class="col-6">
            <p>USD<span id="costoEnvio"></span></p>
            </div>
        </div>
        <div class="row border p-1">
            <div class="col-6">
            <span>Total{$}</span>
            </div>
            <div class="col-6">
            <p></p>
            </div>
        </div>
    </div>
    `;
    document.getElementById("carrito").innerHTML = htmlToAppend;
    addELOP(prod, unit);
    let divObjeto = document.getElementsByClassName(`P${prod.id}`);
    let botonEliminar = document.getElementsByClassName(`btn${prod.id}`);
    botonEliminar[0].addEventListener("click", () => {
        let precioActual = JSON.parse(document.getElementById(`valorInicial${prod.id}`).textContent);
        let rellenar = document.getElementById("totalSubtotal");
        let rellenarValor = JSON.parse(document.getElementById("totalSubtotal").textContent);
        rellenar.innerHTML = rellenarValor - precioActual
        divObjeto[0].parentNode.removeChild(divObjeto[0])
    })
    let prods = JSON.parse(localStorage.getItem("prods"))
    principioDeSumaSubtotales(prods, unit)
}


function addELOP(prod, unit) {
    const selectOptions = document.getElementById(`option${prod.id}`)
    selectOptions.addEventListener("change", () => {
        let precioActual = JSON.parse(document.getElementById(`valorInicial${prod.id}`).textContent);
        let cantidad = selectOptions.value
        let result = document.getElementById(`valorInicial${prod.id}`);
        result.innerHTML = `${unit * cantidad}`
        sumaSubtotales(precioActual, unit * cantidad, unit)
    })
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

function principioDeSumaSubtotales(prods, unit) {
    let rellenar = document.getElementById("totalSubtotal");
    let rellenarEnvio = document.getElementById("costoEnvio");
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
            let precioActual = JSON.parse(document.getElementById(`valorInicial${prod.id}`).textContent);
            let rellenar = document.getElementById("totalSubtotal");
            let rellenarValor = JSON.parse(document.getElementById("totalSubtotal").textContent);
            rellenar.innerHTML = rellenarValor - precioActual
            let divselect = document.getElementsByClassName(`P${prod.id}`);
            divselect[0].parentNode.removeChild(divselect[0]);
            let prods1 = JSON.parse(localStorage.getItem("prods"));
            arrayRemove(prods1, prod)
        })
    }
}

function arrayRemove(arr, value) {
    arr.splice(value, 1);
    localStorage.setItem("prods", JSON.stringify(arr))
};

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json").then(r => r.json()).then(d => {
        comprobarOCrearProds()
        let prods = JSON.parse(localStorage.getItem("prods"))
        //para que no hay productos duplicados
        const uniqueIds = [];
        const unique = prods.filter(element => {
            const isDuplicate = uniqueIds.includes(element.id);
            if (!isDuplicate) {
                uniqueIds.push(element.id);
                return true;
            }
            return false;
        });
        localStorage.setItem("prods", JSON.stringify(unique))
        displayCarrito(d.articles)
        ProdsViejosCarrito(unique)
    })
})

//HACE UN ADDEVENTLISTENER PARA CADA INPUT RADIO DE ENVIO