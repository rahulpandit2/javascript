export const cart = [];

const addedItemMessageTimeoutIDs = {};
function showAddedToCartMessage(productId) {
    const addedMessage = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
    addedMessage.style.opacity = 1;
    if (addedItemMessageTimeoutIDs[productId]) {
        clearTimeout(addedItemMessageTimeoutIDs[productId]);
    }
    addedItemMessageTimeoutIDs[productId] = setTimeout(() => {
        addedMessage.style.opacity = 0;
    }, 2000);
}

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    const qunatityToBeAdded = parseInt(document.querySelector(`.product-quantity-container select[data-product-id="${productId}"]`).value);
    if (matchingItem) {
        matchingItem.quantity += qunatityToBeAdded;
        showAddedToCartMessage(productId);
    } else {
        cart.push({
            productId: productId,
            quantity: qunatityToBeAdded
        });
        showAddedToCartMessage(productId);
    }
}
