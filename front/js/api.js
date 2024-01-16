const API_URL = "http://localhost:3000/api/"

const getProducts = async() => { // je fais un fetch pour aller chercher tout mes produits sur mon API
    return await fetch (API_URL+`products`)
    .then(res => res.json())
    .catch(err=>{
        alert(err)
        return []
    })
}

const getProduct = async(id) => { //Je fais un fetch pour afficher le produit selon son id
    return await fetch (API_URL+`products/${id}`)
    .then(res => res.json())
    .catch(err=>{
        alert(err)
        return null
    })
}