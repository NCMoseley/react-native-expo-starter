/**
 * @param creditCardNumber
 * @returns {string}
 */
function validateCreditCard(creditCardNumber) {
    if (!creditCardNumber || creditCardNumber.length !== 16) {
        return 'Please enter a valid 16 digit credit card number.';
    }

    if (Number(creditCardNumber.charAt(0)) !== 4) {
        return 'Please enter a valid credit card number.';
    }

    return null;
}

export {
    validateCreditCard
};