import React from 'react';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import store from '../../redux/store.js';

import InfoModal from '../InfoModal';

describe('InfoModal Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Provider store={store}>
            <InfoModal close={ () => console.log('') } />
        </Provider>);

        expect(getByText('Going to the Dentist?')).toBeTruthy();
    });
});