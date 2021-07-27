/* eslint-disable func-names */
const validations = {
    checkEmpty: {
        length: {
            minimum: 1,
            message: '^Please enter a value.'
        }
    },

    postalCode: {
        // eslint-disable-next-line no-useless-escape
        format: '^(?!.*[DFIOQU])[A-VXY][0-9][A-Z][ ]?[0-9][A-Z][0-9]$'
    },

    creditCard: {
        length: {
            minimum: 16,
            message: '^Please enter a valid 16 digit credit card number.'
        }
    },

    accountIdentifier: {
        length: {
            minimum: 6,
            message: '^Your Account Identifier is incorrect.'
        }
    },

    userIdentifier: {
        length: {
            minimum: 6,
            message: '^Your User Identifier is incorrect.'
        }
    },

    email: {
        presence: {
            message: '^Please enter an email address.'
        },
        email: {
            message: '^Please enter a valid email address.'
        }
    },

    contactEmail: {
        presence: {
            message: '^Please enter a contact email address.'
        },
        email: {
            message: '^Please enter a valid email address.'
        }
    },

    companyEmail: {
        presence: {
            message: '^Please enter a company email address.'
        },
        email: {
            message: '^Please enter a valid email address.'
        }
    },

    password: {
        presence: {
            message: '^Please enter a password.'
        },
        length: {
            minimum: 6,
            message: '^Your password must be at least 6 characters.'
        }
    },

    subject: {
        length: {
            minimum: 1,
            message: '^Please enter a subject.'
        }
    },

    message: {
        length: {
            minimum: 1,
            message: '^Please enter a message for your notification.'
        }
    },

    newPassword: {
        presence: {
            message: '^Please enter a password.'
        },
        length: {
            minimum: 6,
            message: '^Your password must be at least 6 characters.'
        }
    },

    confirmPassword: {
        presence: {
            message: '^Please enter a password.'
        },
        length: {
            minimum: 6,
            message: '^Your password must be at least 6 characters.'
        }
    },

    companyName: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please enter only one company name.'
                        }
                    }; 
                }

                // Test for three capital letters in a row. 
                // if ((/.+(?=(?:[A-Z]{2})|_)(?:(?:[A-Z])(?:[A-Z]\.)?)?/).test(value)) {
                    
                //     return {   
                //         format: {
                //             // This pattern always fails. This is intentional
                //             pattern: "[\\s\\'\\-]+",
                //             message: '^Please do not use subsequent capital letters.'
                //         }
                //     };
                // }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-\\&\\.]+", // working
                        message: '^Please do not enter any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid company name.'
            } 
        };
    },

    company: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please enter only one company name.'
                        }
                    }; 
                }

                // Test for three capital letters in a row. 
                // if ((/.+(?=(?:[A-Z]{2})|_)(?:(?:[A-Z])(?:[A-Z]\.)?)?/).test(value)) {
                    
                //     return {   
                //         format: {
                //             // This pattern always fails. This is intentional
                //             pattern: "[\\s\\'\\-]+",
                //             message: '^Please do not use subsequent capital letters.'
                //         }
                //     };
                // }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-\\&\\.]+", // working
                        message: '^Please do not enter any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid company name.'
            } 
        };
    },

    firstLine: {
        length: {
            minimum: 5,
            message: '^Please enter a valid address.'
        }
    },

    city: {
        length: {
            minimum: 2,
            message: '^Please enter a valid municipality.'
        }
    },

    address: {
        length: {
            minimum: 1,
            message: '^Please enter a valid address.'
        }
    },

    number: {
        length: {
            minimum: 1,
            message: '^Please enter a valid number.'
        }
    },

    dollar: {
        length: {
            minimum: 3,
            message: '^Please enter a valid dollar amount to 2 decimal places.'
        }
    },

    percentage: {
        presence: {
            message: '^Please enter a valid percentage, no more than 100, to 2 decimal places.'
        },
        numericality: {
            lessThanOrEqualTo: 100
        }
    },

    companyAddress: {
        length: {
            minimum: 1,
            message: '^Please enter a company address.'
        }
    },

    phone: {
        length: {
            minimum: 10,
            message: '^Please enter a valid phone number.'
        }
    },

    description: {
        presence: {
            message: '^Please provide a description for your support request.'
        },
        length: {
            minimum: 3,
            message: '^Please provide a valid description for your support request.'
        }
    },

    name: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only your official name. Do not use " or "'
                        }
                    }; 
                }

                // Test for three capital letters in a row. 
                if ((/.+(?=(?:[A-Z]{2})|_)(?:(?:[A-Z])(?:[A-Z]\.)?)?/).test(value)) {
                    
                    return {   
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please do not use subsequent capital letters.'
                        }
                    };
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    birthdate: {
        length: {
            minimum: 1,
            message: '^Please enter a birth date: MM/DD/YYYY.'
        }
    },

    className: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only one official name. Do not use " or "'
                        }
                    }; 
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    classTitle: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only one official name. Do not use " or "'
                        }
                    }; 
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    divisionName: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only one official name. Do not use " or "'
                        }
                    }; 
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    divisionTitle: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only one official name. Do not use " or "'
                        }
                    }; 
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    hireDate: {
        length: {
            minimum: 1,
            message: '^Please enter a hire date: MM/DD/YYYY.'
        }
    },

    maritlStat: {
        length: {
            minimum: 1,
            message: '^Please provide a marital status.'
        }
    },

    gender: {
        length: {
            minimum: 1,
            message: '^Please provide a gender.'
        }
    },

    title: {
        length: {
            minimum: 1,
            message: '^Please provide an occupation for the user.'
        }
    },

    coverageType: {
        length: {
            minimum: 1,
            message: '^Please select a coverage type.'
        }
    },

    province: {
        length: {
            minimum: 1,
            message: '^Please provide the users province of residence.'
        }
    },

    earningsType: {
        length: {
            minimum: 1,
            message: '^Please choose the earnings type.'
        }
    },

    salary: {
        length: {
            minimum: 1,
            message: '^Please provide the users annual salary.'
        }
    },

    hourlyWage: {
        length: {
            minimum: 1,
            message: '^Please provide the users hourly wage.'
        }
    },

    hoursPerWeek: {
        length: {
            minimum: 1,
            message: '^Please provide the number of hours worked per week.'
        }
    },

    firstname: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only your official name. Do not use " or "'
                        }
                    }; 
                }

                // Test for three capital letters in a row. 
                if ((/.+(?=(?:[A-Z]{2})|_)(?:(?:[A-Z])(?:[A-Z]\.)?)?/).test(value)) {
                    
                    return {   
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please do not use subsequent capital letters.'
                        }
                    };
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    lastname: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only your official name. Do not use " or "'
                        }
                    }; 
                }

                // Test for three capital letters in a row. 
                if ((/.+(?=(?:[A-Z]{2})|_)(?:(?:[A-Z])(?:[A-Z]\.)?)?/).test(value)) {
                    
                    return {   
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please do not use subsequent capital letters.'
                        }
                    };
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    relationship: {
        length: {
            minimum: 1,
            message: '^Please provide a relationship.'
        }
    },

    category: {
        length: {
            minimum: 1,
            message: '^Please provide a category.'
        }
    },

    shares: {
        length: {
            minimum: 1,
            message: '^Please provide a percentage of shares.'
        }
    },

    authority: function(value) {
        if (value) {
            // Test for Special Characters
            if ((/[a-zA-Z0-9\\s\\'\\-]+/).test(value)) {
                // Test for " or "
                if ((/(?: or )/gi).test(value)) {
                    return {        
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please choose only one official first and lastname. Do not use " or "'
                        }
                    }; 
                }

                // Test for three capital letters in a row. 
                if ((/.+(?=(?:[A-Z]{2})|_)(?:(?:[A-Z])(?:[A-Z]\.)?)?/).test(value)) {
                    
                    return {   
                        format: {
                            // This pattern always fails. This is intentional
                            pattern: "[\\s\\'\\-]+",
                            message: '^Please do not use subsequent capital letters.'
                        }
                    };
                }

                // Return Special characters pattern
                return { 
                    format: {
                        pattern: "[a-zA-Z0-9\\s\\'\\-]+", // working
                        message: '^Please do not include any special characters.'
                    }
                };
            }
        }

        // Test for length only
        return { 
            length: {
                minimum: 2,
                message: '^Please enter a valid name.'
            } 
        };
    },

    authorityEmail: {
        presence: {
            message: '^Please enter an email address.'
        },
        email: {
            message: '^Please enter a valid email address.'
        }
    }
};

export default validations;