export let cart = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1
    }
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

export function removeFromCart(productId){
    let newCart= [];
        cart.forEach((cartItem)=>{
            if(cartItem.productId!== productId){
                newCart.push(cartItem);
            }
        });
    cart = newCart;
}