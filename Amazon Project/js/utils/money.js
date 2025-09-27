export function formatCurrency(amountInPaise) {
    const amountInRupees = amountInPaise / 100;
    return `₹${amountInRupees.toFixed(2)}`;
};