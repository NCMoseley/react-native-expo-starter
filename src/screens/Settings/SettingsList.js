import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import { List, ListItem, Left, Right } from 'native-base';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Content from '../../components/Content';
import { logout } from '../../actions/user';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import DrawerService from "../../services/DrawerService";
import colors from '../../theme/colors';

class SettingsList extends PureComponent {
    render() {
        const { navigation, whitelabel } = this.props;

        return (
            <Container>
                <Header
                    title="Settings"
                    navigation={this.props.navigation}
                    openDrawer={DrawerService.open}
                />
                {/* <Content> */}
                <List button={true}>
                    <ListItem onPress={() => navigation.navigate('SettingsScreen')}>
                        <Left>
                            <Text test="settings" text="Settings" large light />
                        </Left>
                        <Right>
                            <Icon name="ios-arrow-forward" color={ whitelabel.primaryColor || colors.skyBlue } />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('ChangePassword')}>
                        <Left>
                            <Text test="changepassword" text="Change Password" large light />
                        </Left>
                        <Right>
                            <Icon name="ios-arrow-forward" color={ whitelabel.primaryColor || colors.skyBlue } />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('PaymentDetails')}>
                        <Left>
                            <Text test="payments" text="Payments" large light />
                        </Left>
                        <Right>
                            <Icon name="ios-arrow-forward" color={ whitelabel.primaryColor || colors.skyBlue } />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('Terms')}>
                        <Left>
                            <Text test="termsofuse" text="Terms of Use" large light />
                        </Left>
                        <Right>
                            <Icon name="ios-arrow-forward" color={ whitelabel.primaryColor || colors.skyBlue } />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('Privacy')}>
                        <Left>
                            <Text test="privacypolicy" text="Privacy Policy" large light />
                        </Left>
                        <Right>
                            <Icon name="ios-arrow-forward" color={ whitelabel.primaryColor || colors.skyBlue } />
                        </Right>
                    </ListItem>
                    <ListItem onPress={logout}>
                        <Left>
                            <Text test="logout" text="Logout" color="red" large light />
                        </Left>
                    </ListItem>
                </List>
                {/* </Content> */}

            </Container>
        );
    }
}

/**
 * @param state
 * @returns {{meta: *}}
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    meta: state.user.meta
});

export default connect(mapStateToProps)(SettingsList);