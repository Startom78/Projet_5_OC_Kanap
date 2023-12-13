// Je crée une fonction pour récupérer mon panier dans le local storage et afficher mon panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart)
function displayCart() {

  if (cart.length <= 0) {

    window.alert("Votre panier est vide !")
  }

  cart.forEach(async (product) => {

    const apiInfos = await getProducts(product.id) // Je récupère mes infos sur l'API ici

    let display = ` <article class="cart__item" data-id="${apiInfos._id}" data-color="${product.color}">   
      <div class="cart__item__img">
        <img src="${apiInfos.imageUrl}" alt="${apiInfos.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${apiInfos.name}</h2>
          <p>${product.color}</p>
          <p>${apiInfos.price} €</p>
      </div> 
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${product.quantity} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>`
            
    document.querySelector('#cart__items').insertAdjacentHTML('beforeend', display) // J'injecte mon code js dans le HTML et je le mets en avant
  })
}
displayCart()

function totalPrice () { // Je crée une fonction qui va calculer et afficher le prix total de mon panier

  

}

function modifyQuantity() { // Je crée une fonction qui va me permettre d'ajouter ou d'enlever des éléments de mon panier









}











/*let productOfCartElt = document.getElementById('cart__items')
console.log(productOfCartElt)
productOfCartElt.dataset.id = product.id
productOfCartElt.dataset.color = product.color

let productImgDiv = document.createElement('div')
productImgDiv.classList.add('cart__item__img')

let productImg = document.createElement('img')
productImg.src = apiInfos.imageUrl
productImg.alt = apiInfos.altTxt
productImgDiv.appendChild(productImg)
productOfCartElt.appendChild(productImgDiv)

let productDiv = document.createElement('div')
productDiv.classList.add('cart__item__content')

let productDivInfo = document.createElement('div')
productDivInfo.classList.add('cart__item__content__description')

let productDivInfoH2 = document.createElement('h2')
h2 = apiInfos.name
console.log(h2)
productDivInfo.appendChild(productDivInfoH2)
productDiv.appendChild(productDivInfo)
productOfCartElt.appendChild(productDiv)

let productDivInfoColor = document.createElement('p')
const color = product.color
productDivInfo.appendChild(productDivInfoColor)
console.log(color)

let productDivInfoPrice = document.createElement('p')
price = +apiInfos.price
productDivInfo.appendChild(productDivInfoPrice)
console.log(price) 

//console.log(document.getElementsByClassName('cart__item'))
//console.log(document.getElementsByClassName('cart__item').insertAdjacentHTML)
//cartItemsElt.appendChild(product)
//document.getElementsByClassName('cart__item').insertAdjacentHTML("beforeend", cart)

})

}
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
