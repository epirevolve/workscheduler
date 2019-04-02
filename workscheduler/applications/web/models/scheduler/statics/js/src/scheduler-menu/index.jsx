import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const $script = $('script[src*="scheduler-menu"]');

const menu = { affiliation: $script.data('affiliations')[0] };

const store = createStore(rootReducer, {menu});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)