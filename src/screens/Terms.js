import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { moderateScale, verticalScale } from '../services/Scaler';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Container from '../components/Container';
import * as events from "../services/events";
import * as constants from "../services/constants";
import Content from '../components/Content';
import Loader from '../components/Loader';
import colors from '../theme/colors';

const styles = StyleSheet.create({
    waterMark: {
        opacity: 0.05,
        position: 'absolute',
        resizeMode: 'contain',
        bottom: 0,
        right: 0,
        height: moderateScale(200),
        width: moderateScale(200),
        zIndex: -9999
    },
    logo: {
        flex: 1,
        width: moderateScale(275),
        height: moderateScale(100),
        marginLeft: moderateScale(20),
        resizeMode: 'contain'
    },
    touchContainer: {
        display: 'flex',
        top: Platform.OS === 'android' ? moderateScale(StatusBar.currentHeight) : moderateScale(20),
        right: moderateScale(20),
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: moderateScale(80),
        height: verticalScale(50),
        backgroundColor: 'transparent'
    }
});

class Terms extends Component {
    // eslint-disable-next-line camelcase
    componentDidMount() {
        events.record('view_Terms');
    }

    render() {
        const { whitelabel } = this.props;

        return (
            <Container>
                <Content customStyle={{ marginTop: moderateScale(50) }}>
                    <Image
                        source={ whitelabel.logo ?
                            { uri: whitelabel.logo }
                            :
                            require('../assets/combo-wordmark-color-large.png')
                        }
                        style={styles.logo}
                    />

                    <Text
                        text="Terms of Service"
                        color={ whitelabel.primaryColor || colors.darkBlue }
                        mediumLarge
                        bold
                        marginTop={moderateScale(20)}
                        marginLeft={moderateScale(20)}
                        marginRight={moderateScale(20)}
                        marginBottom={moderateScale(20)}
                        test="termsofusepage"
                    />

                    <Text
                        text={constants.termsAndConditions(whitelabel)}
                        color="darkGrey"
                        medium
                        light
                        marginTop={moderateScale(20)}
                        marginLeft={moderateScale(20)}
                        marginRight={moderateScale(20)}
                        marginBottom={moderateScale(20)}
                    />

                </Content>

                <TouchableOpacity style={ styles.touchContainer } onPress={() => this.props.navigation.goBack()} >
                    <Icon name="md-close" color={ whitelabel.primaryColor || colors.skyBlue } />
                </TouchableOpacity>

                <Image
                    source={ whitelabel.watermarkColor ?
                        { uri: whitelabel.watermarkColor }
                        :
                        require('../assets/watermark.png')
                    }
                    style={ styles.waterMark }
                />

                {
                    this.props.loading &&
                    <Loader />
                }
                
            </Container>
        );
    }
}

/**
 * @param {*} state
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    loading: state.user.loading
});

export default connect(mapStateToProps)(Terms);