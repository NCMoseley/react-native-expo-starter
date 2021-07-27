import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { moderateScale, verticalScale } from '../services/Scaler';
import colors from '../theme/colors';
import Text from './Text';
import Icon from './Icon';

/**
 * 
 * @param {*} whitelabel 
 */
const stylesFunc = (whitelabel) => StyleSheet.create({
    header: {
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        paddingTop: Platform.OS === 'android' ? moderateScale(StatusBar.currentHeight) : moderateScale(10),
        height: Platform.OS === 'ios' ? verticalScale(80) : verticalScale(60 + StatusBar.currentHeight),
        backgroundColor: whitelabel.primaryColor || colors.skyBlue,
        flexDirection: 'row'
    }
});

const styles = StyleSheet.create({
    verticalCenter: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    headerTitleBlock: {
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

class Header extends Component {
    _openDrawer = () => {
        this.props.openDrawer();
    };

    _goToSettings = () => {
        this.props.navigation.navigate('Settings');
    };

    render() {
        const { whitelabel } = this.props;

        return (
            <View testID={this.props.test} style={ stylesFunc(whitelabel).header }>
                <View style={ styles.verticalCenter }>
                    {
                        (this.props.leftIcon && this.props.onLeftIconPress) ?
                            this.props.leftIcon === 'empty' ?
                                <React.Fragment/>
                                :
                                <Icon name={this.props.leftIcon} size={30} onPress={this.props.onLeftIconPress} />
                            :
                            <Icon test="hamburger" name="ios-menu" size={30} onPress={this._openDrawer} />
                    }
                </View>

                <View style={ styles.headerTitleBlock }>
                    <Text
                        text={ this.props.title }
                        color="white"
                        largest
                        align={this.props.titleAlign}
                    />
                </View>

                <View style={ styles.verticalCenter }>
                    {
                        (this.props.rightIcon && this.props.onRightIconPress) ?
                            <Icon name={this.props.rightIcon} size={30} onPress={this.props.onRightIconPress} />
                            :
                            <Icon test="profile" name="md-contact" size={30} onPress={this._goToSettings} />
                    }
                </View>
            </View>
        );
    }
}

/**
 * @param state
 * @returns {{loading: *}}
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel
});

export default connect(mapStateToProps)(Header);