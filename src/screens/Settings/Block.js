import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

import globalStyles from '../../theme/globalStyles';
import Text from '../../components/Text';
import colors from "../../theme/colors";
import Icon from "../../components/Icon";

/**
 * 
 * @param {*} whitelabel 
 */
const stylesFunc = (whitelabel) => StyleSheet.create({
    typeBlock: {
        alignItems: 'center',
        backgroundColor: whitelabel.lightColor || colors.lightBlue,
        flex: 0.8,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
    }
});

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    blockRow: globalStyles.blockRow
});

class Block extends PureComponent {
    _menu = null;

    _setMenuRef = (ref) => {
        this._menu = ref;
    };

    _hideMenu = () => {
        this._menu.hide();
    };

    _showMenu = () => {
        this._menu.show();
    };

    _edit = () => {
        this._hideMenu();
        this.props.onEdit();
    };

    _remove = () => {
        this._hideMenu();
        this.props.remove();
    };

    render() {
        const { whitelabel } = this.props;

        return (
            <View style={styles.blockRow}>
                <View style={stylesFunc(whitelabel).typeBlock}>
                    <Text
                        text={ this.props.name }
                        medium
                        align="center"
                        customStyle={{ paddingLeft: 5, paddingRight: 5 }}
                    />

                    <Text
                        text={ this.props.relationship }
                        color={ whitelabel.primaryColor || colors.darkBlue }
                        tiny
                    />
                </View>

                <View style={styles.block}>
                    {
                        this.props.shares &&
                            <Text
                                text={ `${ this.props.shares }%` }
                                color="darkGrey"
                                small
                                light
                            />
                    }

                    <Menu
                        ref={this._setMenuRef}
                        button={
                            <Icon
                                name="md-more"
                                size={20}
                                color={ whitelabel.primaryColor ? colors.darkGrey : colors.darkBlue }
                                onPress={this._showMenu}
                                touchCustomStyle={{ width: 40, alignItems: 'center', height: 40, justifyContent: 'center' }}
                            />
                        }
                    >
                        <MenuItem onPress={this._edit}>Details</MenuItem>
                        { this.props.remove &&
                            <MenuItem onPress={this._remove}>Remove</MenuItem>
                        }
                    </Menu>
                </View>
            </View>
        );
    }
}

/**
 * @param state
 * @returns {{loading: *}}
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    loading: state.user.loading
});

export default connect(mapStateToProps)(Block);