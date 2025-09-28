export function formatCurrency(amountInPaise) {
    return Math.floor((amountInPaise * 80) / 100).toFixed(2);
};