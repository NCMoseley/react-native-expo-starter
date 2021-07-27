import React from 'react';
import Text from '../components/Text';
import colors from '../theme/colors';
import { StyleSheet, View } from 'react-native';
import { verticalScale, moderateScale } from "../services/Scaler";

import { numberWithCommas } from "../services/helpers";

const styles = StyleSheet.create({
    coverageDataRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: moderateScale(10)
    }
});

/**
 *
 * @param {*} param
 * @param {*} value
 */
const _renderSwitch = (param, value) => {
    switch (param) {
        case 'percent':
            return <Text text={`${ value }%` } small light />;
        case 'header':
            return <Text text={value} small bold />;
        case 'age':
            return <Text text={value} small />;
        case 'days':
            return <Text text={value === 0 ? 'none' : value === 1 ? '1 day' : `${ value } days` } small />;
        default:
            return <Text text={ `$${ numberWithCommas(value.toFixed(2)) }` } small light />;
    }
};

/**
 *
 * @param title
 * @param value
 * @param type
 */
const CoverageBlock = ({ title, value, type, isParameds }) => (
    <View style={styles.coverageDataRow}>
        <Text text={title} small light bold={type === 'header'} flex={1} />

        {!isParameds && _renderSwitch(type, value)}
    </View>
);


export default CoverageBlock;