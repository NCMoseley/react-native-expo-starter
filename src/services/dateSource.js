import moment from 'moment';

/**
 * Get a UTC timestamp in seconds for the provided date
 * @param date
 * @param format
 * @returns
 */
function getUTC(date = false, format = 'X') {
    let newDate = null;
    if (date) {
        if (!date || isNaN(date) || (date instanceof Date)) {
            newDate = moment(date).utc().format(format);
        } else {
            newDate = moment(new Date(Number(date) * 1000)).utc().format(format);
        }
    } else {
        newDate = moment.utc().format(format);
    }

    if (format === 'X') {
        return Number(newDate);
    }

    return newDate;
}

/**
 * Get the current start of the day at time 00:00:00 in UTC
 * @returns
 */
function getStartOfDay(date = false, format = 'X') {
    let newDate = null;

    if (date) {
        if (!date || isNaN(date) || (date instanceof Date)) {
            newDate = moment(date).utc().startOf('day').format(format);
        } else {
            newDate = moment(new Date(Number(date) * 1000)).utc().startOf('day').format(format);
        }
    } else {
        newDate = moment.utc().startOf('day').format(format);
    }

    if (format === 'X') {
        return Number(newDate);
    }

    return newDate;
}

/**
 * Get the current start of the day at time 00:00:00 in UTC
 * @returns
 */
function getEndOfDay(date = false, format = 'X') {
    let newDate = null;

    if (date) {
        if (!date || isNaN(date) || (date instanceof Date)) {
            newDate = moment(date).utc().endOf('day').format(format);
        } else {
            newDate = moment(new Date(Number(date) * 1000)).utc().endOf('day').format(format);
        }
    } else {
        newDate = moment.utc().endOf('day').format(format);
    }

    if (format === 'X') {
        return Number(newDate);
    }

    return newDate;
}

/**
 * Show the provided date in the users default local timezone
 * @param date
 * @param format
 * @returns {string}
 */
function getLocalDisplay(date, format = 'll') {
    let newDate = null;

    if (!date || isNaN(date) || (date instanceof Date)) {
        newDate = moment(date).local().format(format);
    } else {
        newDate = moment(new Date(Number(date) * 1000)).local().format(format);
    }

    if (format === 'X') {
        return Number(newDate);
    }

    return newDate;
}

/**
 * @param date
 * @param noFuture
 * @param noPast
 * @param mustBeFirstOfMonth
 * @returns {string|null}
 */
function validate(date, noFuture = true, noPast = false, mustBeFirstOfMonth = false) {
    if (!date || date === '') {
        return 'Please enter a date: MM/DD/YYYY';
    }

    if (!moment(date, "MM/DD/YYYY", true)._isValid) {
        return 'Invalid date';
    }

    if (noFuture && !moment(date, "MM/DD/YYYY", true).isBefore()) {
        return 'Date cannot be in the future.';
    }

    if (noPast && !moment(date, "MM/DD/YYYY", true).isAfter()) {
        return 'Date cannot be in the past.';
    }

    if (mustBeFirstOfMonth) {
        const check = moment(date, "MM/DD/YYYY");
        if (check.format('DD') !== '01') {
            return 'The date must be the first of the month.';
        }
    }

    return null;
}

/**
 * Get the amount of time from Now for the date
 * @param date
 * @returns {string}
 */
function fromNow(date) {
    let newDate = null;

    if (!date || isNaN(date) || (date instanceof Date)) {
        newDate = moment(date).local().fromNow();
    } else {
        newDate = moment(new Date(Number(date) * 1000)).local().fromNow();
    }

    return newDate;
}

/**
 * Add time to a date
 * @param date
 * @param amount
 * @param type
 * @param format
 * @returns {string|number}
 */
function getFutureDate(date, amount, type = 'months', format = 'X') {
    if ([ 'days', 'months', 'years' ].indexOf(type) === -1) {
        throw "Invalid type passed to getFutureDate";
    }

    let startDate = null;

    if (date) {
        if (isNaN(date) || (date instanceof Date)) {
            startDate = moment(date).startOf('day');
        } else {
            startDate = moment(new Date(Number(date) * 1000)).startOf('day');
        }
    } else {
        startDate = moment.startOf('day');
    }

    const endDate = moment(startDate).add(amount, type).utc().startOf('day').format(format);

    if (format === 'X') {
        return Number(endDate);
    }

    return endDate;
}

export {
    getUTC,
    getStartOfDay,
    getEndOfDay,
    getLocalDisplay,
    validate,
    fromNow,
    getFutureDate
};