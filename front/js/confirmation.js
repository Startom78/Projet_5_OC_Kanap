window.onload = () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    console.log(id)
    document.getElementById('orderId').textContent = id
}