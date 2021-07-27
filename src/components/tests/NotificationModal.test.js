import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';
import NotificationModal from '../NotificationModal';

describe('NotificationModal Component', () => {
    it('Renders', () => {
        const { getByText } = render(<NotificationModal whitelabel={false} buttonText="CONFIRM">
            <Text>TEST</Text>
        </NotificationModal>);

        expect(getByText('TEST')).toBeTruthy();
        expect(getByText('CONFIRM')).toBeTruthy();
    });
});