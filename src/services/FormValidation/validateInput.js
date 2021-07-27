import validate from 'validate.js';
import validations from './validations';
import * as Dates from '../Dates';
import { validateCreditCard } from '../creditCards';

/**
 * @param name
 * @returns {string}
 * @private
 */
function _validateName(name) {
    if (name.split(' ').length < 2) {
        return 'Please enter a first and last name.';
    }

    return null;
}

/**
 * @param fieldName
 * @param value
 * @returns {*}
 */
const validateInput = (fieldName, value) => {
    if (fieldName.toLowerCase().includes('date')) {
        return Dates.validateDate(value);
    }

    if (fieldName.toLowerCase().includes('credit')) {
        return validateCreditCard(value);
    }

    // if (fieldName.toLowerCase().includes('address')) {
    //     return await _validateAddress(value);
    // }

    if (fieldName.toLowerCase() === 'name') {
        return _validateName(value);
    }

    const formValues = {};
    formValues[fieldName] = value.toString();

    const formFields = {};
    formFields[fieldName] = validations[fieldName];

    const result = validate(formValues, formFields);

    if (result) {
        return result[fieldName][0];
    }

    return null;
};

export default validateInput;