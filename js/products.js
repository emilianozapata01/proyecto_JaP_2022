const getcatID = localStorage.getItem("catID");
const CatURL = `https://japceibal.github.io/emercado-api/cats_products/${getcatID}.json`;

let categoriesArray = [];

function showCategoriesList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + " - " + category.currency + " " + category.cost + `</h4> 
                        <p> `+ category.description + `</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("catAutos").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(CatURL).then(response => response.json()).then(data => {
        categoriesArray = data.products;
        showCategoriesList(categoriesArray);
    });
});

//FILTRO ------------------------------------------------------------------
const precioAsc = document.getElementById("sortAsc");
const precioDesc = document.getElementById("sortDesc");
const botonFiltro = document.getElementById("rangeFilterCount");
botonFiltro.addEventListener("click", e => {
    fetch(CatURL).then(response => response.json()).then(data => {
        categoriesArray = data.products;
    });
    const precioMayor = document.getElementById("rangeFilterCountMax").value;
    const precioMenor = document.getElementById("rangeFilterCountMin").value;

    const precioF = categoriesArray.filter(f => f.cost <= precioMayor && f.cost >= precioMenor)
    showCategoriesList(precioF);

    precioAsc.addEventListener("click", e => {
        const Asc = precioF.sort((a, b) => (a.cost > b.cost ? 1 : -1));
        showCategoriesList(Asc)
    })

    precioDesc.addEventListener("click", e => {
        const Desc = precioF.sort((a, b) => (b.cost > a.cost ? 1 : -1));
        showCategoriesList(Desc)
    })
});

const botonLimpiar = document.getElementById("clearRangeFilter");
botonLimpiar.addEventListener("click", e => {
    document.getElementById("rangeFilterCountMax").value = "";
    document.getElementById("rangeFilterCountMin").value = "";
})