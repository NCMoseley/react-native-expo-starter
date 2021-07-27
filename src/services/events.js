import store from '../redux/store';
import * as SecureStore from "expo-secure-store";
const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';

/**
 * Record normal event
 * @param type
 * @param meta
 * @param id
 */
async function record(type, id = null, meta = null) {
    const isMobile = true;

    const isDependent = await SecureStore.getItemAsync('sb-is-dep');

    if (store.getState().user.meta && !id) {
        if (isDependent) {
            id = { dependentID: store.getState().user.meta.dependentID };
        } else {
            id = { userID: store.getState().user.meta.userID };
        }
    }

    if (!id) {
        return false;
    }

    try {
        // events.log(type, id, meta, isMobile, isProduction);
    } catch (err) {
        console.log('Event Failed: ', err);
    }

    return false;
}

export {
    record
};