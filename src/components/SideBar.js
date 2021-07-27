import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';
import NavigationService from '../services/NavigationService';
import { scale, moderateScale, verticalScale } from '../services/Scaler';
import Text from './Text';
import Icon from './Icon';
import colors from '../theme/colors';

/**
 * 
 * @param {*} whitelabel 
 */
const stylesFunc = (whitelabel) => StyleSheet.create({
    header: {
        backgroundColor: whitelabel.primaryColor || colors.skyBlue,
        flexDirection: 'row',
        height: '25%',
        paddingTop: Platform.OS === 'android' ? moderateScale(StatusBar.currentHeight) : 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: 'column',
        zIndex: 99999999
    },
    body: {
        backgroundColor: colors.white,
        height: '60%'
    },
    footer: {
        backgroundColor: colors.lightGrey,
        height: '15%'
    },
    headerTextBlock: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerThumbnailBlock: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logo: {
        alignSelf: 'center',
        width: scale(200),
        height: verticalScale(60),
        resizeMode: 'contain'
    },
    navIcon: {
        paddingLeft: moderateScale(25),
        paddingRight: moderateScale(30)
    },
    navRow: {
        alignItems: 'center',
        flex: 0.15,
        flexDirection: 'row'
    },
    navRowFooter: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: moderateScale(30)
    }
});

class SideBar extends PureComponent {
    _goToScreen = (screen) => {
        NavigationService.navigate(screen);
        this.props.closeDrawer();
    };

    render() {
        const { whitelabel } = this.props;

        const { onlySpendingAccountActive, noClaims } = this.props;

        const user = {
            email: 'placeholder@email.com',
            firstname: 'Test',
            lastname: 'User',
            paymentsSetup: 0
        };

        return (
            <View style={styles.container}>
                <View style={stylesFunc(whitelabel).header}>
                    <View style={styles.headerTextBlock}>
                        <Text
                            text={`${ user.firstname } ${ user.lastname }`}
                            large
                            color="white"
                        />

                        <Text
                            text={ user.email }
                            small
                            color="white"
                        />
                    </View>
                </View>

                <View style={styles.body}>
                    <TouchableOpacity
                        style={styles.navRow}
                        onPress={() => this._goToScreen('Home') }
                    >
                        <Icon name="md-home" color="darkGrey" customStyle={styles.navIcon} />
                        <Text text="Home" medium bold />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.navRowFooter}
                        onPress={() => this._goToScreen('Help') }
                    >
                        <Icon name="md-help-circle" color="darkGrey" customStyle={styles.navIcon} />
                        <Text text="Help" test="help" medium bold />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

/**
 * @param state
 * @returns {{user: *}}
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    user: state.user.meta,
    noClaims: state.user.noClaims,
    onlySpendingAccountActive: state.user.onlySpendingAccountActive
});

export default connect(mapStateToProps)(SideBar);