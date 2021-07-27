import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Item } from "native-base";
import { moderateScale } from "../services/Scaler";
import Icon from "./Icon";
import colors from '../theme/colors';

/**
 * 
 * @param {*} whitelabel 
 */
const stylesFunc = (whitelabel) => StyleSheet.create({
    searchBar: {
        marginLeft: moderateScale(20),
        marginRight: moderateScale(20),
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        backgroundColor: colors.white,
        borderColor: whitelabel.primaryColor || colors.skyBlue
    }
});

class SearchBar extends PureComponent {
    state = {
        query: ''
    };

    _handleInputChange = (value) => {
        this.setState({
            query: value
        });
    };

    render() {
        const { whitelabel, onSearch, icon, placeholder } = this.props;

        return (
            <Item rounded style={stylesFunc(whitelabel).searchBar} >
                <Input
                    placeholder={ placeholder }
                    onChangeText={(value) => this._handleInputChange(value)}
                    value={ this.state.query }
                    selectionColor={ whitelabel.primaryColor || colors.skyBlue }
                />

                <TouchableOpacity onPress={ () => onSearch(this.state.query) }>
                    <Icon active name={ icon || "md-search" } color={ whitelabel.primaryColor || colors.skyBlue } />
                </TouchableOpacity>
            </Item>
        );
    }
}

export default SearchBar;