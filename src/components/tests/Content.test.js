import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';
import Content from '../Content';

describe('Content Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Content>
            <Text>TEST</Text>
        </Content>);

        expect(getByText('TEST')).toBeTruthy();
    });
});