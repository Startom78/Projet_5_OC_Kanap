// je récupère l'id de mon URL 

let urlwebsite = window.location.search
urlSearchParams = new URLSearchParams(urlwebsite);
 id = urlSearchParams.get("id"); 
 console.log(id)

// Je crée une fonction pour pouvoir afficher les éléments dont j'ai besoin sur ma page

function displayProduct () {
    let url = `http://localhost:3000/api/products/${id}`
    fetch(url)
    .then(response => response.json())
    .then(productCard => {
        document.querySelector(".item__img").innerHTML = `<img src="${productCard.imageUrl}" alt="Photographie d'un canapé">`
        document.getElementById("title").textContent = productCard.name
        document.getElementById("price").textContent = productCard.price
        document.getElementById("description").textContent = productCard.description
        productCard.colors.forEach(selectColor => 
            document.getElementById("colors").innerHTML += `<option value = "${selectColor}">${selectColor} </option>"`)  
    })    
}
displayProduct();
     