import { products ,loadProducts } from "../data/products.js";
import {cart } from "../data/cart-class.js";

//Callback (a function to run in the future)
loadProducts(renderProductGrids);
function renderProductGrids(){
let productHTML = '';
const url = new URL(window.location.href);
const search = url.searchParams.get('search');
let filterProducts = products;
if(search){
  filterProducts = products.filter((product)=>{
    // return product.name.includes(search);
    let matchingKeyword = false;
    product.keywords.forEach((keyword)=>{
      if(keyword.toLowerCase().includes(search.toLowerCase())){
        matchingKeyword = true;
      }
    });

    return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
  });
}
filterProducts.forEach((product)=>{
productHTML+=`<div class="product-container">
<div class="product-image-container">
  <img class="product-image"
    src="${product.image}">
</div>

<div class="product-name limit-text-to-2-lines">
  ${product.name}
</div>

<div class="product-rating-container">
  <img class="product-rating-stars"
    src="${product.getStarsUrl()}">
  <div class="product-rating-count link-primary">
    ${product.rating.count}
  </div>
</div>

<div class="product-price">
  ${product.getPrice()}
</div>

<div class="product-quantity-container">
  <select class="js-quantity-selector-${product.id}">
    <option selected value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
</div>

${product.extraInfoHTML()}

<div class="product-spacer"></div>

<div class="added-to-cart js-added-to-cart-${product.id}">
  <img src="images/icons/checkmark.png">
  Added
</div>

<button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
  Add to Cart
</button>
</div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;
let addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        const {productId} = button.dataset;
        const getAddToCartBtn = document.querySelector(`.js-added-to-cart-${productId}`);
        getAddToCartBtn.classList.add('added-to-cart-style');
        const previousTimeoutId = addedMessageTimeouts[productId];
        if(previousTimeoutId){
            clearTimeout(previousTimeoutId);
        }
        const timeoutId = setTimeout(()=>{
            getAddToCartBtn.classList.remove('added-to-cart-style');
            },2000);
        addedMessageTimeouts[productId] = timeoutId;
        const getQuantity= document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(getQuantity.value);
        cart.addToCart(productId,quantity);
        updateCartQuantity();
        document.querySelector(`.js-quantity-selector-${productId}`).value = 1;  
    });
});
updateCartQuantity();

function updateCartQuantity(){
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelector('.js-search-button').addEventListener('click',()=>{
  const search = document.querySelector('.js-search-bar').value;
  window.location.href = `amazon.html?search=${search}`;
});

document.querySelector('.js-search-bar').addEventListener('keydown',(event)=>{
  if(event.key === 'Enter'){
    const searchTerm = document.querySelector('.js-search-bar').value;
  window.location.href = `amazon.html?search=${searchTerm}`;
  }
});

}

