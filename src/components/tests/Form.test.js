import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';
import Form from '../Form';

describe('Form Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Form>
            <Text>TEST</Text>
        </Form>);

        expect(getByText('TEST')).toBeTruthy();
    });
});