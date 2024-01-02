function displayProducts(products, element) {
    let container = document.getElementById(element)
    let html = ''
    products.forEach((item) => {
        html = html + `
        <div class="card m-2 w-25 h-50">
        <img src=${item.image} class="card-img-top" alt=${item.title}>
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text text-truncate">${item.description}</p>
            <span>${item.price}$</span>
            <button onclick="removeFromCart(this)" data-item='${JSON.stringify(item)}' class="btn btn-danger">Remove</button>
        </div>
    </div>
        `
    })
    container.innerHTML = html
}

function getAndDisplayCartProducts() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart.length !== 0) {
        displayProducts(cart, 'cartContainer')
    }
    else {
        document.getElementById('cartContainer').innerHTML = 'No Items.'
    }
    document.getElementById('cartLength').innerText = cart.length
}

function cartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    let total = 0
    cart.forEach((item) => {
        total = total + item.price
    })
    document.getElementById('cartTotal').innerText = total
}

function removeFromCart(e) {
    const product = JSON.parse(e.dataset.item)
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter((item) => item.id !== product.id)
    localStorage.setItem('cart', JSON.stringify(newCart))
    getAndDisplayCartProducts()
cartTotal()
}

getAndDisplayCartProducts()
cartTotal()