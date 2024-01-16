// je récupère l'id de mon URL 

function runProduct() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id"); 
    console.log(id)

    displayProduct(id)
}

// Je crée une fonction pour pouvoir afficher les éléments dont j'ai besoin sur ma page

async function displayProduct (productId) {
    const productCard = await getProduct(productId)
    const parent = document.querySelector(".item__img")
    const img = document.createElement("img")
    img.src = productCard.imageUrl
    img.alt = productCard.altTxt
    parent.appendChild(img)
    document.getElementById("title").textContent = productCard.name
    document.getElementById("price").textContent = productCard.price
    document.getElementById("description").textContent = productCard.description
    const options = productCard.colors.map(selectColor => `<option value="${selectColor}">${selectColor}</option>"`)
    document.getElementById("colors").innerHTML = options.join('')
}

// Je crée une fonction qui enregistre les critères du produit dans le local storage
function buttonClicked () {
    const storage= localStorage
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");
    if (!id) {
        alert('id inexistant') 
    }
    const button= document.getElementById("addToCart")
    const colors = document.getElementById("colors")
    const quantity = document.getElementById("quantity")
    
    // Je crée un événement lorsque l'on clique sur le bouton "Ajouter au panier"
    button.addEventListener('click', () => {
        const quantityOfProduct = quantity.value
        const color = colors.value
        let cart= JSON.parse(storage.getItem('cart')) || [] 
        try { 
            
            if (quantityOfProduct<1) {
                alert('il faut au moins un article') 
                return 
            }
            if (quantityOfProduct>100) {
                alert("Quantité max dépassé") 
                return
            }
            // si mon produit est déja dans mon panier j'additionne les quantités, sinon j'ajoute le nouveau canapé 
            let existingProduct= cart.find( product => ''+product.id === ''+id && product.color === color);
            if (existingProduct) {
                if (existingProduct.quantity + (+quantityOfProduct) > 100) {
                    existingProduct.quantity = 100
                    alert("Quantité max dépassé, plafonnée à 100")
                } else if (existingProduct.quantity + (+quantityOfProduct) < 1) {
                    alert("article supprimé")
                    existingProduct.quantity = 0
                    cart = cart.filter( product => !(''+product.id === ''+id && product.color === color) )
                } else {
                    existingProduct.quantity = existingProduct.quantity + (+quantityOfProduct)
                }
                console.log("le produit a été incrémenté")
            }

            else {
                cart.push({'quantity': +quantityOfProduct, 'id': ''+id, 'color': ''+color})
            } 
            storage.setItem('cart', JSON.stringify(cart))

        }
        catch (error) {

            console.error("la quantité choisie doit être comprise entre 1 et 100")
        }
    })
}

window.onload = () => {
    runProduct()
    buttonClicked()
}