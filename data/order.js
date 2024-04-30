
import { cart, removeAllCart, calculateTotal } from "./cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getDeliveryOption } from "./deliveryOptions.js";
import { getProduct } from "./products.js";
export let orders = JSON.parse(localStorage.getItem('orders')) || [];
// if(!orders){
//     orders = [
//         {
//             id:"yem1238ce-6aa0-4b85-b27f-e1d07eb698ab",
//             orderedDate: 'August 12',
//             total: '3506',
//             cartItems:[
//                 {
//                     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//                     quantity: 2,
//                     deliveryOptionId: '1'
//                 },
//                 {
//                     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//                     quantity: 1,
//                     deliveryOptionId: '2'
//                 },
//             ],
//         }
//     ];
// }

export function placeOrder(){
    if(cart.length > 0){
        // console.log(cart);
        const randomOrderId  = Math.random() *1000000;
        const orderedDate = dayjs().format('dddd, MMMM D');
        const matchingOrder = cart.slice();
        let dateString;
        matchingOrder.forEach(itemPlus =>{
            const deliId = itemPlus.deliveryOptionId;
            const getDeli = getDeliveryOption(deliId);  
            const today = dayjs();
            const deliveryDate = today.add(getDeli.deliveryDays, 'days');
            dateString = deliveryDate.format('dddd, MMMM D');
            itemPlus['dateString'] = dateString;
        });
        
        // console.log(matchingOrder)
        const total = calculateTotal(matchingOrder);
        orders.push({
            id: randomOrderId,
            orderedDate: orderedDate,
            total: total[0],
            cartItems: matchingOrder
        });
        saveToLocalStorage();
        removeAllCart();
    }
    
}

function saveToLocalStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

