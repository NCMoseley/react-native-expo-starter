import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';
import globalStyles from '../../theme/globalStyles';
import colors from '../../theme/colors';
import InputContainer from './InputContainer';
import { TextInputMask } from "react-native-masked-text";

const styles = StyleSheet.create({
    inputText: globalStyles.inputText
});

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const DateInput = (props) => (
    <InputContainer { ...props }>
        <TextInputMask
            style={[
                {
                    ...styles.inputText,
                    color: props.color || colors.darkGrey
                }
            ]}
            customTextInput={Input}
            disabled={props.disabled}
            onChangeText={ props.onChangeText }
            selectionColor={ props.whitelabel?.primaryColor || colors.skyBlue }
            error={ props.error }
            value={ props.value }
            type="datetime"
            placeholder={ `${ props.label } (MM/DD/YYYY)` }
            options={{
                format: 'MM/DD/YYYY'
            }}
        />
    </InputContainer>
);

export default DateInput;