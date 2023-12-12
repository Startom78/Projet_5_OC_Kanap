// Je crée une fonction pour récupérer mon panier dans le local storage et afficher mon panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const API_URL = "http://localhost:3000/api/products"
console.log(API_URL)
console.log(cart)
function displayCart () {
    
    if (cart.length <= 0) {

      window.alert("Votre panier est vide !")
    }
    
    fetch(API_URL)
    .then(response => response.json())      
    let cartItemsElt= document.getElementById('cart_items')
    cart.forEach((product) => {
        
        let productOfCartElt = document.createElement('article') 
        productOfCartElt.classList.add("cart__item")
        productOfCartElt.dataset.id = product.id
        productOfCartElt.dataset.color = product.color 

        let productImgDiv = document.createElement('div') 
        productImgDiv.classList.add('cart__item__img')

        let productImg = document.createElement('img')
        productImg.src = ` ${product.imageUrl} `
        productImg.alt = "Photographie d'un canapé"
        productImgDiv.appendChild(productImg)
        productOfCartElt.appendChild(productImgDiv)

        let productDiv = document.createElement('div')
        productDiv.classList.add('cart__item__content')
        
        let productDivInfo = document.createElement('div')
        productDivInfo.classList.add('cart__item__content__description')

        let productDivInfoH2 = document.createElement('h2')
        productDivInfoH2.textContent = product.name
        productDivInfo.appendChild(productDivInfoH2)
         
        productDiv.appendChild(productDivInfo)
        productOfCartElt.appendChild(productDiv)
   
        console.log(productOfCartElt) 
        console.log(product.imageUrl)
    }) 
    /* <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}"> 
            <div class="cart__item__img">
              <img src="../images/product01.jpg" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">     
              <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div> */


}
displayCart()