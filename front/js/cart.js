// Je crée une fonction pour récupérer mon panier dans le local storage et afficher mon panier

function createArticle (product) {
  const productInfo = product.info
  const article = document.createElement('article')
  article.classList.add("cart__item")
  article.setAttribute("id", productInfo._id)
  article.setAttribute("color", product.color)
  article.innerHTML = `
    <div class="cart__item__img">
      <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productInfo.name}</h2>
        <p>${product.color}</p>
        <p>${productInfo.price} €</p>
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
    const inputQty = article.querySelector(".itemQuantity")
    inputQty.addEventListener("change", (event) => {
      console.log("change quantity for ", productInfo.name, event.target.value)
    })
    const delArticle = article.querySelector(".deleteItem")
    delArticle.addEventListener("click", () => {
      console.log("delete me ", productInfo.name)
    })
  return article
}


function displayCart(cart) {
  cart.forEach((product) => {
    const article = createArticle(product)
    document.querySelector('#cart__items').appendChild(article) // J'injecte mon code js dans le HTML et je le mets en avant
  })
}

function displayTotalAndPrice (cart) { // Je crée une fonction qui va renvoyer le nombre total d'articles et calculer le prix total de mon panier
  let totalQuantityOfProduct = cart.reduce((s,p)=>{return s+(+p.quantity)},0)
  console.log(totalQuantityOfProduct)
  

  let totalPrice = 0
  for (const product of cart) {
    totalPrice += +product.quantity * product.info.price // Je multiplie les produits à leur prix puis j'ajoute le résultat au prix total
  }
  console.log(totalPrice)
  let displayProduct = `${totalQuantityOfProduct}` 
  let displayPrice = `${totalPrice}`
  document.querySelector('#totalQuantity').insertAdjacentHTML('beforeend', displayProduct)
  document.querySelector('#totalPrice').insertAdjacentHTML('beforeend', displayPrice)
  
}

function modifyQuantity(cart) { // Je crée une fonction qui va me permettre d'ajouter ou d'enlever des éléments de mon panier
  let ItemQuantity = document.getElementById('cart__items')
  console.log(ItemQuantity)
  /*for (let input of ItemQuantity) {
    input.addEventListener('change', () => {
      let closestItem = input.closest('.cart__item')
      console.log(closestItem)
      let closestId = closestItem.getAttribute('data-id')
      let closestColor = closestItem.getAttribute('data-color')
    })
  } */








}

/*function deleteProduct () {
  let delete = document.getElementsByClassName('deleteItem')
  console.log('delete')
  delete.addEventListener('click', () => {

  })

} */








const initProducts = async(cart) => {
  console.log("call cart", cart)
  for (let product of cart) {
    product.info = await getProduct(product.id)
    console.log("call cart", product)
  }
  return cart.filter(p=>p.info)
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

window.onload = async() => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length <= 0) {
    window.alert("Votre panier est vide !")
  }

  console.log(cart)
  const filteredCart = await initProducts(cart)
  console.log(filteredCart)
  displayCart(filteredCart)
  displayTotalAndPrice(filteredCart)
  modifyQuantity(filteredCart)
}