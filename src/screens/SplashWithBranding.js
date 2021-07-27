import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import colors from '../theme/colors';
import { verticalScale, scale } from '../services/Scaler';

/**
 *
 * @param {*} whitelabel
 */
const stylesFunc = (whitelabel) => StyleSheet.create({
    animatedBox: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%'
    },
    splashBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.splashGrey
    },
    sbBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.skyBlue
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        // backgroundColor: whitelabel.primaryColor || colors.skyBlue,
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: verticalScale(200),
        width: '100%',
        marginTop: 10
    },
    image: {
        height: verticalScale(120),
        width: scale(420),
        maxWidth: '90%'
    }
});

class SplashWithBranding extends PureComponent {
    render() {
        const { whitelabel } = this.props;
        const image = { uri: whitelabel.logo };

        return (
            <View style={stylesFunc(whitelabel).background}>
                <View style={stylesFunc(whitelabel).imageBackground}>
                    <Image
                        source={image}
                        resizeMode="contain"
                        style={stylesFunc(whitelabel).image}
                    />
                </View>
            </View>
        );
    }
}

export default SplashWithBranding;