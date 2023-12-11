const API_URL = "http://localhost:3000/api/"

const getProducts = async(id) => {
    return await fetch (API_URL+`products/${id}`).then(res => res.json())
}