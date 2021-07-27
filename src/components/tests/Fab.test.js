import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { Text } from 'react-native';
import Fab from '../Fab';

describe('Fab Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Fab>
            <Text>TEST</Text>
        </Fab>);

        expect(getByText('TEST')).toBeTruthy();
    });
});