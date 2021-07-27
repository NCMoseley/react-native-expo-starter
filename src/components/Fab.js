import React from 'react';
import { Fab as NBFab } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

/**
 * 
 * @param {*} whitelabel 
 */
const stylesFunc = (whitelabel) => StyleSheet.create({
    fab: {
        backgroundColor: whitelabel.primaryColor || colors.brandGreen,
        zIndex: 9999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/**
 * @param active
 * @param onPress
 * @param children
 * @param position
 * @returns {*}
 * @constructor
 */
const Fab = ({ active, onPress, children, position = 'bottomRight', whitelabel = false }) => (
    <NBFab
        active={ active }
        style={ stylesFunc(whitelabel).fab }
        position={ position }
        onPress={ onPress }
    >
        { children }
    </NBFab>
);

export default Fab;