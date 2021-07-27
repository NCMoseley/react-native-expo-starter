import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Form from '../../components/Form';
import Button from '../../components/Button';
import DropDown from '../../components/Inputs/DropDown';
import TextInput from '../../components/Inputs/TextInput';
import DateInput from '../../components/Inputs/DateInput';
import PhoneInput from '../../components/Inputs/PhoneInput';
import Loader from '../../components/Loader';
import * as events from "../../services/events";
import * as notifier from '../../services/Notifier';
import { updateUserSettings } from '../../actions/user';
import validateInput from '../../services/FormValidation/validateInput';
import * as Dates from "../../services/Dates";
import DrawerService from "../../services/DrawerService";
import colors from '../../theme/colors';

class Settings extends Component {
    state = {
        firstname: this.props.meta.firstname || '',
        lastname: this.props.meta.lastname || '',
        email: this.props.meta.email || '',
        phone: this.props.meta.phone || '',
        birthdate: Dates.formatIncomingDate(this.props.meta.birthdate) || '',
        province: this.props.meta.province || null,
        country: 'Canada',
        maritlStat: this.props.meta.maritlStat || null,
        gender: this.props.meta.gender || null,
        coverageType: this.props.meta.coverageType || null
    };

    async componentDidMount() {
        events.record('view_change_settings');

        const userDetails = this.props.meta;

        let mailingAddress = {};

        const data = {
            firstname: userDetails.firstname || '',
            lastname: userDetails.lastname || '',
            email: userDetails.email || '',
            password: userDetails.password || '',
            confirmPassword: userDetails.confirmPassword || '',
            address: null,

            suite: mailingAddress.suite || '',
            firstLine: mailingAddress.firstLine || '',
            city: mailingAddress.city || '',
            province: mailingAddress.province || '',
            postalCode: mailingAddress.postalCode || '',

            maritlStat: userDetails.maritlStat || '',
            phone: userDetails.phone || '',
            birthdate: Dates.formatIncomingDate(userDetails.birthdate) || '',
            gender: userDetails.gender || '',
            coverageType: userDetails.coverageType || ''
        };

        await this.setState({
            ...data
        });

        return null;
    }

    _handleInputChange = (name, value) => {
        this.setState({ ...this.state, [name]: value });
    };

    _handleDropDownChange = (type, value) => {
        this.setState({
            [type]: value
        });
    };

    _onBlur = async (type) => {
        if (type !== 'suite') {
            this.setState({
                [`${ type }Error`]: await validateInput(type, this.state[type])
            });
        }

        const { suite, firstLine, city, province, postalCode, country } = this.state;
    };

    _validateAddress = (address) => {
        const parsed = address.split(',');
        const invalid = parsed.length > 5 ? false : "Please enter a valid address.";
        notifier.displayError(invalid);

        return invalid;
    }

    _validateForm = async () => {
        const phoneError = await validateInput('phone', this.state.phone);

        const firstLineError = await validateInput('firstLine', this.state.firstLine);
        const cityError = await validateInput('city', this.state.city);
        const provinceError = await validateInput('province', this.state.province);
        const postalCodeError = await validateInput('postalCode', this.state.postalCode);

        const maritlStatError = await validateInput('maritlStat', this.state.maritlStat);
        const genderError = await validateInput('gender', this.state.gender);
        const coverageTypeError = await validateInput('coverageType', this.state.coverageType);

        this.setState({
            phoneError,

            firstLineError,
            cityError,
            provinceError,
            postalCodeError,

            maritlStatError,
            genderError,
            coverageTypeError
        });

        if (
            phoneError ||

            firstLineError ||
            cityError ||
            provinceError ||
            postalCodeError ||

            maritlStatError ||
            genderError ||
            coverageTypeError
        ) {
            return false;
        }

        return true;
    };

    _confirm = async () => {
        const {
            firstname,
            lastname,
            email,
            birthdate,
            phone,

            suite,
            firstLine,
            city,
            province,
            postalCode,
            country,

            gender,
            maritlStat,
            coverageType
        } = this.state;

        const isFormValid = await this._validateForm();

        if (!isFormValid) {
            notifier.displayError('Please confirm that your have filled out all the details.');

            return false;
        }

        const success = await this.props.dispatch(updateUserSettings({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            province: province.trim(),
            birthdate: Dates.formatOutgoingDate(birthdate),
            maritlStat: maritlStat.trim(),
            phone,
            gender: gender.trim(),
            coverageType: coverageType.trim()
        }));

        if (!success) {
            notifier.displayError('Please confirm that your have filled out all the details.');

            return false;
        }

        return null;
    };

    render() {
        const { whitelabel } = this.props;
        const {
            firstname,
            lastname,
            email,
            phone,
            birthdate,

            firstLine,
            suite,
            city,
            province,

            postalCode,
            maritlStat,
            gender,
            coverageType
        } = this.state;

        return (
            <Container>
                <Header
                    title="Settings"
                    test="settingspage"
                    navigation={this.props.navigation}
                    openDrawer={DrawerService.open}
                />

                {/* <Content> */}
                <Form paddingTop={20} paddingBottom={20}>
                    <TextInput
                        label="First Name"
                        value={firstname}
                        disabled
                        whitelabel={ whitelabel }
                    />

                    <TextInput
                        label="Last Name"
                        value={lastname}
                        disabled
                        whitelabel={ whitelabel }
                    />

                    <TextInput
                        label="Email"
                        value={email}
                        disabled
                        whitelabel={ whitelabel }
                    />

                    <DateInput
                        label="Birth Date"
                        value={birthdate}
                        disabled
                        whitelabel={ whitelabel }
                    />

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

                    {/* <DropDown
                        label="Marital Status"
                        value={maritlStat}
                        options={maritalStatusOptions}
                        onChange={(value) => this._handleDropDownChange('maritlStat', value)}
                        error={this.state.maritlStatError}
                        whitelabel={ whitelabel }
                    /> */}

                    <PhoneInput
                        label="Phone"
                        value={ phone }
                        onChangeText={(value) => this._handleInputChange('phone', value)}
                        error={this.state.phoneError}
                        whitelabel={ whitelabel }
                    />

                    {/* <DropDown
                        label="Gender"
                        value={ gender }
                        options={genderOptions}
                        onChange={(value) => this._handleDropDownChange('gender', value)}
                        error={this.state.maritlStatError}
                        whitelabel={ whitelabel }
                    />

                    <DropDown
                        label="Coverage Type"
                        value={ coverageType }
                        options={coverageOptions}
                        onChange={(value) => this._handleDropDownChange('coverageType', value)}
                        error={this.state.coverageTypeError}
                        disabled
                        whitelabel={ whitelabel }
                    /> */}
                </Form>
                {/* </Content> */}

                <Button
                    name="CONFIRM"
                    height={55}
                    marginTop={10}
                    fullWidth
                    backgroundColor={ whitelabel.primaryColor || colors.brandGreen }
                    onPress={this._confirm}
                />

                {
                    this.props.loading &&
                    <Loader />
                }
            </Container>
        );
    }
}

/**
 * @param {*} state
 */
const mapStateToProps = (state) => ({
    whitelabel: state.user.whitelabel,
    loading: state.user.loading,
    meta: state.user.meta
});

export default connect(mapStateToProps)(Settings);