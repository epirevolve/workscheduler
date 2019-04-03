import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="operators"]').dataset;
const operators = JSON.parse(dataset.operators);

const store = createStore(rootReducer, {operators, operatorDialog: {isOpen: false}})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)