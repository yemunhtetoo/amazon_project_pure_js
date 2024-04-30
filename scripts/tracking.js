import { calculateCartQuantity } from "../data/cart.js";
import { orders } from "../data/order.js";
import { getProduct } from "../data/products.js";

export function orderHTML(){
const getData = JSON.parse(sessionStorage.getItem('ordersItemsStorage'));
const orderId = Number(getData[1]);
const getProId = getData[0];
let alignOrder; 
let alignProduct;
orders.forEach(orderItem=>{
  if(orderItem.id === orderId){
    alignOrder = orderItem.cartItems;
  }
});
// console.log(alignOrder);
alignOrder.forEach(product=>{
if(product.productId===getProId){
alignProduct = product;
}
});
console.log(alignProduct)

let actualProId = alignProduct.productId;
const matchProduct = getProduct(actualProId);
// console.log(matchProduct)
const trackingOrderHTML = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on : ${alignProduct.dateString}
        </div>

        <div class="product-info">
          Name: ${matchProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${alignProduct.quantity}
        </div>

        <img class="product-image" src="${matchProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    </div>
`;
document.querySelector('.js-order-tracking').innerHTML = trackingOrderHTML;
}

orderHTML();
updateCartQuantity();
function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
