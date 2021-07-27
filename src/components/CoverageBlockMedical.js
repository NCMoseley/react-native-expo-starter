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
const CoverageBlockMedical = ({ coverage }) => Object.keys(coverage).map((item) => {
    // Make sure there is a value associated with each row that isn't 0
    if (
        typeof coverage[item] === 'number' &&
        coverage[item] > 1 &&
        !item.includes('Ends') &&
        !item.includes('Deductible') &&
        !item.includes('deductible') &&
        !item.includes('Period') &&
        !item.includes('Age') &&
        !item.includes('Week') &&
        !item.includes('Survivor') &&
        !item.includes('reimbursement')
    ) {
        if (item.includes("hospitalBenefits") || item.includes("convalescentHospitalReimbursement")) {
            return (
                <View key={item} style={styles.coverageDataRow}>
                    {/* This series of functions takes converts the camelCase string to Normal Case */}
                    <Text small light flex={1}
                        text={item.replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                    />
                    <Text text={ `${ numberWithCommas(coverage[item].toFixed(2)) }%` } small light />
                </View>
            );
        }

        if (item.includes("convalescentHospitalMaxDays")) {
            return (
                <View key={item} style={styles.coverageDataRow}>
                    {/* This series of functions takes converts the camelCase string to Normal Case */}
                    <Text small light flex={1}
                        text={item.replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                    />
                    <Text text={coverage[item]} small light />
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

    return true;
});

export default CoverageBlockMedical;