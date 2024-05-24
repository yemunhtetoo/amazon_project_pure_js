import { cart } from "../../data/cart-class.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
// import { placeOrder } from "../../data/order.js";
export function renderpaymentSummary() {
  const filterTotal = cart.calculateTotal(cart);
  const totalCents = filterTotal[0];
  const productPriceCents = filterTotal[1];
  const shippingPriceCents = filterTotal[2];
  const totalBeforeTaxCents = filterTotal[3];
  const taxCents = filterTotal[4];
  const cartQuantity = cart.calculateCartQuantity();
  const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

            <a href="#">
            <button class="place-order-button button-primary js-place-order" >
              Place your order
            </button>
          </a>
        `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    if(cart.cartItems.length === 0){
      window.location.href = 'orders.html';
    }else{
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart.cartItems
          })
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('Unexpected Error. Try Again Later.')
      }
      cart.removeAllCart();
    }
      window.location.href = 'orders.html';
    
  })
}

