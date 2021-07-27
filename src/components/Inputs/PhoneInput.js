import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import globalStyles from '../../theme/globalStyles';
import colors from "../../theme/colors";
import InputContainer from './InputContainer';

const styles = StyleSheet.create({
    inputText: globalStyles.inputText
});

/**
 * @param phone
 * @param callback
 */
function handlePhoneChange(phone, callback) {
    let phoneNumber = phone;
    if (phone.charAt(0) === '(') {
        phoneNumber = phone.charAt(1) + phone.charAt(2) + phone.charAt(3) +
            phone.charAt(6) + phone.charAt(7) + phone.charAt(8) + phone.charAt(10) +
            phone.charAt(11) + phone.charAt(12) + phone.charAt(13);
    }

    callback(phoneNumber);
}

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const PhoneInput = (props) => (
    <InputContainer { ...props }>
        <TextInputMask
            type={'cel-phone'}
            options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(999) 999-9999'
            }}
            style={[
                {
                    ...styles.inputText,
                    color: props.color || colors.darkGrey
                }
            ]}
            customTextInput={Input}
            onBlur={props.onBlur}
            value={props.value.toString()}
            selectionColor={ props.whitelabel?.primaryColor || colors.skyBlue }
            onChangeText={(value) => handlePhoneChange(value, props.onChangeText)}
            placeholder={props.label}
        />
    </InputContainer>
);

export default PhoneInput;