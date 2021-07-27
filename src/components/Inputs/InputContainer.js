import React from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from '../../services/Scaler';
import Text from '../Text';
import globalStyles from '../../theme/globalStyles';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
    containerError: globalStyles.containerError,
    containerStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 'auto',
        borderRadius: moderateScale(5),
        paddingTop: moderateScale(8),
        paddingLeft: moderateScale(12),
        paddingRight: moderateScale(12),
        paddingBottom: moderateScale(8)
    }
});

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const InputContainer = (props) => {
    let hasValue = props.value !== null && props.value !== undefined && props.value !== '';

    if (props.options) {
        hasValue = true;
    }

    return (
        <React.Fragment>
            {
                !props.regular && hasValue &&
                    <Text
                        text={ props.label || '' }
                        medium
                        marginLeft={3}
                        marginBottom={5}
                    />
            }

            <View style={{ marginBottom: moderateScale(props.marginBottom || 10), flex: props.flex || null }}>
                <View
                    style={[
                        {
                            ...styles.containerStyle,
                            borderColor: props.borderColor ? colors[props.borderColor] : colors.mediumLightGrey,
                            backgroundColor: props.backgroundColor ? colors[props.backgroundColor] : colors.white,
                            alignItems: 'center'
                        },
                        props.error ? styles.containerError : null
                    ]}
                >
                    { props.children }
                </View>

                {
                    props.helperText && !props.error ?
                        <Text
                            text={ props.helperText }
                            tiny
                            light
                            marginLeft={3}
                            marginTop={3}
                        />
                        :
                        null
                }

                {
                    props.error ?
                        <Text
                            text={props.error}
                            tiny
                            color="red"
                            marginLeft={3}
                        />
                        : null
                }
            </View>
        </React.Fragment>
    );
};

export default InputContainer;