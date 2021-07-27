import React from 'react';
import { render } from 'react-native-testing-library';
import CoverageBlockMedicalNoMax from '../CoverageBlockMedicalNoMax';

describe('CoverageBlockMedicalNoMax Component', () => {
    it('Renders', () => {
        const { getByText } = render(<CoverageBlockMedicalNoMax
            coverage={{
                "ambulanceServices": 'rc',
                "benefitActive": 1,
                "cardiacRehabilitation": 1000,
                "carrier": "La Capitale",
                "convalescentHospital": 1000,
                "cataractSurgeryEyewear": 1000,
                "cataractSurgeryEyewearPeriod": 3,
                "deductibleOwing": 50,
                "duoDeductibleAmount": 50,
                "eligibilityPeriod": 3,
                "eligibilityPeriodEnds": 1603584000,
                "eligibilityTermDate": null,
                "familyDeductibleAmount": 50,
                "footOrthotics": 300,
                "hasDeductible": 0,
                "hearingAids": 500,
                "hearingAidsPeriod": 5,
                "hospitalBenefits": 'rc',
                "privateHospital": 0,
                "hospitalBenefitReimbursement": 10000,
                "includeConvalescentHospital": 1,
                "convalescentHospitalReimbursement": 80,
                "convalescentHospitalDailyMax": 300,
                "convalescentHospitalMaxDays": 180,
                "isEligible": 1,
                "medicalEquipment": 'rc',
                "medicalServicesAndSupplies": 'rc',
                "minHoursPerWeek": 32,
                "monthsSurvivorBenefit": 24,
                "orthopedicShoes": 1000,
                "privateDutyNursing": 10000,
                "prosthetics": 25000,
                "reimbursement": 80,
                "soloDeductibleAmount": 25,
                "terminationAge": 70
            }}
        />);

        // Check to make sure we are showing and turning the Camel Case into legible words
        expect(getByText('Ambulance Services')).toBeTruthy();
        expect(getByText('Medical Services And Supplies')).toBeTruthy();
    });
});