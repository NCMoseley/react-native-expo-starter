import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Button from '../Button';

describe('Button Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Button
            name="button"
            height={60}
            fullWidth
            large
            backgroundColor="skyBlue"
            onPress={() => console.log('Hello world')}
        />);

        expect(getByText('button')).toBeTruthy();
    });

    it('Handles Press', () => {
        const handlePress = jest.fn();
        const { getByText } = render(<Button
            name="button"
            height={60}
            fullWidth
            large
            backgroundColor="skyBlue"
            onPress={handlePress}
        />);

        fireEvent.press(getByText('button'));
        expect(handlePress).toHaveBeenCalledTimes(1);
    });
});