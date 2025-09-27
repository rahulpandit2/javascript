import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

function updateCart() {
  let totalCartQty = 0;
  cart.forEach((item) => {
    totalCartQty += item.quantity;
  });
  document.querySelector('.checkout-header-middle-section a').textContent = `${totalCartQty} items`;
  document.querySelector('.payment-summary-row span.cart-quantity').textContent = `${totalCartQty} items`;
}
updateCart();

let htmlContent = ``;

const orderSummary = document.querySelector('.order-summary');

let orderTotal = 0;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  orderTotal += (Math.floor((matchingProduct['priceInPaise'] * 80) / 100) * cartItem.quantity);
  htmlContent += `
    <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  "${matchingProduct.name}"
                </div>
                <div class="product-price">
                  ₹${Math.floor((matchingProduct['priceInPaise'] * 80) / 100)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

orderSummary.innerHTML = htmlContent;
document.querySelector('.payment-summary-money').textContent = `₹${orderTotal}`;

if (orderTotal <= 1000) {
  document.querySelector('.shipping-handling').textContent = `₹50`;
  orderTotal += 50;
} else {
  document.querySelector('.shipping-handling').textContent = `₹0`;
}

document.querySelector('.subtotal-before-tax').textContent = `₹${orderTotal}`;

const taxToPay  = Math.floor(orderTotal * 0.10);
document.querySelector('.estimated-tax').textContent = `₹${taxToPay}`;
orderTotal += taxToPay;

document.querySelector('.order-total').textContent = `₹${orderTotal}`;