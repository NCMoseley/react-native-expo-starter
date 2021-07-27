import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';
import Container from '../Container';

describe('Container Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Container>
            <Text>TEST</Text>
        </Container>);

        expect(getByText('TEST')).toBeTruthy();
    });
});