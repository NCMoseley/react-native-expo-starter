import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import TextInput from '../../components/Inputs/TextInput';
import DropDown from './DropDown.js';
import validateInput from '../../services/FormValidation/validateInput';

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
});

class AddressForm extends Component {
    state = {
        suite: '',
        firstLine: '',
        city: '',
        province: 'British Columbia',
        postalCode: '',
        country: 'Canada',
        completed: '',
        error: false
    };

    async componentDidMount() {
        const complete = this.props.completeAddress;
        const errorTrigger = this.props.errorTrigger;

        if (errorTrigger) {
            await this.setState({
                firstLineError: errorTrigger,
                cityError: errorTrigger,
                provinceError: errorTrigger,
                postalCodeError: errorTrigger
            });
        }

        if (complete) {
            const completeArr = complete.split(',');

            if (completeArr[0].includes('Unit')) {
                const unit = completeArr[0].split(' ');

                await this.setState({
                    suite: unit[1],
                    firstLine: completeArr[1],
                    city: completeArr[2],
                    province: completeArr[3],
                    postalCode: completeArr[4]
                });
            } else {
                await this.setState({
                    firstLine: completeArr[0],
                    city: completeArr[1],
                    province: completeArr[2],
                    postalCode: completeArr[3]
                });
            }
        }
    }

    // async componentWillReceiveProps(nextProps) {
    //     const complete = nextProps.completeAddress;
    //     const errorTrigger = nextProps.errorTrigger;

    //     if (errorTrigger) {
    //         await this.setState({
    //             firstLineError: errorTrigger,
    //             cityError: errorTrigger,
    //             provinceError: errorTrigger,
    //             postalCodeError: errorTrigger
    //         });
    //     }

    //     if (complete) {
    //         const completeArr = complete.split(',');

    //         if (completeArr[0].includes('Unit')) {
    //             const unit = completeArr[0].split(' ');

    //             await this.setState({
    //                 suite: unit[1],
    //                 firstLine: completeArr[1],
    //                 city: completeArr[2],
    //                 province: completeArr[3],
    //                 postalCode: completeArr[4]
    //             });
    //         } else {
    //             await this.setState({
    //                 firstLine: completeArr[0],
    //                 city: completeArr[1],
    //                 province: completeArr[2],
    //                 postalCode: completeArr[3]
    //             });
    //         }
    //     }
    // }

    _onBlur = async (type) => {
        if (type !== 'suite') {
            this.setState({
                [`${ type }Error`]: await validateInput(type, this.state[type]),
                error: await validateInput("checkEmpty", this.state[type])
            });
        }

        const { firstLine, city, province, postalCode, error } = this.state;
    };

    _handleInputChange = (name, value) => {
        this.setState({ ...this.state, [name]: value });
    };

    render() {
        const { whitelabel } = this.props;
        const {
            firstLine,
            suite,
            city,
            province,
            postalCode
        } = this.state;

        return (
            <View style={styles.form}>
                <TextInput
                    label="Street Address"
                    value={firstLine}
                    onBlur={() => this._onBlur('firstLine')}
                    onChangeText={(value) => this._handleInputChange('firstLine', value)}
                    error={this.state.firstLineError}
                    whitelabel={ whitelabel }
                />

                <TextInput
                    label="Suite/Unit"
                    value={suite}
                    onChangeText={(value) => this._handleInputChange('suite', value)}
                    whitelabel={ whitelabel }
                />

                <TextInput
                    label="City/Town"
                    value={city}
                    onBlur={() => this._onBlur('city')}
                    onChangeText={(value) => this._handleInputChange('city', value)}
                    error={this.state.cityError}
                    whitelabel={ whitelabel }
                />

                {/* <DropDown
                    label="Province"
                    value={province}
                    onChange={(value) => this._handleInputChange('province', value)}
                    options={provinceOptions}
                    error={this.state.provinceError}
                    whitelabel={ whitelabel }
                /> */}

                <TextInput
                    label="Postal Code"
                    value={postalCode}
                    onBlur={() => this._onBlur('postalCode')}
                    onChangeText={(value) => this._handleInputChange('postalCode', value)}
                    error={this.state.postalCodeError}
                    whitelabel={ whitelabel }
                />

                {/* <TextInput
                    label="Country"
                    value={country}
                    onBlur={() => this._onBlur('country')}
                    onChangeText={(value) => this._handleInputChange('country', value)}
                /> */}
            </View>
        );
    }
}


/**
 * @param state
 * @returns {{loading: *}}
 */
const mapStateToProps = (state) => ({
    loading: state.user.loading,
    whitelabel: state.user.whitelabel
});

export default connect(mapStateToProps)(AddressForm);