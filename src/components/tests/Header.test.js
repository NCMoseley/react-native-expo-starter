import React from 'react';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import store from '../../redux/store.js';

import Header from '../Header';

describe('Header Component', () => {
    it('Renders', () => {
        const { getByText } = render(<Provider store={store}>
            <Header
                title="Title"
                titleAlign="center"
                leftIcon="md-arrow-round-back"
                onLeftIconPress={ () => console.log('') }
                rightIcon="md-close"
                onRightIconPress={ () => console.log('') }
            />
        </Provider>);

        expect(getByText('Title')).toBeTruthy();
    });
});