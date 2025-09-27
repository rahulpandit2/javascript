export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},
{
    productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
    quantity: 1
},
{
    productId: `54e0eccd-8f36-462b-b68a-8182611d9add`,
    quantity: 3
}];

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
