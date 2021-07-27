import * as SecureStore from 'expo-secure-store';
import * as user from '../xhr/user';
import * as notifier from '../services/Notifier';
import * as session from '../services/Session';
import * as types from './types/user';
import * as events from "../services/events";

/**
 * @param dispatch
 * @param state
 */
function setLoading(dispatch, state) {
    dispatch({
        type: types.LOADING,
        state
    });
}

/**
 * @returns {function(*): Promise<boolean>}
 */
export function setWhitelabel(initialWhiteLabel) {
    return (dispatch) => {
        dispatch({
            type: types.GET_WHITELABEL,
            whitelabel: initialWhiteLabel
        });

        const jsonValue = JSON.stringify(initialWhiteLabel);
        SecureStore.setItemAsync('sb-whitelabel', jsonValue);

        return initialWhiteLabel;
    };
}

/**
 * @returns {function(*): Promise<boolean>}
 */
export function getWhitelabel() {
    return (dispatch) => user.getWhitelabel()
        .then(async (data) => {
            // if there is no whitelabel data then let's delete the local storage of the whitelabel
            if (!data || Object.keys(data).length === 0) {
                await SecureStore.deleteItemAsync('sb-whitelabel');
                return null;
            }

            dispatch({
                type: types.GET_WHITELABEL,
                whitelabel: data
            });

            const jsonValue = JSON.stringify(data);
            await SecureStore.setItemAsync('sb-whitelabel', jsonValue);

            return data;
        })
        .catch(async (error) => {
            console.log(error);
            await SecureStore.deleteItemAsync('sb-whitelabel');
            notifier.displayError(error.verbiage);
            return false;
        });
}

/**
 * @returns {function(*=): Promise<boolean | never>}
 */
export function loadUserData() {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.get()
            .then(async (data) => {
                await session.setToken(data.token);

                console.log('data:', data);

                const onlySpendingAccountActive = !(data.coverage.criticalIllness.benefitActive === 1
                    || data.coverage.deathDismemberment.benefitActive === 1
                    || data.coverage.dental.benefitActive === 1
                    || data.coverage.dependentLife.benefitActive === 1
                    || data.coverage.drugs.benefitActive === 1
                    || data.coverage.efap.benefitActive === 1
                    || data.coverage.lifeInsurance.benefitActive === 1
                    || data.coverage.ltd.benefitActive === 1
                    || data.coverage.majorMedical.benefitActive === 1
                    || data.coverage.outOfCountry.benefitActive === 1
                    || data.coverage.paramedicals.benefitActive === 1
                    || data.coverage.std.benefitActive === 1
                    || data.coverage.vision.benefitActive === 1);

                const noClaims = data.claims.length === 0;

                dispatch({
                    type: types.GET_USER,
                    meta: data.meta,
                    beneficiaries: data.beneficiaries,
                    dependents: data.dependents,
                    trustee: data.trustee,
                    onlySpendingAccountActive,
                    noClaims
                });

                events.record('app_load');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @returns {function(*=): Promise<unknown>}
 */
export function loadDependentData() {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user
            .getDependent()
            .then((data) => {
                session.setToken(data.token);

                dispatch({
                    type: types.GET_DEPENDENT,
                    meta: data.meta
                });
            })
            .then(() => {
                events.record('app_load');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}


/**
 * @param username
 * @param password
 */
export function login(username, password) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.login({ username, password })
            .then(async (data) => {
                await session.setToken(data.token);

                await SecureStore.setItemAsync('username', username);

                if (data.dependentID) {
                    await session.setIsDependent();
                    events.record('dependent-login', { dependentID: data.dependentID });
                } else if (data.userID) {
                    events.record('login', { userID: data.userID });
                }

                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param email
 */
export function forgotPassword(email) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.sendTempPassword(email)
            .then(() => {
                setLoading(dispatch, false);
                notifier.displayMessage('Please check your inbox for a password recovery email.');
                events.record('send_temp_password');
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param body
 * @returns {function(*=): Promise<boolean>}
 */
export function supportEmail(body) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user
            .sendSupportEmail(body)
            .then(() => {
                setLoading(dispatch, false);
                notifier.displayMessage('Please check your inbox for a response to your support request.');

                events.record('send_support_email');
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param password
 * @param isDependent
 * @returns {function(*=): Promise<any | never>}
 */
export function changePassword(password, existing) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user
            .changePassword(password, existing)
            .then(() => {
                setLoading(dispatch, false);
                notifier.displayMessage('Successfully updated your password!');
                events.record('password_changed');

                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param data
 * @returns {function(*=): Promise<T | never>}
 */
export function updateUserSettings(data) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user
            .updateUserSettings(data)
            .then(() => {
                dispatch({
                    type: types.UPDATE_USER_SETTINGS_SUCCESS,
                    data
                });

                setLoading(dispatch, false);
                notifier.displayMessage('Successfully updated user settings.');
                events.record('settings_changed');

                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param data
 * @returns {function(*=): Promise<T | boolean>}
 */
export function savePaymentDetails(data) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user
            .savePaymentDetails(data)
            .then(() => {
                dispatch({
                    type: types.PAYMENT_DETAILS_SUCCESS
                });

                setLoading(dispatch, false);
                notifier.displayMessage('Successfully saved payment details.');
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param dependent
 * @returns {function(*=): Promise<T | never>}
 */
export function addDependent(dependent) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.addDependent(dependent)
            .then((data) => {
                dispatch({
                    type: types.ADD_DEPENDENT_SUCCESS,
                    dependent: data
                });

                notifier.displayMessage('Successfully added dependent!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param dependentID
 * @param dependent
 * @returns {function(*=): Promise<T | never>}
 */
export function editDependent(dependentID, dependent) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.editDependent(dependentID, dependent)
            .then((data) => {
                dispatch({
                    type: types.UPDATE_DEPENDENT_SUCCESS,
                    dependent: data,
                    dependentID
                });

                notifier.displayMessage('Successfully updated dependent!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param dependentID
 * @param password
 * @param signage
 * @returns {function(*=): Promise<any | never>}
 */
export function removeDependent(dependentID, password, signage) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.removeDependent(dependentID, password, signage)
            .then(() => {
                dispatch({
                    type: types.REMOVE_DEPENDENT_SUCCESS,
                    dependentID
                });

                notifier.displayMessage('Successfully removed dependent!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param beneficiary
 * @param currentBeneficiaries
 * @param isContingent
 * @returns {function(*=): Promise<boolean>}
 */
export function addBeneficiary(beneficiary, currentBeneficiaries, isContingent = false) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.addBeneficiary(beneficiary, currentBeneficiaries)
            .then((data) => {
                dispatch({
                    type: types.ADD_BENEFICIARY_SUCCESS,
                    beneficiary: data,
                    isContingent
                });

                dispatch({
                    type: types.UPDATE_CURRENT_BENEFICIARIES,
                    currentBeneficiaries,
                    isContingent
                });

                notifier.displayMessage('Successfully added beneficiary!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param beneficiaryID
 * @param beneficiary
 * @param currentBeneficiaries
 * @param isContingent
 * @returns {function(*=): Promise<boolean>}
 */
export function editBeneficiary(beneficiaryID, beneficiary, currentBeneficiaries, isContingent = false) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.editBeneficiary(beneficiaryID, beneficiary, currentBeneficiaries)
            .then((data) => {
                dispatch({
                    type: types.UPDATE_BENEFICIARY_SUCCESS,
                    beneficiary: data,
                    beneficiaryID,
                    isContingent
                });

                dispatch({
                    type: types.UPDATE_CURRENT_BENEFICIARIES,
                    currentBeneficiaries,
                    isContingent
                });

                notifier.displayMessage('Successfully updated beneficiary!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param beneficiaryID
 * @param password
 * @param currentBeneficiaries
 * @param signage
 * @param isContingent
 * @returns {function(*=): Promise<boolean>}
 */
export function removeBeneficiary(beneficiaryID, password, currentBeneficiaries, signage, isContingent = false) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.removeBeneficiary(beneficiaryID, password, currentBeneficiaries, signage)
            .then(() => {
                dispatch({
                    type: types.REMOVE_BENEFICIARY_SUCCESS,
                    beneficiaryID,
                    isContingent
                });

                dispatch({
                    type: types.UPDATE_CURRENT_BENEFICIARIES,
                    currentBeneficiaries,
                    isContingent
                });

                notifier.displayMessage('Successfully removed beneficiary!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param trustee
 * @returns {function(*=): Promise<T | never>}
 */
export function addTrustee(trustee) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.addTrustee(trustee)
            .then((data) => {
                dispatch({
                    type: types.ADD_TRUSTEE_SUCCESS,
                    trustee: data
                });

                notifier.displayMessage('Successfully added trustee!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param trusteeID
 * @param trustee
 * @returns {function(*=): Promise<T | never>}
 */
export function editTrustee(trusteeID, trustee) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.editTrustee(trusteeID, trustee)
            .then(() => {
                dispatch({
                    type: types.UPDATE_TRUSTEE_SUCCESS,
                    trustee: trustee
                });

                notifier.displayMessage('Successfully updated trustee!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * @param trusteeID
 * @param password
 * @param signage
 * @returns {function(*=): Promise<boolean | never>}
 */
export function removeTrustee(trusteeID, password, signage) {
    return (dispatch) => {
        setLoading(dispatch, true);

        return user.removeTrustee(trusteeID, password, signage)
            .then(() => {
                dispatch({
                    type: types.REMOVE_TRUSTEE_SUCCESS
                });

                notifier.displayMessage('Successfully removed trustee!');
                setLoading(dispatch, false);
                return true;
            })
            .catch((error) => {
                console.log(error);
                setLoading(dispatch, false);
                notifier.displayError(error.verbiage);
                return false;
            });
    };
}

/**
 * Save new push token for the user
 * @param token
 * @returns {function(): Promise<T | never>}
 */
export function savePushToken(token) {
    return () => user.savePushToken({ token })
        .then(() => true)
        .catch((error) => {
            console.log(error);
            return false;
        });
}

/**
 * Remove the users JWT and refresh the app.
 */
export function logout() {
    session.logout();
}