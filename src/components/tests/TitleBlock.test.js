import React from 'react';
import { render } from 'react-native-testing-library';
import TitleBlock from '../TitleBlock';

describe('Container Component', () => {
    it('Renders', () => {
        const { getByText } = render(<TitleBlock
            title="Paramedicals"
            subText="Sub title"
        />);

        expect(getByText('Paramedicals')).toBeTruthy();
        expect(getByText('Sub title')).toBeTruthy();
    });
});