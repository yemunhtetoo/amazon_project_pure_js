export let cart = JSON.parse(localStorage.getItem('cart')) || [];
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
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
export function addToCart(productId,quantity){
    let matchingItem;
        cart.forEach((cartItem)=>{
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        });
        if(matchingItem){
            matchingItem.quantity++;
        }else{
            cart.push({
                productId,
                quantity:quantity,
                deliveryOptionId: '1' //Give Default Deli
            });
        }
        saveToLocalStorage();
        //console.log(cartQuantity);
        //console.log(cart);
}

function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function removeFromCart(productId){
    let newCart= [];
        cart.forEach((cartItem)=>{
            if(cartItem.productId!== productId){
                newCart.push(cartItem);
            }
        });
    cart = newCart;
    saveToLocalStorage();
}

export function calculateTotal(cart){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents+= deliveryOption.priceCents;
    });
        const totalBeforeTaxCents = productPriceCents+shippingPriceCents;
        const taxCents = totalBeforeTaxCents * 0.1;
        const totalCents = totalBeforeTaxCents + taxCents;
        return [totalCents,productPriceCents,shippingPriceCents,totalBeforeTaxCents,taxCents];
}

export function removeAllCart(){
    cart.length = 0;
    localStorage.removeItem('cart');
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity+= cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId,newQuantity){
    let matchingItem;
        cart.forEach((cartItem)=>{
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        });
        if(matchingItem){
            matchingItem.quantity = newQuantity;
        }
        saveToLocalStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToLocalStorage();
}