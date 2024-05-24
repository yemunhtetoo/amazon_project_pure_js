import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";

class Cart {
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    addToCart(productId, quantity = 1) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId,
                quantity: quantity,
                deliveryOptionId: '1' //Give Default Deli
            });
        }
        this.saveToLocalStorage();
        console.log(this.cartItems);
    }
    removeFromCart(productId) {
        let newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToLocalStorage();
    }

    isEmpty(array) {
        return Array.isArray(array) && array.length === 0
    }

    calculateTotal(cart) {
        let productPriceCents = 0;
        let shippingPriceCents = 0;
        this.cartItems.forEach((cartItem) => {
            const product = getProduct(cartItem.productId);
            productPriceCents += product.priceCents * cartItem.quantity;
            const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
            shippingPriceCents += deliveryOption.priceCents;
        });
        const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
        const taxCents = totalBeforeTaxCents * 0.1;
        const totalCents = totalBeforeTaxCents + taxCents;
        return [totalCents, productPriceCents, shippingPriceCents, totalBeforeTaxCents, taxCents];
    }

    removeAllCart() {
        this.cartItems = [];
        this.saveToLocalStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity = newQuantity;
        }
        this.saveToLocalStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToLocalStorage();
    }
}
export const cart = new Cart();

// const businessCart = new Cart('cart-business');


// console.log(cart)
// console.log(businessCart)

// if(!cart){
//     cart = [
//         {
//             productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//             quantity:2,
//             deliveryOptionId : '1'
//         },
//         {
//             productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//             quantity:1,
//             deliveryOptionId: '2'
//         }
//     ];
// }



export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log('load cart');
      fun();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/products');
    xhr.send();
  }

 export async function loadCartFetch(){
    const response = await fetch('https://supersimplebackend.dev/cart');
    const cart = await response.text();
    console.log(cart)
}