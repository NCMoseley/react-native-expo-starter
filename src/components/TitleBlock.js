import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NavigationService from '../services/NavigationService';
import { moderateScale } from '../services/Scaler';
import Text from './Text';
import colors from '../theme/colors';

/**
 * @param title
 * @param view
 * @param marginTop
 * @param marginBottom
 * @param marginLeft
 * @param marginRight
 * @param paddingLeft
 * @param paddingRight
 * @param paddingTop
 * @param paddingBottom
 * @param align
 * @param showSeeAll
 * @param subText
 * @returns {*}
 * @constructor
 */
const TitleBlock = ({ title, view, marginTop, marginBottom, marginLeft, marginRight, paddingLeft, paddingRight, paddingTop, paddingBottom, align, showSeeAll, subText, whitelabel = {} }) => (
    <View style={{
        minHeight: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: moderateScale(paddingTop) || null,
        paddingBottom: moderateScale(paddingBottom) || null,
        paddingLeft: paddingLeft !== undefined ? moderateScale(paddingLeft) : moderateScale(20),
        paddingRight: paddingRight !== undefined ? moderateScale(paddingRight) : moderateScale(20),
        marginTop: marginTop !== undefined ? moderateScale(marginTop) : null,
        marginBottom: marginBottom !== undefined ? moderateScale(marginBottom) : null,
        marginLeft: marginLeft !== undefined ? moderateScale(marginLeft) : null,
        marginRight: marginRight !== undefined ? moderateScale(marginRight) : null
    }} >
        <Text
            text={ title }
            bold
            medium
            customStyle={{ flex: 1 }}
            align={align}
        />

        {
            showSeeAll &&
                <TouchableOpacity
                    onPress={() => {
                        if (!view) {
                            return;
                        }

                        NavigationService.navigate(view);
                    }}
                >
                    <Text
                        text="See all"
                        small
                        color={ whitelabel.primaryColor || colors.skyBlue }
                    />
                </TouchableOpacity>
        }

        {
            subText &&
            <Text
                text={ subText }
                tiny
                customStyle={{ alignSelf: 'flex-end' }}
            />
        }
    </View>
);

export default TitleBlock;