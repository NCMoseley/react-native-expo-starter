import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { moderateScale } from '../services/Scaler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


/**
 * @param name
 * @param onPress
 * @param type
 * @param color
 * @param size
 * @param active
 * @param marginTop
 * @param marginBottom
 * @param marginLeft
 * @param marginRight
 * @param customStyle
 * @param touchCustomStyle
 * @returns {*}
 * @constructor
 */
const Icon = ({ name, onPress, type, color, size, active, marginTop, marginBottom, marginLeft, marginRight, customStyle = {}, touchCustomStyle = {}, test }) => {

    let iconColor = '';
    switch (color) {
        case 'skyBlue':
            iconColor = colors.skyBlue;
            break;
        case 'transparent':
            iconColor = colors.transparent;
            break;
        case 'brandGreen':
            iconColor = colors.brandGreen;
            break;
        case 'red':
            iconColor = colors.red;
            break;
        case 'darkGrey':
            iconColor = colors.darkGrey;
            break;
        case 'darkBlue':
            iconColor = colors.darkBlue;
            break;
        case 'mediumDarkGrey':
            iconColor = colors.mediumDarkGrey;
            break;
        default:
            iconColor = color || colors.white;
    }

    const style = {
        fontSize: moderateScale(size) || moderateScale(25),
        color: iconColor,
        marginTop: marginTop ? moderateScale(marginTop) : null,
        marginBottom: marginBottom ? moderateScale(marginBottom) : null,
        marginLeft: marginLeft ? moderateScale(marginLeft) : null,
        marginRight: marginRight ? moderateScale(marginRight) : null
    };

    let icon = {};
    switch (type) {
        case 'MaterialIcons':
            icon = (
                <MaterialIcons
                    name={name}
                    active={active}
                    style={ onPress ? style : Object.assign(style, customStyle) }
                />
            );

            break;
        case 'Ionicons':
            icon = (
                <Ionicons
                    name={name}
                    active={active}
                    style={ onPress ? style : Object.assign(style, customStyle) }
                />
            );

            break;
        default:
            icon = (
                <Ionicons
                    name={name}
                    active={active}
                    style={ onPress ? style : Object.assign(style, customStyle) }
                />
            );
    }

    if (onPress) {
        return (
            <TouchableOpacity testID={test} onPress={onPress} style={{ backgroundColor: 'transparent', ...touchCustomStyle }}>
                { icon }
            </TouchableOpacity>
        );
    }

    return icon;
};

export default Icon;