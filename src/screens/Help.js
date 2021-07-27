/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform, StatusBar, Image, TouchableOpacity, Linking } from 'react-native';
import { moderateScale, verticalScale } from '../services/Scaler';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Container from '../components/Container';
import * as events from "../services/events";
import * as constants from "../services/constants";
import Content from '../components/Content';
import Form from '../components/Form';
import Button from '../components/Button';
import TextInput from '../components/Inputs/TextInput';
import Loader from '../components/Loader';
import colors from '../theme/colors';
import { supportEmail } from '../actions/user';
import validateInput from '../services/FormValidation/validateInput';

const styles = StyleSheet.create({
    waterMark: {
        opacity: 0.05,
        position: 'absolute',
        resizeMode: 'contain',
        bottom: 50,
        right: 0,
        height: moderateScale(200),
        width: moderateScale(200),
        zIndex: -9999
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

class Help extends Component {
    state = {
        subject: '',
        description: ''
    };

    // eslint-disable-next-line camelcase
    componentDidMount() {
        events.record('view_help');
    }

    _handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    _validateForm = async () => {
        const subjectError = await validateInput('subject', this.state.subject);
        const descriptionError = await validateInput('description', this.state.description);

        this.setState({
            subjectError,
            descriptionError
        });

        if (
            subjectError ||
            descriptionError
        ) {
            return false;
        }

        return true;
    };

    _send = async () => {
        const {
            subject,
            description
        } = this.state;

        const { meta } = this.props;

        const isFormValid = await this._validateForm();

        if (!isFormValid) {
            return false;
        }

        const body = {
            firstname: meta.firstname,
            lastname: meta.lastname,
            email: meta.email,
            phone: meta.phone,
            subject: subject.trim(),
            description: description.trim()
        };

        const success = await this.props.dispatch(supportEmail(body));

        if (success) {
            this.props.navigation.goBack();
        }

        return null;
    };

    _callUs = () => {
        Linking.openURL(`tel:${ constants.phoneNumberSupport }`);
    }

    render() {
        const {
            subject,
            description
        } = this.state;

        const { whitelabel } = this.props;

        return (
            <Container>
                <Content customStyle={{ marginTop: moderateScale(100) }}>
                    <Text
                        text="Place a call to our support line."
                        test="helppage"
                        color={ whitelabel.primaryColor || colors.darkBlue }
                        onPress={this._callUs}
                        medium
                        light
                        marginBottom={moderateScale(10)}
                        marginTop={moderateScale(20)}
                        align="center"
                    />

                    <TouchableOpacity onPress={this._callUs} >
                        <Text
                            text={` ${ constants.phoneNumberCanadaUSA }`}
                            color={ whitelabel.primaryColor || colors.skyBlue }
                            onPress={this._callUs}
                            medium
                            bold
                            marginBottom={moderateScale(10)}
                            align="center"
                        />
                    </TouchableOpacity>

                    <Text
                        text="Alternatively, send us a message, outline the issues you are having, and we will be in contact with you shortly."
                        color={ whitelabel.primaryColor || colors.darkBlue }
                        medium
                        light
                        marginRight={moderateScale(20)}
                        marginLeft={moderateScale(20)}
                        marginBottom={moderateScale(10)}
                        marginTop={moderateScale(20)}
                        align="center"
                    />


                    <Form paddingTop={moderateScale(20)} paddingBottom={moderateScale(20)}>
                        <TextInput
                            label="Subject"
                            value={subject}
                            onChangeText={(value) => this._handleInputChange('subject', value)}
                            error={this.state.subjectError}
                            whitelabel={ whitelabel }
                        />

                        <TextInput
                            label="Description"
                            value={description}
                            multiline
                            onChangeText={(value) => this._handleInputChange('description', value)}
                            error={this.state.descriptionError}
                            whitelabel={ whitelabel }
                        />
                    </Form>
                </Content>

                <Button
                    name="Send"
                    height={moderateScale(55)}
                    marginTop={moderateScale(10)}
                    backgroundColor={ whitelabel.primaryColor || colors.skyBlue }
                    fullWidth
                    onPress={this._send}
                />

                <TouchableOpacity style={ styles.touchContainer } onPress={() => this.props.navigation.goBack()} >
                    <Icon name="md-close" color={ whitelabel.primaryColor || colors.skyBlue } />
                </TouchableOpacity>

                <Image
                    source={require('../assets/watermark.png')}
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
    loading: state.user.loading,
    meta: state.user.meta,
    whitelabel: state.user.whitelabel
});

export default connect(mapStateToProps)(Help);