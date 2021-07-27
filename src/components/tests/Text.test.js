import React from 'react';
import { render } from 'react-native-testing-library';
import Text from '../Text';

describe('Text Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Text
            text="TEST"
            color="white"
        />);

        expect(getByText('TEST')).toBeTruthy();
    });
});