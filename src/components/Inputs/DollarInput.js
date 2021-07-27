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
 * @param props
 * @returns {*}
 * @constructor
 */
const DollarInput = (props) => (
    <InputContainer { ...props }>
        <TextInputMask
            style={[
                {
                    ...styles.inputText,
                    color: props.color || colors.darkGrey
                }
            ]}
            customTextInput={Input}
            onBlur={props.onBlur}
            onChangeText={props.onChangeText}
            selectionColor={ props.whitelabel?.primaryColor || colors.skyBlue }
            value={props.value}
            type={'money'}
            options={{
                separator: '.',
                delimiter: ',',
                unit: '$ '
            }}
            keyboardType="decimal-pad"
        />
    </InputContainer>
);

export default DollarInput;