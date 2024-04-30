import { cart, calculateCartQuantity, addToCart } from "../data/cart.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct } from "../data/products.js";
import { orders } from "../data/order.js";

export function renderOrderPage(){
  console.log(orders)
    let orderSummaryHTML = '';
    orders.forEach((orderItem)=>{
        orderSummaryHTML += `
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderItem.orderedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItem.total)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>
          
          <div class="order-details-grid">
            ${orderDetailsGrids(orderItem.cartItems, orderItem)}
          </div>
        </div>
        `;
    });
    document.querySelector('.js-orders-grid').innerHTML = orderSummaryHTML;
}

function orderDetailsGrids(orderItemCart, orderItem){
  let orderDetailsGridHTML = '';
  orderItemCart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    
    orderDetailsGridHTML += `
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${cartItem.dateString}
      </div>
      <div class="product-quantity">
        Quantity: ${cartItem.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${matchingProduct.id}>
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary js-track-package-button" data-product-id=${matchingProduct.id} data-ordered-item-id=${orderItem.id}>
          Track package
        </button>
      </a>
    </div>
    `
  });
  return orderDetailsGridHTML;
}
updateCartQuantity();
renderOrderPage();

document.querySelectorAll('.js-buy-again-button').forEach(button=>{
  button.addEventListener('click',()=>{
      const {productId} = button.dataset;
      const quantity = 1;
      addToCart(productId,quantity);
      updateCartQuantity();
  });
});

document.querySelectorAll('.js-track-package-button').forEach(button=>{
  button.addEventListener('click',()=>{
  const {productId, orderedItemId } = button.dataset;
    sessionStorage.setItem('ordersItemsStorage',JSON.stringify([productId,orderedItemId]));
});
});

function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
