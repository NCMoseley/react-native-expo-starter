import * as dates from './dateSource';

/**
 * @param date
 */
function getUTC(date) {
    return dates.getUTC(date);
}

/**
 * @param date
 * @param format
 * @returns {*}
 */
function formatDateForDisplay(date, format = 'll') {
    return dates.getLocalDisplay(date, format);
}

/**
 * Date will be coming in as unix time / 1000
 * @param date
 * @returns {*}
 */
function formatIncomingDate(date) {
    return dates.getUTC(date, "MM/DD/YYYY");
}

/**
 * Convert the provided date to the start of that day (12AM) - This is only used for Birthdates, Hire Dates etc.. where time is not included
 * @param date
 * @returns {*}
 */
function formatOutgoingDate(date) {
    return dates.getStartOfDay(date);
}

/**
 * @param date
 * @param noFuture
 * @returns {string}
 */
function validateDate(date, noFuture = true) {
    return dates.validate(date, noFuture);
}

export {
    formatDateForDisplay,
    formatIncomingDate,
    formatOutgoingDate,
    validateDate,
    getUTC
};