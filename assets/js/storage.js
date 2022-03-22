function getLocalStorage(){
    if(localStorage.getItem('cart')){
        cartProducts = JSON.parse(localStorage.getItem('cart'));
        renderCartProducts();
    }
}

function saveLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cartProducts));
}

function clearLocalStorage(){
    localStorage.clear();
}