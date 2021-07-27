import React from 'react';
import { Form as NBForm } from 'native-base';
import { moderateScale } from "../services/Scaler";
import colors from "../theme/colors";

/**
 * @param paddingTop
 * @param paddingBottom
 * @param paddingLeft
 * @param paddingRight
 * @param backgroundColor
 * @param flex
 * @param customStyle
 * @param children
 * @returns {*}
 * @constructor
 */
const Form = ({ paddingTop, paddingBottom, paddingLeft, paddingRight, backgroundColor, flex, customStyle = {}, children }) => {

    let bgColor = "";
    switch (backgroundColor) {
        case 'skyBlue':
            bgColor = colors.skyBlue;
            break;
        case 'transparent':
            bgColor = colors.transparent;
            break;
        case 'brandGreen':
            bgColor = colors.brandGreen;
            break;
        case 'red':
            bgColor = colors.red;
            break;
        default:
            bgColor = backgroundColor || colors.transparent;
    }

    return (
        <NBForm style={{
            flex: flex || 1,
            backgroundColor: backgroundColor ? bgColor : 'transparent',
            paddingTop: paddingTop !== undefined ? moderateScale(paddingTop) : null,
            paddingBottom: paddingBottom !== undefined ? moderateScale(paddingBottom) : null,
            paddingLeft: paddingLeft !== undefined ? moderateScale(paddingLeft) : moderateScale(20),
            paddingRight: paddingRight !== undefined ? moderateScale(paddingRight) : moderateScale(20),
            ...customStyle
        }}>
            { children }
        </NBForm>
    );
};

export default Form;