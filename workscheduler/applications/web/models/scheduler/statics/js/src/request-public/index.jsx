import '../request';

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const $script = $('script[src*="request-public"]');

const requestCalendar = $script.data('calendar');

const store = createStore(rootReducer, {requestCalendar, requestDialog: {isOpen: false}})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)