import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { moderateScale, verticalScale, scale } from "../../services/Scaler";
import Text from '../../components/Text';

const styles = StyleSheet.create({
    container: {
        marginBottom: moderateScale(20),
        marginLeft: moderateScale(10),
        flexDirection: 'column',
        maxWidth: scale(225)
    },
    imageContainer: {
        width: scale(225),
        height: verticalScale(150)
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

/**
 * @param image
 * @param title
 * @param brand
 * @returns {*}
 * @constructor
 */
const MarketPlaceCard = ({ image, title, brand }) => (
    <View style={styles.container}>
        <Text
            text={ brand }
            large
            light
            color="mediumDarkGrey"
            marginBottom={10}
        />

        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{ uri: image }}
            />
        </View>

        <Text
            text={ title }
            mediumLarge
            bold
            color="mediumDarkBlue"
            marginTop={10}
            paddingRight={20}
        />
    </View>
);

export default MarketPlaceCard;