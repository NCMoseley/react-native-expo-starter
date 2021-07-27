import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';
import initialState from './initialState.js';

const composedEnhancers = compose(applyMiddleware(thunk));

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;