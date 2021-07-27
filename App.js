import React, { PureComponent } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { Root, Drawer } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading as Splash } from 'expo';
import * as Notifications from 'expo-notifications';
import { Asset } from 'expo-asset';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
// import * as Sentry from 'sentry-expo';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { setCustomText } from 'react-native-global-props';

import store from './src/redux/store.js';
import SplashWithBranding from './src/screens/SplashWithBranding';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Help from './src/screens/Help';
import Terms from './src/screens/Terms';
import Privacy from './src/screens/Privacy';
import MarketPlace from './src/screens/MarketPlace/MarketPlace';
import SideBar from './src/components/SideBar';
import Settings from './src/screens/Settings/SettingsList';
import ChangePassword from './src/screens/Settings/ChangePassword';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import NavigationService from './src/services/NavigationService';
import DrawerService from './src/services/DrawerService';
import * as session from './src/services/Session';
import { loadUserData, savePushToken } from './src/actions/user';
import * as notifier from './src/services/Notifier';

// LogBox.ignoreLogs();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFF'
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

class App extends PureComponent {
    state = {
        isAuthenticated: false,
        isLoading: true,
        showingSplash: true,
        splashType: 'standard',
        whitelabel: null
    };

    _setNavigationRef = async (navigatorRef) => {
        await NavigationService.setTopLevelNavigator(navigatorRef);
    };

    async componentDidMount() {
        // we don't have whitelabel content saved so show the regular splash
        this.setState({
            showingSplash: true,
            splashType: 'standard'
        });

        // if after 8 seconds we are still trying to load the app then logout and go to login
        setTimeout(() => {
            if (this.state.isLoading || this.state.showingSplash) {
                session.removeToken();

                this.setState({
                    isLoading: false,
                    showingSplash: false,
                    isAuthenticated: false
                });
            }
        }, 8000);

        const fontLoading = Font.loadAsync({
            AvenirBold: require('./src/assets/fonts/AvenirLTPro-Heavy.ttf'),
            AvenirLight: require('./src/assets/fonts/AvenirLTPro-Light.ttf'),
            Avenir: require('./src/assets/fonts/AvenirLTPro-Medium.ttf'),
            AvenirBook: require('./src/assets/fonts/AvenirLTPro-Book.ttf'),
            Roboto: require('./src/assets/fonts/AvenirLTPro-Light.ttf'),
            RobotoMedium: require('./src/assets/fonts/AvenirLTPro-Book.ttf'),
            Antara: require('./src/assets/fonts/AntaraDistance.ttf'),
            // Hack to fix : < is not a system font and has not been loaded through Font.loadAsync >
            // eslint-disable-next-line
            Roboto_medium: require("./src/assets/fonts/AvenirLTPro-Book.ttf"),
            Ionicons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
            ...Ionicons.font
        });

        const imageLoading = this._cacheImages([
            require('./src/assets/logo.png'),
            require('./src/assets/splash.png'),
            require('./src/assets/login-background.png'),
            require('./src/assets/icon-white.png'),
            require('./src/assets/wordmark-color.png')
        ]);

        await Promise.all([
            fontLoading,
            this._setDefaultFonts,
            ...imageLoading
        ]);

        const token = await session.getToken();

        // if we are not logged in we can stop and move along to Login
        if (!token) {
            this.setState({
                isLoading: false,
                showingSplash: this.state.whitelabel ? this.state.showingSplash : false
            });

            return;
        }

        // const loaded = await store.dispatch(loadUserData());

        // if the user has an invalid token then hide splash and go to login
        // if (!loaded) {
        //     this.setState({
        //         isLoading: false
        //     });

        //     return;
        // }

        this.setState({
            isAuthenticated: true,
            isLoading: false
        });

        // only do push notifications if its not a dependent logged in
        // register for push token
        // const pushToken = await this._registerForPushNotificationsAsync();

        // if (!pushToken) {
        //     // the member did not allow push notifications
        //     return;
        // }

        // // save the push token to the DB
        // store.dispatch(savePushToken(pushToken.data));

        // listen for incoming notifications
        // Notifications.addNotificationReceivedListener(this._handleNotification);
    }

    /**
     * @param time
     * @returns {Promise<void>}
     * @private
     */
    _showBrandedForTime = (time) => {
        setTimeout(() => {
            if (this.state.isLoading) {
                this._showBrandedForTime(2000);
                return;
            }

            this.setState({
                showingSplash: false,
                isLoading: false
            });
        }, time);
    };

    _registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        let finalStatus = existingStatus;

        /*
         * only ask if permissions have not already been determined, because
         * iOS won't necessarily prompt the user a second time.
         */
        if (existingStatus !== 'granted') {

            /*
             * Android remote notification permissions are granted during the app
             * install, so this will only ask on iOS
             */
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return null;
        }

        // Get the token that uniquely identifies this device
        return Notifications.getExpoPushTokenAsync();
    };

    _handleNotification = (notification) => {
        notifier.showNotification(notification.request.content.body);
    };

    _cacheImages = (images) => images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        }

        return Asset.fromModule(image).downloadAsync();

    });

    _setDefaultFonts = () => {
        const customTextProps = {
            style: {
                fontFamily: 'AvenirBook'
            }
        };

        setCustomText(customTextProps);
    };

    _closeDrawer = () => {
        this._drawer._root.close();
    };

    _openDrawer = () => {
        this._drawer._root.open();
    };

    render() {
        // if (this.state.isLoading || this.state.showingSplash) {
        //     if (!this.state.showingSplash) {
        //         return null;
        //     }

        //     if (this.state.splashType === 'branded') {
        //         return (
        //             <Provider store={store}>
        //                 <SplashWithBranding whitelabel={ this.state.whitelabel } />
        //             </Provider>
        //         );
        //     }

        //     return <Splash />;
        // }

        const Stack = createStackNavigator();
        DrawerService.setFunction(this._openDrawer);

        return (
            <Provider store={store}>
                <Root style={styles.container}>
                    <Drawer
                        ref={(ref) => {
                            this._drawer = ref;
                        }}
                        content={<SideBar closeDrawer={this._closeDrawer} />}
                        onClose={this._closeDrawer}
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <NavigationContainer
                            ref={ this._setNavigationRef }
                            theme={MyTheme}
                        >
                            <Stack.Navigator
                                // initialRouteName={ this.state.isAuthenticated ? 'Home' : 'Login' }
                                initialRouteName={ 'Home' }
                                headerMode="none"
                                screenOptions={{
                                    gestureEnabled: false,
                                    animationEnabled: false,
                                    headerShown: false
                                }}
                            >
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="MarketPlace" component={MarketPlace} />
                                <Stack.Screen name="Settings" component={Settings} />
                                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                                <Stack.Screen name="Help" component={Help} />
                                <Stack.Screen name="Terms" component={Terms} />
                                <Stack.Screen name="Privacy" component={Privacy} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </Drawer>
                </Root>
            </Provider>
        );
    }
}

export default App;