import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { moderateScale } from '../services/Scaler';
import Header from '../components/Header';
import TitleBlock from '../components/TitleBlock';
import Loader from '../components/Loader';
import Container from '../components/Container';
import Content from '../components/Content';
import Text from '../components/Text';
import DrawerService from "../services/DrawerService";
import * as Dates from '../services/Dates';
import * as session from "../services/Session";

const styles = StyleSheet.create({
    claims: {
        paddingTop: moderateScale(20)
    },
    usage: {
        paddingTop: moderateScale(20)
    },
    marketPlace: {
        paddingTop: moderateScale(20)
    }
});

class Home extends PureComponent {
    state = {
        recentlyUsed: null
    };

    componentDidMount() {
        // this._checkForResetPassword();
    }

    async _checkForResetPassword() {
        const resetEmail = await session.passwordWasReset();

        if (resetEmail === this.props.user.email) {
            this.props.navigation.navigate('ChangePassword');
            await session.removePasswordWasReset();
        }
    }

    render() {
        const { whitelabel } = this.props;

        // if (!this.state.recentlyUsed) {
        //     return null;
        // }

        return (
            <Container>
                <Header
                    test="homescreen"
                    title="Home"
                    navigation={this.props.navigation}
                    openDrawer={DrawerService.open}
                />

                <Content>

                    <View style={styles.claims}>
                        <TitleBlock whitelabel={ whitelabel } title="Latest Claims" view="Claims" showSeeAll />
                        <Text
                            text="You have not made any claims."
                            light
                            medium
                            marginLeft={20}
                            marginRight={20}
                        />
                    </View>

                    <View style={styles.usage}>
                        <TitleBlock
                            whitelabel={ whitelabel }
                            title="Recent Usage"
                            view="Usage"
                            showSeeAll
                        />

                        {
                            <Text
                                text="You have no recent usage."
                                medium
                                light
                                marginLeft={20}
                                marginRight={20}
                            />
                        }
                    </View>
                </Content>

                {
                    this.props.loading &&
                        <Loader />
                }
            </Container>
        );
    }
}

Home.propTypes = {
    whitelabel: PropTypes.object,
    loading: PropTypes.bool,
    user: PropTypes.object
};

/**
 * @param state
 * @returns {{loading: *}}
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    loading: state.user.loading,
    user: state.user.meta
});

export default connect(mapStateToProps)(Home);