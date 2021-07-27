import React from 'react';
import { render } from 'react-native-testing-library';
import CoverageBlockMedical from '../CoverageBlockMedical';

describe('CoverageBlockMedical Component', () => {
    it('Renders', () => {
        const { queryByText, getAllByText } = render(<CoverageBlockMedical
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

        // // Adding all price amounts with commas and dollar signs
        expect(getAllByText('$1,000.00')).toHaveLength(4);
        // // No periods and dates
        expect(queryByText('Eligibility Period Ends')).toBeNull();
        expect(queryByText('1,603,584,000.00')).toBeNull();
        expect(queryByText('Termination Age')).toBeNull();
    });
});