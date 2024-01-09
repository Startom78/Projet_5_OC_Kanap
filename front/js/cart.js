let globalCart = []
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
      modifyQuantity(article, product, productInfo)
    })
    article.querySelector(".deleteItem").addEventListener("click", () => {
    
      delArticle(article, product, productInfo)
      
    })
    return article
  }

  const modifyQuantity = (article, product, productInfo) => {
    const lsCart = JSON.parse(localStorage.getItem('cart'))
    const itemToModify = lsCart.find( p => (''+p.id === ''+productInfo._id && p.color === product.color))
    const inputButton = article.querySelector('.itemQuantity')
    const quantityToAdd = +inputButton.value
    itemToModify.quantity = quantityToAdd
    if (itemToModify.quantity > 100) {
      window.alert('erreur : quantité max dépassé, limité à 100 par produit')
      itemToModify.quantity = 100
    }
    localStorage.setItem('cart', JSON.stringify(lsCart))
    const item = globalCart.find(item=>(''+item.id === ''+productInfo._id && item.color === product.color))
    item.quantity = itemToModify.quantity
    article.querySelector(".cart__item__content__settings__quantity p").textContent = `Qté : ${itemToModify.quantity}`
    displayTotalAndPrice(globalCart)
  }
  
  const delArticle = (article, product, productInfo) => { // je réalise une fonction qui crée un nouveau panier sans le produit qu'on enlève, puis je le renvoie en localstorage avant de le supprimer visuellement de la page
    const lsCart = JSON.parse(localStorage.getItem('cart'))
    const filteredCart = lsCart.filter( p => !(''+p.id === ''+productInfo._id && p.color === product.color) )
    localStorage.setItem('cart', JSON.stringify(filteredCart))
    globalCart = globalCart.filter(p => !(''+p.id === ''+productInfo._id && p.color === product.color))
    article.parentNode.removeChild(article)
    displayTotalAndPrice(globalCart)
}


function displayCart(cart) {
  cart.forEach((product) => {
    const article = createArticle(product, cart)
    document.querySelector('#cart__items').appendChild(article) // J'injecte mon code js dans le HTML et je le mets en avant
  })
}

function displayTotalAndPrice (cart) { // Je crée une fonction qui va renvoyer le nombre total d'articles et calculer le prix total de mon panier
  let totalQuantityOfProduct = cart.reduce((s,p)=>{return s+(+p.quantity)},0)
  console.log(totalQuantityOfProduct)
  

  let totalPrice = 0
  for (const product of cart) {
    totalPrice += +product.quantity * +product.info.price // Je multiplie les produits à leur prix puis j'ajoute le résultat au prix total
  }
  console.log(totalPrice)
  let displayProduct = `${totalQuantityOfProduct}` 
  let displayPrice = `${totalPrice}`
  document.getElementById('totalQuantity').textContent = displayProduct
  document.getElementById('totalPrice').textContent = displayPrice
  
}

const initProducts = async(cart) => {
  console.log("call cart", cart)
  for (let product of cart) {
    product.info = await getProduct(product.id)
    console.log("call cart", product)
  }
  return cart.filter(p=>p.info)
}

window.onload = async() => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length <= 0) {
    window.alert("Votre panier est vide !")
  }
  
  console.log(cart)
  const filteredCart = await initProducts(cart)
  globalCart = filteredCart
  console.log(filteredCart)
  displayCart(filteredCart)
  displayTotalAndPrice(cart)

  const form = document.querySelector(".cart__order__form")
  form.addEventListener("submit", (event) => {
    const regexName = /^(?=.{1,50}$)[a-z]+(?:[-\s][a-z]+)*$/i
    const regexCity = /^(?=.{1,50}$)[a-z]+(?:['-\s][a-z]+)*$/i
    const regexAddress = /^[a-z0-9]+(?:['-\s][a-z0-9]+)*$/i
    const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    let fail = true
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const email = document.getElementById("email").value
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
    const addressErrorMsg = document.getElementById("addressErrorMsg")
    const cityErrorMsg = document.getElementById("cityErrorMsg")
    const emailErrorMsg = document.getElementById("emailErrorMsg")

    firstNameErrorMsg.textContent = ""
    lastNameErrorMsg.textContent = ""
    addressErrorMsg.textContent = ""
    cityErrorMsg.textContent = ""
    emailErrorMsg.textContent = ""

    console.log("firstName", firstName)
    console.log("lastName", lastName)
    console.log("address", address)
    console.log("city", city)
    console.log("email", email)

    if (firstName.length>0 && lastName.length>0 && address.length>0 && city.length>0 && email.length>0) {
      console.log("length ok")
      if (!regexName.test(firstName)) {
        firstNameErrorMsg.textContent = "Erreur : le prénom n'est pas valide"
      } else if (!regexName.test(lastName)) {
        lastNameErrorMsg.textContent = "Erreur : le nom de famille est invalide"
      } else if (!regexCity.test(city)) {
        cityErrorMsg.textContent = "Erreur : la ville est incorrecte"
      } else if (!regexAddress.test(address)) {
        addressErrorMsg.textContent = "Erreur : l'addresse est incorrecte"
      } else if (!regexMail.test(email)) {
        emailErrorMsg.textContent = "Erreur : l'email est incorrecte"
      }
      else {
        fail = false
      }
    }
    const order = {
      contact : {
        firstName, 
        lastName,
        address,
        city,
        email
      },

      products : globalCart.map(p => p.id)
    }
    if (fail) {
      event.preventDefault()
      console.log("validation failed")
    } else {
      event.preventDefault()
      console.log("formulaire validé")
      fetch('http://127.0.0.1:3000/api/products/order', {
        method : "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
     .then(res => {
      if (!res.ok) {
        throw ('erreur lors de la requete')
      }
      return res.json()
    })
    .then(data => {
      console.log(data.orderId)
      localStorage.removeItem('cart')
      window.location.href = 'confirmation.html?id='+data.orderId
     })
     .catch(err => console.log('erreur', err))

    }
  })
}
