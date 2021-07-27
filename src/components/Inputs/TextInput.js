import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';
import globalStyles from '../../theme/globalStyles';
import Icon from '../Icon';
import colors from '../../theme/colors';
import InputContainer from './InputContainer';
import { moderateScale } from '../../services/Scaler';

const styles = StyleSheet.create({
    inputText: globalStyles.inputText
});

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const TextInput = (props) => (
    <InputContainer { ...props }>
        <Input
            style={[
                {
                    ...styles.inputText,
                    minHeight: props.multiline ? 150 : null,
                    fontFamily: props.fontFamily || 'AvenirLight',
                    fontSize: props.fontSize ? moderateScale(props.fontSize) : moderateScale(18),
                    color: props.color || colors.darkGrey
                }
            ]}
            onBlur={props.onBlur}
            disabled={props.disabled}
            secureTextEntry={props.secure}
            selectionColor={ props.whitelabel?.primaryColor || colors.skyBlue }
            onChangeText={props.onChangeText}
            placeholder={props.label}
            value={props.value}
            multiline={props.multiline}
            autoCapitalize="none"
            keyboardType={props.email ? 'email-address' : 'default'}
            testID={props.test}
        />

        {
            props.icon &&
                <Icon
                    type={ props.icon.type }
                    active={ props.icon.active }
                    color={ props.icon.color }
                    name={ props.icon.name }
                    onPress={ props.icon.onPress }
                />
        }
    </InputContainer>
);

export default TextInput;