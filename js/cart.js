const urlParams = new URLSearchParams(window.location.search);

let productImage = document.getElementById("productImage");
let productPrice = document.getElementById("productPrice");
let productName = document.getElementById("productName");

productImage.src = urlParams.get('image');
productName.innerText = urlParams.get('name');
productPrice.innerText = `\$${urlParams.get('price')}`;