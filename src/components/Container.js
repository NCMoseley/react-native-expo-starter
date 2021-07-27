import React from 'react';
import { Container as NBContainer } from 'native-base';
import colors from '../theme/colors';

/**
 * @param backgroundColor
 * @param customStyle
 * @param children
 * @returns {*}
 * @constructor
 */
const Container = ({ backgroundColor, customStyle, children, test }) => {

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
        case 'backgroundGrey':
            bgColor = colors.backgroundGrey;
            break;
        default:
            bgColor = backgroundColor || colors.transparent;
    }

    return (
        <NBContainer testID={test} style={{
            flex: 1,
            backgroundColor: backgroundColor ? bgColor : colors.white,
            ...customStyle
        }}>
            {
                children
            }
        </NBContainer>
    );
};

export default Container;