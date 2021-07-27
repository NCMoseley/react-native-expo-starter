import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import colors from '../theme/colors';
import { moderateScale } from '../services/Scaler';

const styles = StyleSheet.create({
    light: {
        fontFamily: 'AvenirLight'
    },
    bold: {
        fontFamily: 'AvenirBold'
    },
    smallest: {
        fontSize: moderateScale(8)
    },
    squint: {
        fontSize: moderateScale(10)
    },
    tiny: {
        fontSize: moderateScale(12)
    },
    small: {
        fontSize: moderateScale(14)
    },
    medium: {
        fontSize: moderateScale(16)
    },
    mediumLarge: {
        fontSize: moderateScale(18)
    },
    large: {
        fontSize: moderateScale(20)
    },
    largest: {
        fontSize: moderateScale(25)
    }
});

/**
 * @param text
 * @param tiny
 * @param small
 * @param medium
 * @param mediumLarge
 * @param large
 * @param largest
 * @param light
 * @param bold
 * @param uppercase
 * @param color
 * @param marginTop
 * @param marginBottom
 * @param marginLeft
 * @param marginRight
 * @param align
 * @param flex
 * @param customStyle
 * @returns {*}
 * @constructor
 */
const Text = ({ text, smallest, squint, tiny, small, medium, mediumLarge, large, largest, light, bold, uppercase, color, marginTop, marginBottom, marginLeft, marginRight, align, flex, customStyle, test }) => {
    const style = [];

    if (light) {
        style.push(styles.light);
    }

    if (bold) {
        style.push(styles.bold);
    }

    if (smallest) {
        style.push(styles.smallest);
    }

    if (squint) {
        style.push(styles.squint);
    }

    if (tiny) {
        style.push(styles.tiny);
    }

    if (small) {
        style.push(styles.small);
    }

    if (medium) {
        style.push(styles.medium);
    }

    if (mediumLarge) {
        style.push(styles.mediumLarge);
    }

    if (large) {
        style.push(styles.large);
    }

    if (largest) {
        style.push(styles.largest);
    }

    if (uppercase) {
        text = text.toUpperCase();
    }

    if (customStyle) {
        style.push(customStyle);
    }

    let textColor = '';
    switch (color) {
        case 'skyBlue':
            textColor = colors.skyBlue;
            break;
        case 'transparent':
            textColor = colors.transparent;
            break;
        case 'brandGreen':
            textColor = colors.brandGreen;
            break;
        case 'red':
            textColor = colors.red;
            break;
        case 'darkGrey':
            textColor = colors.darkGrey;
            break;
        case 'darkBlue':
            textColor = colors.darkBlue;
            break;
        case 'mediumDarkGrey':
            textColor = colors.mediumDarkGrey;
            break;
        default:
            textColor = color || colors.mainTextGrey;
    }

    return (
        <RNText
            style={[
                {
                    fontFamily: 'Avenir',
                    textAlign: align || 'left',
                    color: textColor,
                    marginTop: marginTop ? moderateScale(marginTop) : null,
                    marginBottom: marginBottom ? moderateScale(marginBottom) : null,
                    marginLeft: marginLeft ? moderateScale(marginLeft) : null,
                    marginRight: marginRight ? moderateScale(marginRight) : null,
                    flex: flex || null
                },
                ...style
            ]}
            testID={test}
            allowFontScaling={false}
        >
            { text }
        </RNText>
    );
};

export default Text;