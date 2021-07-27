import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
    Platform
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { scale, verticalScale } from '../services/Scaler';
import { loadUserData, login, forgotPassword, savePushToken, loadDependentData, getWhitelabel } from '../actions/user';
import validateInput from '../services/FormValidation/validateInput';
import Container from '../components/Container';
import Form from '../components/Form';
import TextInput from '../components/Inputs/TextInput';
import Loader from '../components/Loader';
import Button from '../components/Button';
import Text from '../components/Text';
import colors from '../theme/colors';
import store from "../redux/store";
import NavigationService from "../services/NavigationService";
import * as notifier from "../services/Notifier";
import * as session from "../services/Session";

const styles = StyleSheet.create({
    logo: {
        width: scale(225),
        height: verticalScale(138),
        resizeMode: 'contain'
    },
    imageBlock: {
        marginTop: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class Login extends PureComponent {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        visibilityOn: false
    };

    componentDidMount() {
        // Check to see if there is an email saved
        SecureStore.getItemAsync('username').then((data) => {
            if (data) {
                this.setState({
                    email: data
                });
            }
        });
    }

    _toggleVisibility = () => {
        this.setState({
            visibilityOn: !this.state.visibilityOn
        });
    };

    _handleInputChange = (type, value) => {
        this.setState({
            [type]: value.trim()
        });
    };

    _login = async () => {
        const loggedIn = await this.props.dispatch(login(this.state.email, this.state.password));

        if (!loggedIn) {
            return;
        }

        const isDependent = await session.isDependent();
        const loaded = isDependent ? await this.props.dispatch(loadDependentData()) : await this.props.dispatch(loadUserData());

        if (!loaded) {
            return;
        }

        // make sure we get the latest whitelabel data for the member if they have any

        this.props.navigation.navigate('Home');

        // Ensure a pushToken is setup for the newly logged in User
        const pushToken = await this._registerForPushNotificationsAsync();

        if (!pushToken) {
            // the member did not allow push notifications
            return;
        }

        // save the push token to the DB
        store.dispatch(savePushToken(pushToken.data));

        // listen for incoming notifications
        Notifications.addNotificationReceivedListener(this._handleNotification);
    };

    _registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        let finalStatus = existingStatus;

        /*
         * only ask if permissions have not already been determined, because
         * iOS won't necessarily prompt the user a second time.
         */
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return null;
        }

        // Get the token that uniquely identifies this device
        return Notifications.getExpoPushTokenAsync();
    };

    _handleNotification = (notification) => {
        notifier.showNotification(notification.request.content.body);
    };

    _forgotPassword = async () => {
        const emailError = await validateInput('email', this.state.email);
        this.setState({ emailError });

        if (!emailError) {
            Keyboard.dismiss();
            await session.setPasswordWasReset(this.state.email);
            this.props.dispatch(forgotPassword({ email: this.state.email }));
        }

        return null;
    };

    render() {
        const { visibilityOn } = this.state;
        const { whitelabel } = this.props;

        return (
            <Container>
                {/* <KeyboardAwareScrollView
                    enableOnAndroid={ true }
                    contentContainerStyle={{ flex: 1, marginTop: 30 }}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                > */}
                <View style={styles.imageBlock}>
                    <Image
                        style={styles.logo}
                        source={ require('../assets/combo-wordmark-color-large.png') }
                    />
                </View>

                <Form>
                    <TextInput
                        test="emailinput"
                        fontFamily="Avenir"
                        regular
                        label="Email"
                        value={ this.state.email }
                        error={ this.state.emailError }
                        marginBottom={5}
                        onChangeText={(value) => this._handleInputChange('email', value)}
                        fontSize={16}
                        email={true}
                        whitelabel={ whitelabel }
                    />

                    <TextInput
                        test="passwordinput"
                        fontFamily="Avenir"
                        regular
                        label="Password"
                        value={ this.state.password }
                        error={ this.state.passwordError }
                        marginBottom={5}
                        onChangeText={(value) => this._handleInputChange('password', value)}
                        fontSize={16}
                        whitelabel={ whitelabel }
                        secure={ !visibilityOn }
                        icon={{
                            type: "MaterialIcons",
                            active: true,
                            color: "darkGrey",
                            name: visibilityOn ? "visibility" : "visibility-off",
                            onPress: this._toggleVisibility
                        }}
                    />

                    <Button
                        name="Login"
                        height={55}
                        marginTop={10}
                        backgroundColor={ colors.skyBlue }
                        onPress={this._login}
                        paddingTop={0}
                        test="loginbutton"
                    />

                    <TouchableOpacity onPress={this._forgotPassword}>
                        <Text
                            text="I forgot my password"
                            light
                            tiny
                            align="center"
                            marginTop={12}
                        />
                    </TouchableOpacity>
                </Form>
                {/* </KeyboardAwareScrollView> */}

                {this.props.loading && <Loader />}
            </Container>
        );
    }
}

/**
 * @param state
 * @returns {{loading: *}}
 */
const mapStateToProps = (state) => ({
    user: state.user,
    whitelabel: state.user.whitelabel,
    loading: state.user.loading
});

export default connect(mapStateToProps)(Login);