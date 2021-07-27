import React from 'react';
import { render } from 'react-native-testing-library';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
    it('Renders', () => {
        const { getByText } = render(<SearchBar
            whitelabel={false}
            placeholder="Is massage covered?"
            onSearch={ () => console.log('') }
        />);

        // expect(getByText('Is massage covered?')).toBeTruthy();
    });
});