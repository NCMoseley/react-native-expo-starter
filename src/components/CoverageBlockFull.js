import React from 'react';
import Text from './Text';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from "../services/Scaler";

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
 * @param coverage
 */
const CoverageBlockFull = ({ coverage, isParameds }) => Object.keys(coverage).map((item) => {
   
    // Make sure there is a value associated with each row that isn't 0
    if (item.includes('Max') && !item.includes('Maximum') && coverage[item] > 1) {

        if (item === "edMax") {
            return (
                <View key={item} style={styles.coverageDataRow}>
                    {/* This series of functions takes converts the camelCase string to Normal Case */}
                    <Text small light flex={1}
                        text="Erectile Dysfunction Medication"
                    />
                    <Text text={ `$${ numberWithCommas(coverage[item].toFixed(2)) }` } small light />
                </View>
            );
        }

        return (
            <View key={item} style={styles.coverageDataRow}>
                {/* This series of functions takes converts the camelCase string to Normal Case */}
                <Text small light flex={1}
                    text=
                        {item.replace('Max', '')
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                />
                <Text text={ `$${ numberWithCommas(coverage[item].toFixed(2)) }` } small light />
            </View>
        );
    }

    if (isParameds && coverage[item] === 0 && !item.includes('Eligible') && !item.includes('has') && !item.includes('Maximum') && !item.includes('Reimbursement')) {

        return (
            <View key={item} style={styles.coverageDataRow}>
                {/* This series of functions takes converts the camelCase string to Normal Case */}
                <Text small light flex={1}
                    text=
                        {item.replace('Max', '')
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                />
            </View>
        );
    }

    return true;
});

export default CoverageBlockFull;