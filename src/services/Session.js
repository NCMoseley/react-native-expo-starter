import * as SecureStore from 'expo-secure-store';
import NavigationService from "./NavigationService";

/**
 * @param token
 * @returns {*}
 */
function setToken(token) {
    return SecureStore.setItemAsync('placeholder_Token', token);
}

/**
 * @returns {*}
 */
function getToken() {
    return SecureStore.getItemAsync('placeholder_Token');
}

/**
 * @returns {*}
 */
async function removeToken() {
    await SecureStore.deleteItemAsync('placeholder_Token');
    return true;
}

/**
 */
async function logout() {
    await removeToken();
    NavigationService.navigate('Login');
}

export {
    setToken,
    getToken,
    removeToken,
    logout
};