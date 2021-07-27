import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Modal, Text } from 'react-native';
import colors from '../theme/colors';
import { moderateScale } from '../services/Scaler';
import Icon from './Icon';
import Button from './Button';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.mediumLightGrey,
        marginBottom: moderateScale(20),
        height: 'auto',
        borderRadius: moderateScale(5),
        paddingTop: moderateScale(18),
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15),
        paddingBottom: moderateScale(18)
    },
    selectedText: {
        fontFamily: 'AvenirLight',
        fontSize: moderateScale(18),
        color: colors.darkGrey
    },
    bodyText: {
        fontFamily: 'AvenirLight',
        fontSize: moderateScale(16)
    },
    body: {
        width: moderateScale(250),
        minHeight: moderateScale(300),
        padding: moderateScale(10)
    },
    modal: {
        flex: 1,
        height: 100,
        alignItems: 'center'
    },
    closeIcon: {
        position: 'absolute',
        right: moderateScale(20),
        top: Platform.OS === 'android' ? moderateScale(StatusBar.currentHeight + 20) : moderateScale(20)
    }
});

/**
 * @param open
 * @param close
 * @param buttonText
 * @param buttonAction
 * @param children
 * @param customStyle
 * @returns {*}
 * @constructor
 */
const NotificationModal = ({ open, close, buttonText, buttonAction, children, customStyle, whitelabel = {} }) => {
    const style = [];

    if (customStyle) {
        style.push(customStyle);
    }

    return (
        <View style={styles.modal}>
            <Modal
                // animationType="slide"
                animationType={false}
                transparent={true}
                visible={open}
                onRequestClose={close}
            >
                <Icon
                    name="md-close"
                    onPress={close}
                    touchCustomStyle={ styles.closeIcon }
                />
                <View style={{ marginTop: 22 }}>
                    <Text>{children}</Text>
                </View>
                {
                    buttonText &&
                    <Button
                        name="CONFIRM"
                        height={60}
                        fullWidth
                        large
                        backgroundColor={ whitelabel.primaryColor || colors.brandGreen }
                        onPress={buttonAction}
                    />
                }
            </Modal>
        </View>
    );
};

export default NotificationModal;