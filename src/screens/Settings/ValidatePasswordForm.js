import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, Body } from 'native-base';

import validateInput from '../../services/FormValidation/validateInput';
import TextInput from '../../components/Inputs/TextInput';
import Text from '../../components/Text';
import Form from '../../components/Form';
import Content from '../../components/Content';
import Button from '../../components/Button';
import colors from "../../theme/colors";
import DateInput from "../../components/Inputs/DateInput";
import Loader from "../../components/Loader";

const styles = StyleSheet.create({
    checkboxContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: 'transparent'
    },
    touchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});

class ValidatePasswordForm extends PureComponent {
    state = {
        password: '',
        visibility: false,
        signage: {
            name: '',
            signature: '',
            acceptedTerms: false,
            timestampOfAcceptance: null,
            datedOn: null
        }
    };

    _onBlur = async (type) => {
        this.setState({
            [`${ type }Error`]: await validateInput(type, this.state[type])
        });
    };

    _handleInputChange = async (type, value) => {
        await this.setState({
            [type]: value.trim()
        });
    };

    _handleSignageChange = (type, value) => {
        if (type === 'acceptedTerms' && value === true) {
            this.setState({
                signage: {
                    ...this.state.signage,
                    acceptedTerms: true,
                    timestampOfAcceptance: 'dates.getUTC()'
                }
            });

            return null;
        }

        this.setState({
            signage: {
                ...this.state.signage,
                [type]: value
            }
        });

        return null;
    };

    _toggleVisibility = () => {
        this.setState({
            visibility: !this.state.visibility
        });
    };

    _validateSignageBlock = async () => {
        const { signage, password } = this.state;

        const passwordError = await validateInput('checkEmpty', password);
        let signageNameError = await validateInput('checkEmpty', signage.name);
        const signageSignatureError = await validateInput('checkEmpty', signage.signature);
        const signageDatedOnError = await validateInput('date', signage.datedOn);
        const signageAcceptedError = !signage.acceptedTerms;

        if (signageAcceptedError) {
            // TODO: need a better alert here.
            alert('Please accept and acknowledge the changes using the checkbox below.');
            return null;
        }

        if (signage.name !== signage.signature) {
            signageNameError = 'The name and signature must match.';
        }

        this.setState({
            signageNameError,
            signageSignatureError,
            signageDatedOnError,
            passwordError
        });

        if (
            signageNameError ||
            signageSignatureError ||
            signageDatedOnError ||
            passwordError
        ) {
            return false;
        }

        return true;
    };

    _confirm = async () => {
        const isSignageValid = await this._validateSignageBlock();
        if (!isSignageValid) {
            return null;
        }

        // check if the password was provided
        const passwordError = await validateInput('password', this.state.password);
        this.setState({ passwordError });
        if (passwordError) {
            return false;
        }

        this.props.confirm(this.state.password, this.state.signage);

        return true;
    };

    render() {
        const { whitelabel } = this.props;

        return (
            <React.Fragment>
                <Content>
                    <Form paddingTop={20} paddingBottom={20}>
                        {
                            this.props.close &&
                                <TouchableOpacity style={ styles.touchContainer } onPress={this.props.close} >
                                    <Text
                                        text="Go Back to Edit Details"
                                        bold
                                        tiny
                                        marginBottom={20}
                                    />
                                </TouchableOpacity>
                        }

                        <Text
                            text="Please enter your account password and signature below to confirm your changes."
                            light
                            mediumLarge
                            marginBottom={20}
                        />

                        <TextInput
                            secure={!this.state.visibility}
                            icon={{
                                active: true,
                                color: colors.lightGrey,
                                name: this.state.visibility ? 'md-eye' : 'md-eye-off',
                                onPress: this._toggleVisibility
                            }}
                            label="Password"
                            value={this.state.password}
                            onBlur={() => this._onBlur('password')}
                            onChangeText={(value) => this._handleInputChange('password', value)}
                            error={this.state.passwordError}
                            flex={1}
                            whitelabel={ whitelabel }
                        />

                        <TextInput
                            label="Your Name"
                            value={this.state.signage.name}
                            onChangeText={(value) => this._handleSignageChange('name', value)}
                            error={this.state.signageNameError}
                            flex={1}
                            whitelabel={ whitelabel }
                        />

                        <TextInput
                            label="Signature"
                            value={this.state.signage.signature}
                            onChangeText={(value) => this._handleSignageChange('signature', value)}
                            error={this.state.signageSignatureError}
                            flex={1}
                            fontFamily={ this.state.signage.signature.length === 0 ? "AvenirLight" : "Antara" }
                            whitelabel={ whitelabel }
                        />

                        <DateInput
                            label="Dated On"
                            value={ this.state.signage.datedOn }
                            onChangeText={(value) => this._handleSignageChange('datedOn', value)}
                            error={this.state.signageDatedOnError}
                            whitelabel={ whitelabel }
                        />

                        <TouchableOpacity
                            onPress={() => this._handleSignageChange('acceptedTerms', !this.state.signage.acceptedTerms)}
                            style={ styles.checkboxContainer }
                        >
                            <CheckBox
                                checked={ this.state.signage.acceptedTerms }
                                color={ whitelabel.primaryColor || colors.skyBlue }
                            />

                            <Body>
                                <Text
                                    text="I hereby acknowledge that the information provided is valid and accurate to the best of my knowledge."
                                    medium
                                    light
                                    customStyle={{
                                        paddingLeft: 20,
                                        paddingRight: 10
                                    }}
                                />
                            </Body>
                        </TouchableOpacity>
                    </Form>
                </Content>

                <Button
                    name="CONFIRM"
                    height={60}
                    fullWidth
                    large
                    backgroundColor={ whitelabel.primaryColor || colors.brandGreen }
                    onPress={this._confirm}
                />

                {
                    this.props.loading &&
                        <Loader />
                }
            </React.Fragment>
        );
    }
}

/**
 * @param state
 * @returns {{loading: *}}
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    loading: state.user.loading
});

export default connect(mapStateToProps)(ValidatePasswordForm);