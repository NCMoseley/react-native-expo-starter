import colors from './colors';
import { moderateScale } from '../services/Scaler';

const globalStyles = {
    inputText: {
        fontFamily: 'AvenirLight',
        fontSize: moderateScale(18),
        color: colors.darkGrey
    },
    inputContainerStyle: {
        borderRadius: moderateScale(5),
        paddingTop: moderateScale(8),
        paddingLeft: moderateScale(12),
        paddingRight: moderateScale(12),
        paddingBottom: moderateScale(8)
    },
    containerError: {
        borderColor: colors.red
    },
    blockRow: {
        alignItems: 'center',
        backgroundColor: colors.backgroundGrey,
        flexDirection: 'row',
        height: moderateScale(60),
        marginBottom: moderateScale(5),
        marginLeft: moderateScale(20),
        marginRight: moderateScale(20)
    },
    claimRow: {
        alignItems: 'center',
        backgroundColor: colors.backgroundGrey,
        flexDirection: 'row',
        height: moderateScale(60)
    },
    blockColumn: {
        alignItems: 'center',
        backgroundColor: colors.backgroundGrey,
        flexDirection: 'column',
        marginBottom: moderateScale(5),
        marginLeft: moderateScale(20),
        marginRight: moderateScale(20)
    },
    label: {
        margin: 2,
        color: colors.mediumGrey,
        fontSize: 16
    }
};

export default globalStyles;