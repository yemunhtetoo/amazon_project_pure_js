import { calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
export function renderOrderSummaryHTML(){
let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        // console.log(deliveryDate);
        const dateString = deliveryDate.format('dddd, MMMM D');
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-button" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary save-quantity-button" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-button" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
                ${deliveryHTML(matchingProduct,cartItem)}
            </div>
        </div>
    </div>
    `;
});

function deliveryHTML(matchingProduct,cartItem){
    let deliveryHTML = ''; 
    deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ? 'Free' : `${formatCurrency(deliveryOption.priceCents)} -`;
        const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
        deliveryHTML+=`
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" class="delivery-option-input" ${isChecked ? 'checked' : ''}
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                $${priceString} Shipping
            </div>
            </div>
        </div>
        `
    });
    return deliveryHTML;
}
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-button').forEach((deleteBtn)=>{
    deleteBtn.addEventListener('click',()=>{
        const {productId} = deleteBtn.dataset;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCartQuantity();
    });
});

function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} Items`;
}
updateCartQuantity();

document.querySelectorAll('.js-update-button').forEach((updateBtn)=>{
    updateBtn.addEventListener('click',()=>{
        const {productId} = updateBtn.dataset;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
        document.body.addEventListener('keydown',(event)=>{
            if(event.key === 'Enter'){
                container.classList.remove('is-editing-quantity');
                const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
                
                const newQuantity = Number(quantityInput.value);
                if(newQuantity<=0 || newQuantity>=1000){
                    alert('Quantity must be at least 0 and less than 1000');
                    return;
                }
                document.body.addEventListener('keydown',(event)=>{
                    if(event.key==='Enter'){
                        console.log('hi');
                    }
                });
                updateQuantity(productId,newQuantity);
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
                updateCartQuantity();
            }
        });
    });
});

document.querySelectorAll('.save-quantity-button').forEach((saveBtn)=>{
    saveBtn.addEventListener('click',()=>{
        const {productId} = saveBtn.dataset;
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        
        const newQuantity = Number(quantityInput.value);
        if(newQuantity<=0 || newQuantity>=1000){
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }
        document.body.addEventListener('keydown',(event)=>{
            if(event.key==='Enter'){
                console.log('hi');
            }
        });
        updateQuantity(productId,newQuantity);
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        updateCartQuantity();
    });
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener(('click'),()=>{
        const {productId,deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummaryHTML();
    });
});
}

