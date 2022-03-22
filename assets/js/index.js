let cartProducts = [];

window.onload = async function(){
    const products = await getAllProducts();
    renderProductsSection(products);
    getLocalStorage();
}


function renderProductsSection(productArr){
    const productsElementContainer = document.querySelector('#products-section')
    productsElementContainer.innerHTML = '';

    productArr.forEach(product => {
        const productItemDiv = document.createElement('div');
        productItemDiv.className = 'products__item';

        const productId = product.id;
        const productName = product.name
        const productPrice = product.price
        const productImage = product.image

        const productsTemplate = `
        <div class="img__div">
            <img class='product__img' src="${productImage}"/>
        </div>
        <div class="products__info">
            <h3 class='product__name'>${productName}</h3>
            <h2 class='product__price'>${productPrice}$</h2>
        </div>
        <div class="products__button">
            <button class="addToCart" data-id=${productId}>Agregar al carrito</button>
        </div>`

        productItemDiv.innerHTML = productsTemplate;
        productsElementContainer.appendChild(productItemDiv);
    })

    getAddToCartButtonEvent(document.querySelectorAll('.addToCart'));
    getBuyButton();
}

function getBuyButton(){
	document.querySelector('.cart-buy')
		.addEventListener
		('click', finalizePurchase);
}

function getAddToCartButtonEvent(buttonElements){
    buttonElements
        .forEach(element => element.addEventListener('click', (e) => {
            const button = e.target;
            const productElement = button.closest('.products__item')
            const productObj = createProductElement(productElement);
            addProductToCartObj(productObj);
            renderCartProducts()
        }))
}

function renderCartProducts(){
    const cartContainer = document.querySelector('#cart-container');
    cartContainer.innerHTML = ''

    cartProducts.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.id = product.id;

        const templateCartItemContent = `
        <img class="cart-item__img" src="${product.image}">
        <div class="cart-item__info">
            <div class="cart-item__details">
                <h2 class="cart-item__title">${product.name}</h2>
                <h4 class="cart-item__price">${product.price}</h4>
            </div>
            <div class="cart-item__options">
                <input class="cart-item__quantity" type="number" value="${product.quantity}" disabled>
                <img class="cart-item__delete" src="./img/trash.svg">
            </div>
        </div>`
    
        cartItem.innerHTML = templateCartItemContent;
        cartContainer.appendChild(cartItem);

    })

    getRemoveProductIcon(document.querySelectorAll('.cart-item__delete'));
    getquantityChange(document.querySelectorAll('.cart-item__quantity')); 
    
    updateCartTotals();
    saveLocalStorage();
}

function updateCartTotals(){
    let total = 0;
	let items = 0;
	const cartTotal = document.querySelector('.cart-total');
	const cartItems = document.querySelectorAll('.cart-item');
	const cartItemsIndicator = document.querySelector('.modal__indicator');
	const headerCartIndicator = document.querySelector('.cart__count');

    cartItems.forEach(cartItem => {
		const cartItemElementPrice = cartItem.querySelector('.cart-item__price');
		const cartItemPrice = Number(cartItemElementPrice.textContent.replace('$', ''));
		const cartItemQuantityElement = cartItem.querySelector('.cart-item__quantity');
		const cartItemQuantity = Number(cartItemQuantityElement.value);

		total = total + cartItemPrice * cartItemQuantity;
		items += cartItemQuantity;
	})
	
	cartTotal.innerHTML = `Total: ${total}$`;
	cartItemsIndicator.innerHTML = `Kgs: ${items}`;	
	headerCartIndicator.innerHTML = `${items}`;
}

function finalizePurchase(event){
    event.preventDefault()

    const cartContainer = document.querySelector('#cart-container')
    const cartBuyButton = document.querySelector('.cart-buy');
    const cartTotal = document.querySelector('.cart-total');

    const check = checkProductsInCart(cartContainer);
    if(check === 0){
        cartBuyButton.textContent = 'No tienes productos en tu carrito'
        cartBuyButton.className = 'cart-buy cart-buy-disabled'
        event.target.disabled = true;
        setTimeout(function(){
            cartBuyButton.textContent = 'Comprar'
            cartBuyButton.className = 'cart-buy'
            event.target.disabled = false;
        }, 3000)

        return;
    }

    cartProducts.splice(0, cartProducts.length)
    clearLocalStorage();

    cartTotal.textContent = 'Total: 0$'
    cartTotal.style.display = 'none'

    document.querySelector('.modal__indicator').textContent = 'Kgs :0';
    document.querySelector('.cart__count').textContent = '0';

    cartBuyButton.textContent = 'Gracias por su compra';
    cartBuyButton.className = 'cart-buy cart-buy-disabled'
    event.target.disabled = true;
    cartContainer.innerHTML = ''
    
    setTimeout(function(){
        cartTotal.style.display = 'inline'
        cartBuyButton.textContent = 'Comprar';
        cartBuyButton.className = 'cart-buy'
        event.target.disabled = false;
    }, 3000);
}


