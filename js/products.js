const autosCatURL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

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
    fetch(autosCatURL).then(response => response.json()).then(data => {
        categoriesArray = data.products;
        showCategoriesList(categoriesArray);
    });
});