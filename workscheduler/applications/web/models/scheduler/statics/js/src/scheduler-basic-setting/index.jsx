import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="scheduler-basic-setting"]').dataset;
const scheduler = JSON.parse(dataset.scheduler);

const store = createStore(rootReducer, {scheduler});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)