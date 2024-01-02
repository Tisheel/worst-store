
localStorage.setItem('cart', JSON.stringify([]))

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
            <button onclick="addToCart(this)" data-item='${JSON.stringify(item)}' class="btn btn-primary">Buy Now</button>
        </div>
    </div>
        `
    })
    container.innerHTML = html
}

function getAndDisplayProducts() {
    document.getElementById('productContainer').innerHTML = 'Loading...'
    fetch("https://fakestoreapi.com/products/category/electronics")
        .then(res => res.json())
        .then(json => displayProducts(json, 'productContainer'))
        .catch((err) => {
            document.getElementById('productContainer').innerHTML = err.message
        })
}

function addToCart(e) {
    console.log(e.dataset.item)
    const product = JSON.parse(e.dataset.item)
    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    location.replace('/Cart.html')
}

getAndDisplayProducts()