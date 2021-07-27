import request from './request';

/**
 * @returns {Promise<unknown>}
 */
function getWhitelabel() {
    const options = {
        endpoint: '/user/whitelabel/auth',
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @returns {Promise<any>}
 */
function get() {
    const options = {
        endpoint: '/user/data',
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @returns {Promise<any>}
 */
function getDependent() {
    const options = {
        endpoint: `/user/dependent/data`,
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}


/**
 * @param body
 * @returns {Promise<any>}
 */
function login(body) {
    const options = {
        endpoint: '/auth/login',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @returns {Promise<any>}
 */
function sendTempPassword(body) {
    const options = {
        endpoint: '/auth/sendTempPassword',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @returns {Promise<any>}
 */
function sendSupportEmail(body) {
    const options = {
        endpoint: '/user/sendSupportEmail',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @returns {Promise<any>}
 */
function updateUserSettings(body) {
    const options = {
        endpoint: '/user/settings',
        method: 'PUT',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @returns {Promise<any>}
 */
function savePaymentDetails(body) {
    const options = {
        endpoint: '/user/payments',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @returns {Promise<any>}
 */
function addDependent(body) {
    const options = {
        endpoint: '/user/dependents',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param dependentID
 * @param body
 * @returns {Promise<any>}
 */
function editDependent(dependentID, body) {
    const options = {
        endpoint: `/user/dependents/${ dependentID }`,
        method: 'PUT',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param dependentID
 * @param password
 * @param signage
 * @returns {Promise<any>}
 */
function removeDependent(dependentID, password, signage) {
    const options = {
        endpoint: `/user/dependents/${ dependentID }`,
        method: 'DELETE',
        body: {
            password,
            signage
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @param currentBeneficiaries
 * @returns {Promise<any>}
 */
function addBeneficiary(body, currentBeneficiaries) {
    const options = {
        endpoint: '/user/beneficiaries',
        method: 'POST',
        body: {
            ...body,
            primary: currentBeneficiaries.primary,
            contingent: currentBeneficiaries.contingent
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param beneficiaryID
 * @param body
 * @param currentBeneficiaries
 * @returns {Promise<any>}
 */
function editBeneficiary(beneficiaryID, body, currentBeneficiaries) {
    const options = {
        endpoint: `/user/beneficiaries/${ beneficiaryID }`,
        method: 'PUT',
        body: {
            ...body,
            primary: currentBeneficiaries.primary,
            contingent: currentBeneficiaries.contingent
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param beneficiaryID
 * @param password
 * @param currentBeneficiaries
 * @param signage
 * @returns {Promise<any>}
 */
function removeBeneficiary(beneficiaryID, password, currentBeneficiaries, signage) {
    const options = {
        endpoint: `/user/beneficiaries/${ beneficiaryID }`,
        method: 'DELETE',
        body: {
            password,
            primary: currentBeneficiaries.primary,
            contingent: currentBeneficiaries.contingent,
            signage
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @returns {Promise<any>}
 */
function addTrustee(body) {
    const options = {
        endpoint: '/user/trustee',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param trusteeID
 * @param body
 * @returns {Promise<any>}
 */
function editTrustee(trusteeID, body) {
    const options = {
        endpoint: `/user/trustee/${ trusteeID }`,
        method: 'PUT',
        body
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param trusteeID
 * @param password
 * @param signage
 * @returns {Promise<any>}
 */
function removeTrustee(trusteeID, password, signage) {
    const options = {
        endpoint: `/user/trustee/${ trusteeID }`,
        method: 'DELETE',
        body: {
            password,
            signage
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param password
 * @param existing
 * @returns {Promise<any>}
 */
function changePassword(password, existing) {
    const options = {
        endpoint: '/user/password',
        method: 'PUT',
        body: {
            existing,
            password
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @param body
 * @returns {Promise<any>}
 */
function savePushToken(body) {
    const options = {
        endpoint: `/user/pushToken/${ body.token }`,
        method: 'POST',
        noJson: true
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * @returns {Promise<unknown>}
 */
function getUsage() {
    const options = {
        endpoint: `/usage`,
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then(resolve)
            .catch(reject);
    });
}

export {
    getWhitelabel,
    get,
    getDependent,
    login,
    sendTempPassword,
    sendSupportEmail,
    updateUserSettings,
    savePaymentDetails,
    addDependent,
    editDependent,
    removeDependent,
    addBeneficiary,
    editBeneficiary,
    removeBeneficiary,
    addTrustee,
    editTrustee,
    removeTrustee,
    changePassword,
    savePushToken,
    getUsage
};