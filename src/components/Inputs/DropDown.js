import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

import InputContainer from './InputContainer';
import colors from '../../theme/colors';
import { moderateScale } from '../../services/Scaler';

const styles = {
    inputIOS: {
        fontFamily: 'AvenirLight',
        fontSize: moderateScale(18),
        color: colors.darkGrey,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 350,
        paddingLeft: moderateScale(5)
    },
    inputAndroid: {
        fontFamily: 'AvenirLight',
        fontSize: moderateScale(18),
        color: colors.darkGrey,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 350,
        paddingLeft: moderateScale(5)
    },
    iconContainer: {
        position: 'relative',
        top: 12,
        right: 0
    },
    chevronContainer: {
        display: 'none'
    }
};

/**
 * @param array
 * @returns {*}
 */
const convertToObject = (array) => {
    if (typeof array[0] === 'object') {
        return array;
    }

    return array.map((item) => ({ label: item, value: item }));
};

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const DropDown = (props) => (
    <InputContainer { ...props }>
        <RNPickerSelect
            onValueChange={props.onChange}
            selectionColor={ props.whitelabel?.primaryColor || colors.skyBlue }
            placeholder={{}}
            value={props.value}
            items={convertToObject(props.options)}
            disabled={props.disabled}
            itemKey={props.itemKey}
            useNativeAndroidPickerStyle={false}
            InputAccessoryView={null}
            style={styles}
        />
    </InputContainer>
);


export default DropDown;