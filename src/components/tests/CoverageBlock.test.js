import React from 'react';
import { render } from 'react-native-testing-library';
import CoverageBlock from '../CoverageBlock';

describe('CoverageBlock Component', () => {
    it('Renders', () => {
        const { getByText } = render(<CoverageBlock
            title="Benefit"
            value="Maximum"
            type="header"
            isParameds
        />);

        expect(getByText('Benefit')).toBeTruthy();
    });

    it('Renders is not param', () => {
        const { getByText } = render(<CoverageBlock
            title="Benefit"
            value="Maximum"
            type="header"
        />);

        expect(getByText('Benefit')).toBeTruthy();
        expect(getByText('Maximum')).toBeTruthy();
    });
});