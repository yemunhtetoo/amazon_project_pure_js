export const cart = [
    // {
    //     productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    //     quantity:1
    // }
];

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
                quantity:quantity
            });
        }
        
        //console.log(cartQuantity);
        console.log(cart);
}