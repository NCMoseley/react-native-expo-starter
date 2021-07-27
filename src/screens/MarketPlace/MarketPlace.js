import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import MarketPlaceCard from './MarketPlaceCard';
import { verticalScale, moderateScale } from "../../services/Scaler";
import Container from '../../components/Container';
import Content from '../../components/Content';
import TitleBlock from '../../components/TitleBlock';
import globalStyles from "../../theme/globalStyles";
import SearchBar from "../../components/SearchBar";
import colors from '../../theme/colors';
import CategoryCard from './CategoryCard';
import * as events from "../../services/events";
import DrawerService from "../../services/DrawerService";

const styles = StyleSheet.create({
    searchBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: verticalScale(80),
        backgroundColor: colors.lightBlue
    },
    inputText: globalStyles.inputText
});

class MarketPlace extends PureComponent {
    componentDidMount() {
        events.record('view_marketplace');
    }

    render() {
        const { whitelabel } = this.props;

        return (
            <Container>
                <Header
                    title="Marketplace"
                    navigation={this.props.navigation}
                    openDrawer={DrawerService.open}
                />

                <Content>
                    <View style={styles.searchBlock}>
                        <SearchBar
                            whitelabel={ whitelabel }
                            placeholder="Search Vendors"
                            onSearch={() => {
                                alert('Question asked');
                            }}
                        />
                    </View>

                    <TitleBlock title="Featured Offers" marginTop={20} />

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginRight: moderateScale(20), marginLeft: moderateScale(10) }}
                    >
                        <MarketPlaceCard
                            image="https://www.ymcaokanagan.ca/CWP/media/YMCA-Okanagan/Images/04%20Gallery%20AND%20Banner%20with%20Right%20CTA%20(799%20x%20436)/Facility/HFA_DTY_MainArea_02_799x436.jpg?width=799&height=436&ext=.jpg"
                            title="50% OFF Drop In Rate"
                            brand="YMCA"
                        />

                        <MarketPlaceCard
                            image="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/e7f9eb0f01cb4fe0db26959313160fc0"
                            title="15% OFF Select Running Shoes"
                            brand="Sportcheck"
                        />

                        <MarketPlaceCard
                            image="https://i.pinimg.com/280x280_RS/0e/0b/c0/0e0bc02724853da1648bd2e5345746bf.jpg"
                            title="10% OFF Yoga Attire"
                            brand="Lululemon"
                        />

                        <MarketPlaceCard
                            image="https://www.downtownkelowna.com/application/files/cache/f9bc058591fc5c02202cf84ec5b01a0c.jpg"
                            title="50% OFF 1st Class"
                            brand="SpinCo Kelowna"
                        />
                    </ScrollView>

                    <TitleBlock title="Trending Categories" showSeeAll />

                    <CategoryCard type="Fitness" vendors={24} offers={56} />
                    <CategoryCard type="Yoga" vendors={8} offers={32} />
                    <CategoryCard type="Massage" vendors={12} offers={28} customStyle={{ marginBottom: 20 }} />
                </Content>
            </Container>
        );
    }
}

/**
 * @param state
 * @returns {{loading: boolean}}
 */
const mapStateToProps = (state) => ({
    loading: state.claims.loading,
    whitelabel: state.user.whitelabel
});

export default connect(mapStateToProps)(MarketPlace);