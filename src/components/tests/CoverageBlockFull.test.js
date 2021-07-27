import React from 'react';
import { render } from 'react-native-testing-library';
import CoverageBlockFull from '../CoverageBlockFull';

describe('CoverageBlockFull Component', () => {
    it('Renders', () => {
        const { getByText } = render(<CoverageBlockFull
            coverage={{
                "edMax": 20000.0001,
                "overallMax": 1000
            }}
        />);

        expect(getByText('Erectile Dysfunction Medication')).toBeTruthy();
        expect(getByText('$20,000.00')).toBeTruthy();
        expect(getByText('Overall')).toBeTruthy();
        expect(getByText('$1,000.00')).toBeTruthy();
    });

    it('Renders', () => {
        const { getByText, queryByText } = render(<CoverageBlockFull
            coverage={{
                "majorMax": 0,
                "hasDispenseFeeMax": 0,
                "preferredProviderReimbursement": 0
            }}
            isParameds
        />);

        expect(getByText('Major')).toBeTruthy();
        expect(queryByText('Has Dispense Fee Max')).toBeNull();
        expect(queryByText('Preferred Provider Reimbursement')).toBeNull();
    });
});