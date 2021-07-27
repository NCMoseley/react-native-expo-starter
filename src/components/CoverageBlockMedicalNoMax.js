import React from 'react';
import Text from './Text';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from "../services/Scaler";

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
const CoverageBlockMedicalNoMax = ({ coverage }) => Object.keys(coverage).map((item) => {
    if (coverage[item] === 'rc') {
        return (
            <View key={item} style={styles.coverageDataRow}>
                {/* This series of functions takes converts the camelCase string to Normal Case */}
                <Text small light flex={1}
                    text=
                        {item.replace('Max', '')
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                />
                <Text text="No Maximum" small light />
            </View>
        );
    }

    return true;
});

export default CoverageBlockMedicalNoMax;