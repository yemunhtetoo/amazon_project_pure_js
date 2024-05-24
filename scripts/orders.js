import { cart } from "../data/cart-class.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct, loadProductsFetch, products } from "../data/products.js";
import { orders } from "../data/orders.js";

async function renderOrderPage(){
  // console.log(orders)
  await loadProductsFetch();
    let orderSummaryHTML = '';
    orders.forEach((orderItem)=>{
      const orderTimeString = dayjs(orderItem.orderTime).format('MMMM D');
        orderSummaryHTML += `
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItem.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>
          
          <div class="order-details-grid">
            ${orderDetailsGrids(orderItem)  }
          </div>
        </div>
        `;
    });

    
function orderDetailsGrids(orderItemCart){
  let orderDetailsGridHTML = '';
  orderItemCart.products.forEach((cartSingle)=>{
    const matchingProduct = getProduct(cartSingle.productId);

    orderDetailsGridHTML += `
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dayjs(cartSingle.estimatedDeliveryTime).format('MMMM D')}
      </div>
      <div class="product-quantity">
        Quantity: ${cartSingle.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again" data-product-id=${matchingProduct.id}>
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${orderItemCart.id}&productId=${cartSingle.productId}">
        <button class="track-package-button button-secondary js-track-package-button">
          Track package
        </button>
      </a>
    </div>
    `
  });
  return orderDetailsGridHTML;
}

    document.querySelector('.js-orders-grid').innerHTML = orderSummaryHTML;
    updateCartQuantity();
// renderOrderPage();

document.querySelectorAll('.js-buy-again').forEach(button=>{
  button.addEventListener('click',()=>{
    console.log('hi')
      const {productId} = button.dataset;
      const quantity = 1;
      cart.addToCart(productId,quantity);
      updateCartQuantity();
  });
});

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

renderOrderPage();