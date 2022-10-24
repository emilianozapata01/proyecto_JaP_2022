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
            <div class="col-2"><select class="form-select" aria-label="" style="width: 50%" id="option${prod.id}">
                                    <option selected value="1" id="op1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select></div>
            <div class="col-2" id="subtotalProc${prod.id}"><b>${prod.currency} ${unit * cantidad}</b></div>
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
    `;
    document.getElementById("carrito").innerHTML = htmlToAppend;
    addELOP(prod, unit);
    let divObjeto = document.getElementsByClassName(`P${prod.id}`);
    let botonEliminar = document.getElementsByClassName(`btn${prod.id}`);
    botonEliminar[0].addEventListener("click", () => {
        divObjeto[0].parentNode.removeChild(divObjeto[0])
    })
}

function addELOP(prod, unit) {
    const selectOptions = document.getElementById(`option${prod.id}`)
    selectOptions.addEventListener("change", () => {
        let cantidad = selectOptions.value
        let result = document.getElementById(`subtotalProc${prod.id}`);
        result.innerHTML = `<b>${prod.currency} ${unit * cantidad}</b>`
    })
}

function nuevoProd(arrayProd) {
    if (localStorage.getItem("ProdCompra") == null) {
    } else {
        let unit = arrayProd.cost;
        let cantidad = 1;
        let htmlToCreate = `
            <div class="col-2"><img src="${arrayProd.images[0]}" class="rounded" style="width: 50%"></div>
            <div class="col-2">${arrayProd.name}</div>
            <div class="col-2">${arrayProd.currency} ${arrayProd.cost}</div>
            <div class="col-2"><select class="form-select" aria-label="" style="width: 50%" id="option${arrayProd.id}">
                                    <option selected value="1" id="op1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select></div>
            <div class="col-2" id="subtotalProc${arrayProd.id}"><b>${arrayProd.currency} ${unit * cantidad}</b></div>
            <div class="col-2"><button class="btn btn-danger btn-sm rounded-0 btn${arrayProd.id}" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></div> 
    `
        let divCarrito = document.getElementById("prodsCarrito");
        let divCreado = document.createElement("div");
        divCarrito.appendChild(divCreado)
        divCreado.classList.add("row", "border-bottom", "m-1", "p-1", `P${arrayProd.id}`)
        divCreado.innerHTML = htmlToCreate
        addELOP(arrayProd, unit)
        let prods = JSON.parse(localStorage.getItem("prods"))
        prods.push(arrayProd)
        localStorage.setItem("prods", JSON.stringify(prods))
        localStorage.removeItem("ProdCompra")
        let botonEliminar = document.getElementsByClassName(`btn${arrayProd.id}`);
        botonEliminar[0].addEventListener("click", () => {
            let divselect = document.getElementsByClassName(`P${arrayProd.id}`);
            divselect[0].parentNode.removeChild(divselect[0])
            let prods1 = JSON.parse(localStorage.getItem("prods"));
            arrayRemove(prods1, arrayProd)
        })
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
            <div class="col-2"><select class="form-select" aria-label="" style="width: 50%" id="option${prod.id}">
                                    <option selected value="1" id="op1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select></div>
            <div class="col-2" id="subtotalProc${prod.id}"><b>${prod.currency} ${unit * cantidad}</b></div>
            <div class="col-2"><button class="btn btn-danger btn-sm rounded-0 btn${prod.id}" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></div> 
    `
        let divCarrito = document.getElementById("prodsCarrito");
        let divCreado = document.createElement("div");
        divCarrito.appendChild(divCreado)
        divCreado.classList.add("row", "border-bottom", "m-1", "p-1", `P${prod.id}`)
        divCreado.innerHTML = htmlToCreate
        addELOP(prod, unit)
        let botonEliminar = document.getElementsByClassName(`P${prod.id}`)
        botonEliminar[0].addEventListener("click", () => {
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
        displayCarrito(d.articles)
        comprobarOCrearProds()
        let prods = JSON.parse(localStorage.getItem("prods"))
        ProdsViejosCarrito(prods)
        let arrayProd = JSON.parse(localStorage.getItem("ProdCompra"));
        if (arrayProd !== null || arrayProd !== undefined) {
            nuevoProd(arrayProd)
        }
    })
})