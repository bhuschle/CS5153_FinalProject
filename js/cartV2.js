let carts = document.querySelectorAll('.add-cart');

//NEED HELP WITH THIS PART
let products = [
    {   name: "TEST ITEM NAME",
        price: 10.00,
        inCart: 0,
    }
];


//whenever add cart button is clicked
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

//whenever you click it increases the key value by 1
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price)
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 class="product-title">${item.name}</h6>
            <small class="quantity-muted">QTY: ${item.inCart}</small>
          </div>
            <span class="price-muted">$${item.inCart * item.price}.00</span>
      </li>
      `;
        });
        productContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <div class="cartTotal">
        <h6 class="product-title">Total (USD)</h6>
        </div>
        <strong>$${cartCost}.00</strong>
      </li>
    `;
    }
}

onLoadCartNumbers();
displayCart();
