import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { combineWithCommonReducer } from 'wrappingByCommonReducer';
const store = createStore(combineWithCommonReducer());

import App from './components/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);