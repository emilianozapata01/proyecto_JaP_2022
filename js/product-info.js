function showProd(array) {
    let htmlAppend = "";
    let images = "";

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
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="`+ array.images[0] + `" class="d-block w-100 rounded" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="`+ array.images[1] + `" class="d-block w-100 rounded" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="`+ array.images[2] + `" class="d-block w-100 rounded" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="`+ array.images[3] + `" class="d-block w-100 rounded" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
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

function estrellas(com) {
    if (com.score == 0 || com == 0) {
        estrella = `
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    } else if (com.score == 1 || com == 1) {
        estrella = `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    } else if (com.score == 2 || com == 2) {
        estrella = `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    } else if (com.score == 3 || com == 3) {
        estrella = `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    } else if (com.score == 4 || com == 4) {
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
    return estrella;
}

function showComments(objeto) {
    let htmlComm = "";
    for (let com of objeto) {
        let estrella = "";
        htmlComm += `
                <div class="commentsA">
                <p> <b>`+ com.user + `</b> - ` + com.dateTime + ` - ` + estrellas(com) + `</p>
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
    <button type="submit" class="btn btn-primary" id="enviarComm">Enviar</button>
    `;
    document.getElementById("comentar").innerHTML = toda;
    //AddEventListener para añadir el comentario
    let btnSendComment = document.getElementById("enviarComm");
    btnSendComment.addEventListener("click", () => {
        let user = localStorage.getItem("correo")
        let com = document.getElementById("rate").value
        let textarea = document.getElementById("opinion");
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let div = document.createElement("div");
        div.classList.add("commentsA")
        div.innerHTML = `
        <p> <b>`+ user + `</b> - ` + date + ' ' + time + ` - ` + estrellas(com) + `</p>
        <p> `+ textarea.value + `</p>
        `
        document.getElementById("comments").appendChild(div)
    })
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

function agregarEventListenerRelProds(array) {
    for (let i = 0; i < array.length; i++) {
        let RelProd = array[i];
        document.getElementById(RelProd.id).addEventListener("click", () => {
            let RelProdId = RelProd.id;
            localStorage.setItem("Prod", RelProd.id)
            window.scroll(0, 0)
            fetch(`https://japceibal.github.io/emercado-api/products/${RelProdId}.json`).then(res => res.json()).then(d => {
                showProd(d);
                showRelProds(d.relatedProducts);
                agregarEventListenerRelProds(d.relatedProducts);
            })
            fetch(`https://japceibal.github.io/emercado-api/products_comments/${RelProdId}.json`).then(res => res.json()).then(da => {
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