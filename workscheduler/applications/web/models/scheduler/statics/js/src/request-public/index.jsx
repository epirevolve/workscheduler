import '../request';

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="request-public"]').dataset;
const requestCalendar = JSON.parse(dataset.calendar);

const store = createStore(rootReducer, {requestCalendar, requestDialog: {isOpen: false}})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)