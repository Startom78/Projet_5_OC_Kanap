const API_URL = "http://localhost:3000/api/"

const getProducts = async() => {
    return await fetch (API_URL+`products`)
    .then(res => res.json())
    .catch(err=>{
        alert(err)
        return []
    })
}

const getProduct = async(id) => {
    return await fetch (API_URL+`products/${id}`)
    .then(res => res.json())
    .catch(err=>{
        alert(err)
        return null
    })
}