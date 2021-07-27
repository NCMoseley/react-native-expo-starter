import initialState from '../initialState';
import {
    LOADING,
    GET_WHITELABEL,
    GET_USER,
    UPDATE_USER_SETTINGS_SUCCESS,
    ADD_DEPENDENT_SUCCESS,
    UPDATE_DEPENDENT_SUCCESS,
    PAYMENT_DETAILS_SUCCESS,
    REMOVE_DEPENDENT_SUCCESS,
    ADD_BENEFICIARY_SUCCESS,
    UPDATE_BENEFICIARY_SUCCESS,
    REMOVE_BENEFICIARY_SUCCESS,
    UPDATE_CURRENT_BENEFICIARIES,
    ADD_TRUSTEE_SUCCESS,
    UPDATE_TRUSTEE_SUCCESS,
    REMOVE_TRUSTEE_SUCCESS,
    GET_DEPENDENT
} from '../../actions/types/user';

export default (state = initialState.user, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                loading: action.state
            };
        }

        case GET_WHITELABEL: {
            return {
                ...state,
                whitelabel: action.whitelabel
            };
        }

        case GET_USER: {
            return {
                ...state,
                meta: action.meta,
                beneficiaries: action.beneficiaries,
                dependents: action.dependents,
                trustee: action.trustee,
                onlySpendingAccountActive: action.onlySpendingAccountActive,
                noClaims: action.noClaims
            };
        }

        case GET_DEPENDENT: {
            return {
                ...state,
                meta: {
                    ...action.meta,
                    isDependent: true
                }
            };
        }

        case UPDATE_USER_SETTINGS_SUCCESS: {
            return {
                ...state,
                meta: { ...state.meta, ...action.data }
            };
        }

        case PAYMENT_DETAILS_SUCCESS: {
            return {
                ...state,
                meta: {
                    ...state.meta,
                    paymentsSetup: 1
                }
            };
        }

        case ADD_DEPENDENT_SUCCESS: {
            return {
                ...state,
                dependents: [
                    action.dependent,
                    ...state.dependents
                ]
            };
        }

        case UPDATE_DEPENDENT_SUCCESS: {
            return {
                ...state,
                dependents:
                    state.dependents.map((dependent) => {
                        if (dependent.dependentID === action.dependentID) {
                            return {
                                ...dependent,
                                ...action.dependent
                            };
                        }

                        return dependent;
                    })
            };
        }

        case REMOVE_DEPENDENT_SUCCESS: {
            return {
                ...state,
                dependents: state.dependents.filter((dependent) => dependent.dependentID !== action.dependentID)
            };
        }

        case ADD_BENEFICIARY_SUCCESS: {
            if (action.isContingent) {
                return {
                    ...state,
                    beneficiaries: {
                        primary: [ ...state.beneficiaries.primary ],
                        contingent: [ action.beneficiary, ...state.beneficiaries.contingent ]
                    }
                };
            }

            return {
                ...state,
                beneficiaries: {
                    contingent: [ ...state.beneficiaries.contingent ],
                    primary: [ action.beneficiary, ...state.beneficiaries.primary ]
                }
            };
        }

        case UPDATE_BENEFICIARY_SUCCESS: {
            if (action.isContingent) {
                return {
                    ...state,
                    beneficiaries: {
                        contingent: state.beneficiaries.contingent.map((beneficiary) => {
                            if (beneficiary.beneficiaryID === action.beneficiaryID) {
                                return {
                                    ...beneficiary,
                                    ...action.beneficiary
                                };
                            }

                            return beneficiary;
                        }),
                        primary: [ ...state.beneficiaries.primary ]
                    }
                };
            }

            return {
                ...state,
                beneficiaries: {
                    primary: state.beneficiaries.primary.map((beneficiary) => {
                        if (beneficiary.beneficiaryID === action.beneficiaryID) {
                            return {
                                ...beneficiary,
                                ...action.beneficiary
                            };
                        }

                        return beneficiary;

                    }),
                    contingent: [ ...state.beneficiaries.contingent ]
                }
            };
        }

        case REMOVE_BENEFICIARY_SUCCESS: {
            if (action.isContingent) {
                return {
                    ...state,
                    beneficiaries: {
                        contingent: state.beneficiaries.contingent.filter((beneficiary) => beneficiary.beneficiaryID !== action.beneficiaryID),
                        primary: [ ...state.beneficiaries.primary ]
                    }
                };
            }

            return {
                ...state,
                beneficiaries: {
                    primary: state.beneficiaries.primary.filter((beneficiary) => beneficiary.beneficiaryID !== action.beneficiaryID),
                    contingent: [ ...state.beneficiaries.contingent ]
                }
            };
        }

        case UPDATE_CURRENT_BENEFICIARIES: {
            if (action.isContingent) {
                const currentBeneficiaries = action.currentBeneficiaries.contingent;
                return {
                    ...state,
                    beneficiaries: {
                        contingent: state.beneficiaries.contingent.map((beneficiary) => {
                            currentBeneficiaries.some((currentBeneficiary) => {
                                if (currentBeneficiary.beneficiaryID === beneficiary.beneficiaryID) {
                                    beneficiary = {
                                        ...beneficiary,
                                        ...currentBeneficiary
                                    };

                                    return true;
                                }

                                return false;
                            });

                            return {
                                ...beneficiary
                            };
                        }),
                        primary: [ ...state.beneficiaries.primary ]
                    }
                };
            }

            const currentBeneficiaries = action.currentBeneficiaries.primary;
            return {
                ...state,
                beneficiaries: {
                    primary: state.beneficiaries.primary.map((beneficiary) => {
                        currentBeneficiaries.some((currentBeneficiary) => {
                            if (currentBeneficiary.beneficiaryID === beneficiary.beneficiaryID) {
                                beneficiary = {
                                    ...beneficiary,
                                    ...currentBeneficiary
                                };

                                return true;
                            }

                            return false;
                        });

                        return {
                            ...beneficiary
                        };
                    }),
                    contingent: [ ...state.beneficiaries.contingent ]
                }
            };
        }

        case ADD_TRUSTEE_SUCCESS: {
            return {
                ...state,
                trustee: action.trustee
            };
        }

        case UPDATE_TRUSTEE_SUCCESS: {
            return {
                ...state,
                trustee: action.trustee
            };
        }

        case REMOVE_TRUSTEE_SUCCESS: {
            return {
                ...state,
                trustee: null
            };
        }

        default:
            return state;
    }
};