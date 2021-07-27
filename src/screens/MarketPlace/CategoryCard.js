import React from 'react';
import { StyleSheet, View } from 'react-native';
import globalStyles from '../../theme/globalStyles';
import Text from '../../components/Text';
import colors from "../../theme/colors";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    type: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: moderateScale(20),
        backgroundColor: colors.lightBlue,
        height: '100%',
        minWidth: 100
    },
    blockRow: globalStyles.blockRow,
    details: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: moderateScale(20),
        height: '100%'
    }
});

/**
 * @param type
 * @param vendors
 * @param offers
 * @param customStyle
 * @returns {*}
 * @constructor
 */
const CategoryCard = ({ type, vendors, offers, customStyle, whitelabel = {} }) => (
    <View style={[ styles.blockRow, customStyle || null ]}>
        <View style={styles.type}>
            <Text
                text={type}
                light
                mediumLarge
                color={ whitelabel.primaryColor || colors.darkBlue }
            />
        </View>

        <View style={styles.details}>
            <Text
                text={vendors}
                color="mediumDarkGrey"
                medium
            />

            <Text
                text="vendors"
                color="mediumDarkGrey"
                small
                light
            />
        </View>

        <View style={styles.details}>
            <Text
                text={offers}
                color="mediumDarkGrey"
                medium
            />

            <Text
                text="offers"
                color="mediumDarkGrey"
                small
                light
            />
        </View>
    </View>
);

export default CategoryCard;