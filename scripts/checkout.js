import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { renderpaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart-class.js";

async function loadPage(){
    try{
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ])
    }catch(error){
        console.log("Unexpected error. Please try again.");
    }
    renderCheckoutHeader();
    renderOrderSummaryHTML();
    renderpaymentSummary();
}
loadPage();
/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
]).then(()=>{
    renderCheckoutHeader();
    renderOrderSummaryHTML();
    renderpaymentSummary();
});
*/

/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value1');
    })
}).then((value)=>{
    console.log(value)
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
}).then(()=>{
    renderCheckoutHeader();
    renderOrderSummaryHTML();
    renderpaymentSummary();
});
*/

/*
//Give loadProducts fun a callback or a func we want to run in the future
loadProducts(()=>{
    loadCart(()=>{
        renderCheckoutHeader();
        renderOrderSummaryHTML();
        renderpaymentSummary();
    })

});
*/


