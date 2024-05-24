import { cart } from "../data/cart-class.js";
import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
async function orderHTML(){
await loadProductsFetch();
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const order = getOrder(orderId);
const product = getProduct(productId);
let productDetials;
order.products.forEach((details)=>{
  if(details.productId === product.id){
    productDetials = details;
  }
});

const today =dayjs();
const orderTime = dayjs(order.orderTime);
const deliveryTime = dayjs(productDetials.estimatedDeliveryTime);
const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
const deliveryMessage = today < deliveryTime ? 'Arriving on' : 'Delivered On';
console.log(percentProgress);
const trackingOrderHTML = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveryMessage} : ${dayjs(productDetials.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          Name: ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetials.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
    </div>
`;
document.querySelector('.js-order-tracking').innerHTML = trackingOrderHTML;
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
orderHTML();
