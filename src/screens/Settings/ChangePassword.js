import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/Inputs/TextInput';
import Form from '../../components/Form';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Loader from '../../components/Loader';
import * as events from "../../services/events";
import * as notifier from '../../services/Notifier';
import { changePassword } from '../../actions/user';
import colors from '../../theme/colors';
import validateInput from '../../services/FormValidation/validateInput';
import DrawerService from "../../services/DrawerService";

class ChangePassword extends Component {
    state = {
        existingPassword: '',
        password: '',
        confirmPassword: '',
        visibility: true
    };

    componentDidMount() {
        events.record('view_change_password');
    }

    _onBlur = async (type) => {
        this.setState({
            [`${ type }Error`]: await validateInput(type, this.state[type])
        });
    };

    _handleInputChange = (name, value) => {
        this.setState({ ...this.state, [name]: value });
    };

    _visibility = () => {
        this.setState({
            visibility: !this.state.visibility
        });
    };

    _validateForm = async () => {
        const existingPasswordError = await validateInput('password', this.state.existingPassword);
        const passwordError = await validateInput('password', this.state.password);
        const confirmPasswordError = await validateInput('password', this.state.confirmPassword);

        this.setState({
            existingPasswordError,
            passwordError,
            confirmPasswordError
        });

        if (existingPasswordError ||
            passwordError ||
            confirmPasswordError
        ) {
            return false;
        }

        return true;
    };

    _submit = async () => {
        const { existingPassword, password, confirmPassword } = this.state;
        const { whitelabel } = this.props;

        const isFormValid = await this._validateForm();

        if (!isFormValid) {
            return false;
        }

        // if the form is empty return
        if (password === '' && confirmPassword === '') {
            return true;
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.props.dispatch(notifier.displayError('New and confirm password fields do not match.'));
            return null;
        }

        const success = await this.props.dispatch(changePassword(password, existingPassword));

        if (success) {
            this.props.navigation.goBack();
        }

        return null;
    };

    render() {
        const { whitelabel } = this.props;

        return (
            <Container>
                <Header
                    title="Change Password"
                    test="changepasswordpage"
                    navigation={this.props.navigation}
                    openDrawer={DrawerService.open}
                />

                <Content>
                    <Form paddingTop={20} paddingBottom={20}>
                        <TextInput
                            secure={this.state.visibility}
                            icon={{
                                active: true,
                                color: colors.lightGrey,
                                name: this.state.visibility ? 'md-eye' : 'md-eye-off',
                                onPress: this._visibility
                            }}
                            label="Existing Password"
                            value={this.state.existingPassword}
                            onBlur={() => this._onBlur('existingPassword')}
                            onChangeText={(value) => this._handleInputChange('existingPassword', value)}
                            error={this.state.existingPasswordError}
                            whitelabel={ whitelabel }
                        />

                        <TextInput
                            secure={this.state.visibility}
                            icon={{
                                active: true,
                                color: colors.lightGrey,
                                name: this.state.visibility ? 'md-eye' : 'md-eye-off',
                                onPress: this._visibility
                            }}
                            label="New Password"
                            value={this.state.password}
                            onBlur={() => this._onBlur('password')}
                            onChangeText={(value) => this._handleInputChange('password', value)}
                            error={this.state.passwordError}
                            whitelabel={ whitelabel }
                        />

                        <TextInput
                            secure={this.state.visibility}
                            icon={{
                                active: true,
                                color: colors.lightGrey,
                                name: this.state.visibility ? 'md-eye' : 'md-eye-off',
                                onPress: this._visibility
                            }}
                            label="Confirm New Password"
                            value={this.state.confirmPassword}
                            onBlur={() => this._onBlur('confirmPassword')}
                            onChangeText={(value) => this._handleInputChange('confirmPassword', value)}
                            error={this.state.confirmPasswordError}
                            whitelabel={ whitelabel }
                        />
                    </Form>
                </Content>

                <Button
                    name="SUBMIT"
                    height={60}
                    marginTop={10}
                    fullWidth
                    backgroundColor={ whitelabel.primaryColor || colors.brandGreen }
                    onPress={this._submit}
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
 * @param state
 * @returns {{loading: *}}
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    loading: state.user.loading
});

export default connect(mapStateToProps)(ChangePassword);