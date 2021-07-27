import { Drawer, Toast } from 'native-base';
import { Platform } from 'react-native';
import React from "react";

/**
 * @param verbiage
 */
function displayError(verbiage) {
    verbiage = verbiage || 'Something went wrong, please try again.';

    return (
        Toast.show({
            text: verbiage,
            buttonText: 'Okay',
            duration: 10000,
            useNativeDriver: true,
            type: 'danger',
            textStyle: {
                fontFamily: 'AvenirLight'
            },
            buttonTextStyle: {
                fontFamily: 'Avenir'
            }
        })
    );
}

/**
 * @param verbiage
 * @param duration
 */
function displayMessage(verbiage, duration = 5000) {
    return (
        Toast.show({
            text: verbiage,
            buttonText: 'Okay',
            duration: duration,
            useNativeDriver: true,
            type: 'success',
            textStyle: {
                fontFamily: 'AvenirLight'
            },
            buttonTextStyle: {
                fontFamily: 'Avenir'
            }
        })
    );
}

/**
 * @param verbiage
 */
function showNotification(verbiage) {
    return (
        Toast.show({
            text: verbiage,
            buttonText: 'Okay',
            duration: 60000,
            useNativeDriver: true,
            type: 'success',
            textStyle: {
                fontFamily: 'AvenirLight'
            },
            buttonTextStyle: {
                fontFamily: 'Avenir'
            },
            position: Platform.OS === 'android' ? 'bottom' : 'top'
        })
    );
}

export {
    displayError,
    displayMessage,
    showNotification
};