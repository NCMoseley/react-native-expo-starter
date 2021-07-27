import { CommonActions } from '@react-navigation/native';

let _navigator = null;

/**
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

/**
 * @param routeName
 * @param params
 */
function navigate(routeName, params) {
    _navigator.dispatch(CommonActions.navigate({
        name: routeName,
        params
    }));
}

/**
 * @returns {boolean}
 */
function isNavigatorReady() {
    return _navigator !== null;
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    isNavigatorReady
};