import {cart} from '../data/cart.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product['image']}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product['name']}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${product['rating']['stars']*10}.png">
            <div class="product-rating-count link-primary">
              ${product['rating']['count']}
            </div>
          </div>

          <div class="product-price">
            ₹${Math.floor((product['priceInPaise']*80)/100)}
          </div>

          <div class="product-quantity-container">
            <select data-product-id="${product['id']}">
              <option selected="" value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" data-product-id="${product['id']}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product['id']}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.products-grid').innerHTML = productsHTML;

const addToCartBtn = document.querySelectorAll('.add-to-cart-button');

addToCartBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        const addedMessage = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`)
        let matchingItem;
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        let addedItemMessageTimeoutID;
        function showAddedToCartMessage() {
            addedMessage.style.opacity = 1;
            if (addedItemMessageTimeoutID) clearTimeout(addedItemMessageTimeoutID);
            addedItemMessageTimeoutID = setTimeout(() => {
                addedMessage.style.opacity = 0;
            }, 2000);
        }

        const qunatityToBeAdded = parseInt(document.querySelector(`.product-quantity-container select[data-product-id="${productId}"]`).value);
        if (matchingItem) {
            matchingItem.quantity+=qunatityToBeAdded;
            showAddedToCartMessage();
        } else {
            cart.push({
                productId: productId,
                quantity: qunatityToBeAdded
            });
            showAddedToCartMessage();
        }
        updateCart();
    });
});

function updateCart() {
    let totalCartQty = 0;
    cart.forEach((item) => {
        totalCartQty+=item.quantity;
    });
    document.querySelector('.cart-quantity').textContent = totalCartQty;
}

updateCart();
