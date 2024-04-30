import { cart, calculateCartQuantity } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { calculateTotal } from "../../data/cart.js";
import { placeOrder } from "../../data/order.js";
export function renderpaymentSummary(){
    const filterTotal = calculateTotal(cart);
    const totalCents = filterTotal[0];
    const productPriceCents = filterTotal[1];
    const shippingPriceCents = filterTotal[2];
    const totalBeforeTaxCents = filterTotal[3];
    const taxCents = filterTotal[4];
    const cartQuantity =calculateCartQuantity();
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

          <a href="orders.html">
            <button class="place-order-button button-primary js-place-order-button" >
              Place your order
            </button>
          </a>
        
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-place-order-button').addEventListener('click',()=>{
      placeOrder();
    });
}

