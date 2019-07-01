import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer, { initValue } from './reducers';

const store = createStore(rootReducer, initValue);

import App from './components/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);