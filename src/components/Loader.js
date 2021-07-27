import React from 'react';
import { Spinner } from 'native-base';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loader: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        left: 0,
        opacity: 0.65,
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        top: 0,
        zIndex: 99999
    },
    spinner: {
        color: '#56bfd8'
    }
});

/**
 * @returns {*}
 * @constructor
 */
const Loader = () => (
    <View style={styles.loader}>
        <Spinner style={ styles.spinner } />
    </View>
);

export default Loader;