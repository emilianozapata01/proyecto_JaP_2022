function showProd(array) {
    let htmlAppend = "";
    let images = "";

    for (let imagen of array.images) {
        images += `<img class="prodImagenesSingle" src="` + imagen + `">`;
    }

    htmlAppend = `
        <br>
        <div class="ttbtn">
        <h1>` + array.name + `</h1> <button id="btnComprar" type="button" class="btn btn-success">Comprar</button>
        </div>
        <hr>
        <b>Precio</b>
        <p>`+ array.currency + ` ` + array.cost + `</p>
        <b>Descripción</b>
        <p>`+ array.description + `</p>
        <b>Categoría</b>
        <p>`+ array.category + `</p>
        <b>Cantidad de Vendidos</b>
        <p>`+ array.soldCount + `</p>
        <b>Imágenes ilustrativas</b>
        <div class="prodImagenes">
            `+ images + `
        </div>
        <br>
        <br>
        <h2>Comentarios</h2>
        <br>
        <div id="comments">
        </div>
        <br>
        <div id="comentar">
        </div>
        <br>
        <hr>
        <br>
        <h3>Productos relacionados</h3>
        <br>
        <div id="relProds" class="d-flex flex-row bd-highlight mb-3 gap-3">
        </div>
    `;

    document.getElementById("prodInd").innerHTML = htmlAppend;
    let comprar = document.getElementById("btnComprar");
    comprar.addEventListener("click", () => {
        // localStorage.setItem("ProdCompra", JSON.stringify(array));
        let comprobar = JSON.parse(localStorage.getItem("prods"));
        if (comprobar == null || comprobar == undefined) {
            let prods = [];
            prods.push(array)
            localStorage.setItem("prods", JSON.stringify(prods))
        } else {
            comprobar.push(array)
            localStorage.setItem("prods", JSON.stringify(comprobar))
        }
        window.location.href = "cart.html"
    })
}

function showComments(objeto) {
    let htmlComm = "";
    console.log(objeto)
    for (let com of objeto) {
        let estrella = "";
        if (com.score == 0) {
            estrella = `
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
        } else if (com.score == 1) {
            estrella = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
        } else if (com.score == 2) {
            estrella = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
        } else if (com.score == 3) {
            estrella = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
        } else if (com.score == 4) {
            estrella = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`
        } else {
            estrella = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`
        }
        htmlComm += `
                <div class="commentsA">
                <p> <b>`+ com.user + `</b> - ` + com.dateTime + ` - ` + estrella + `</p>
                <p> `+ com.description + `</p>
                </div>    `
    }

    document.getElementById("comments").innerHTML += htmlComm;
}

function addComm() {
    let toda = "";
    toda = `
    <h3>Comentar</h3>
    <p>Tu opinión</p>
    <textarea name="comments" id="opinion" cols="50" rows="4"></textarea>
    <br>
    <br>
    <label for="rate">Tu Puntuación</label>
    <select name="rate" id="rate">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <br>
    <br>
    <button type="submit" class="btn btn-primary">Enviar
    `;

    document.getElementById("comentar").innerHTML = toda;
}

function showRelProds(rp) {
    let htmlRelProds = "";
    for (let pr of rp) {
        htmlRelProds = `
    <div class="card" role="button" id="${pr.id}" style="width: 18rem;">
        <img src="${pr.image}" class="card-img-top">
        <h4 class="card-body">${pr.name}</h4>
    </div>
    `
        document.getElementById("relProds").innerHTML += htmlRelProds;
    }
}

function guardarProdComprado() {

}

function agregarEventListenerRelProds(array) {
    for (let i = 0; i < array.length; i++) {
        let prod = array[i];
        document.getElementById(prod.id).addEventListener("click", () => {
            let Prodi = prod.id;
            localStorage.setItem("Prod", prod.id)
            window.scroll(0, 0)
            fetch(`https://japceibal.github.io/emercado-api/products/${Prodi}.json`).then(r => r.json()).then(d => {
                showProd(d);
                showRelProds(d.relatedProducts);
                agregarEventListenerRelProds(d.relatedProducts);
            })
            fetch(`https://japceibal.github.io/emercado-api/products_comments/${Prodi}.json`).then(re => re.json()).then(da => {
                showComments(da);
                addComm();
            })
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let Prod = localStorage.getItem("Prod");
    fetch(`https://japceibal.github.io/emercado-api/products/${Prod}.json`).then(r => r.json()).then(d => {
        showProd(d);
        showRelProds(d.relatedProducts);
        agregarEventListenerRelProds(d.relatedProducts);
    })
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${Prod}.json`).then(re => re.json()).then(da => {
        showComments(da);
        addComm();
    })
})