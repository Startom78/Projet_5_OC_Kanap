function product() {
    let url= 'http://localhost:3000/api/products';
    console.log(url);
    // Ici je réalise un fetch avec une promesse //
    fetch(url)
    .then (response => response.json())
    .then ((product) => {
        for (let data of product) {
            // Ici j'affiche les données de mes produits //
            let display=``
            display += `<a href="./product.html?id=${data._id}">
            <article>
              <img src=${data.imageUrl} alt=${data.altTxt}>
              <h3 class="productName">${data.name}</h3>
              <p class="productDescription">${data.description}</p>
            </article>
          </a>`
          document.getElementById('items').insertAdjacentHTML("beforeend",display)
          //Je demande qu'il cherche les éléments par les id des items puis qu'ils soient injectés dans le html en position "en avant" dans ma variable display // 
        }
    })
}
product(); 