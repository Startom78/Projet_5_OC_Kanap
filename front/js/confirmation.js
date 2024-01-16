window.onload = () => { // Je vais chercher l'id de la commande puis je l'affiche sur la page
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    document.getElementById('orderId').textContent = id
}