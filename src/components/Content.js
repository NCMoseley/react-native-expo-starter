import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * @param customStyle
 * @param children
 * @returns {*}
 * @constructor
 */
const Content = ({ customStyle, children }) => (
    <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={ Platform.OS === 'android' ? 80 : 0 }
        enableAutomaticScroll={(Platform.OS === 'ios')}
        keyboardShouldPersistTaps="handled"
        style={{ ...customStyle }}
    >
        {
            children
        }
    </KeyboardAwareScrollView>
);

export default Content;