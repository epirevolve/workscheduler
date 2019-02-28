import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const $script = $('script[src*="operator"]');

const operator = $script.data('operator');

const store = createStore(rootReducer, {operator});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)