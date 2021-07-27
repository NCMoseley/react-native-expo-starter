import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import globalStyles from '../../theme/globalStyles';
import colors from "../../theme/colors";
import Icon from '../Icon';
import InputContainer from './InputContainer';

const styles = StyleSheet.create({
    inputText: globalStyles.inputText
});

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const NumberInput = (props) => (
    <InputContainer { ...props }>
        <TextInputMask
            style={[
                {
                    ...styles.inputText,
                    color: props.color || colors.darkGrey
                }
            ]}
            customTextInput={Input}
            selectionColor={ props.whitelabel?.primaryColor || colors.skyBlue }
            onBlur={props.onBlur}
            onChangeText={props.onChangeText}
            value={props.value}
            type={'only-numbers'}
            placeholder={props.label}
            keyboardType="number-pad"
        />

        {
            props.icon &&
            <Icon
                active={ props.icon.active }
                color={ props.icon.color }
                name={ props.icon.name }
                onPress={ props.icon.onPress }
            />
        }
    </InputContainer>
);

export default NumberInput;