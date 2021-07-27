import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { scale, verticalScale, moderateScale } from '../services/Scaler';
import Text from './Text';

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    }
});

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const Button = (props) => {
    const style = [];

    if (props.customStyle) {
        style.push(props.customStyle);
    }

    if (props.fullWidth) {
        style.push(styles.fullWidth);
    }

    let name = props.name;
    
    if (props.uppercase) {
        name = name.toUpperCase();
    }

    let backgroundColor = "";
    switch (props.backgroundColor) {
        case 'skyBlue':
            backgroundColor = colors.skyBlue;
            break;
        case 'transparent':
            backgroundColor = colors.transparent;
            break;
        case 'brandGreen':
            backgroundColor = colors.brandGreen;
            break;
        case 'red':
            backgroundColor = colors.red;
            break;
        default:
            backgroundColor = props.backgroundColor || colors.skyBlue;
    }

    return (
        <TouchableOpacity
            style={[
                {
                    backgroundColor: backgroundColor,
                    height: verticalScale(props.height) || verticalScale(60),
                    width: scale(props.width) || null,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: props.marginTop !== undefined ? moderateScale(props.marginTop) : null,
                    marginBottom: props.marginBottom !== undefined ? moderateScale(props.marginBottom) : null,
                    marginLeft: props.marginLeft !== undefined ? moderateScale(props.marginLeft) : null,
                    marginRight: props.marginRight !== undefined ? moderateScale(props.marginRight) : null,
                    paddingTop: props.paddingTop !== undefined ? moderateScale(props.paddingTop) : props.backgroundColor === 'transparent' ? 0 : moderateScale(2),
                    paddingBottom: props.paddingBottom !== undefined ? moderateScale(props.paddingBottom) : null,
                    paddingLeft: props.paddingLeft !== undefined ? moderateScale(props.paddingLeft) : null,
                    paddingRight: props.paddingRight !== undefined ? moderateScale(props.paddingRight) : null,
                    borderRadius: !props.fullWidth ? 5 : 0
                },
                ...style
            ]}
            onPress={props.onPress}
        >
            <Text
                text={name}
                color={props.color || "white"}
                mediumLarge={true}
                large={props.large}
                largest={props.largest}
                bold={ props.bold || true}
                test={props.test}
            />
        </TouchableOpacity>
    );
};

export default Button;