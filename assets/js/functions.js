function disableFilterPair(element){
    element.className === 'filters__button filters__button--active' 
    ? element.classList.remove('filters__button--active')
    : null;
}

function checkFilterStatus(element){
    if(element.className === 'filters__button filters__button--active'){
        element.classList.remove('filters__button--active');
        return 1;
    }
    else{
        element.classList.add('filters__button--active');
        return 0;
    }
}

function addProductToCartObj(product){
    const repeatedProductIndex = searchItemOnCartObj(product);
    if(repeatedProductIndex >= 0){
        cartProducts[repeatedProductIndex].quantity += 1; 
        updateCartTotals();
        return;
    }

    cartProducts.push(product);
}

function createProductElement(element){
    const product = {
        id: element.querySelector('.addToCart').dataset.id,
        name: element.querySelector('.product__name').textContent,
        price: element.querySelector('.product__price').textContent,
        image: element.querySelector('.product__img').src,
        quantity: 1
    }

    return product;
}

function searchItemOnCartObj(product){
    const repeated = cartProducts.findIndex(item => item.id === product.id);
    return repeated;
}

function getRemoveProductIcon(buttons){
    buttons.forEach(button => button.addEventListener('click', (e) => removeCartItem(e)))
}

function removeCartItem(event){
	const buttonClicked = event.target;
    const buttonItem = buttonClicked.closest('.cart-item')
	buttonItem.remove();
	removeCartObjItem(buttonItem)

	updateCartTotals();
}

function getquantityChange(icons){
    icons.forEach(icon => icon.addEventListener('change', (e) => quantityChange(e)));
}

function quantityChange(event){
	const input = event.target
	input.value <= 0 ? (input.value = 1) : null;

	updateCartTotals();
}

function removeCartObjItem(product){
    const itemToRemove = searchItemOnCartObj(product);
    if(itemToRemove >= 0){
        cartProducts.splice(itemToRemove, 1);
    }

    clearLocalStorage();
}

function checkProductsInCart(cartContainer){
    if(cartContainer.hasChildNodes()){
        return 1;
    }
    else{
        return 0;
    }
};