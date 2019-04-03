import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="scheduler-menu"]').dataset;
const menu = { affiliation: JSON.parse(dataset.affiliations)[0] };

const store = createStore(rootReducer, {menu});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)