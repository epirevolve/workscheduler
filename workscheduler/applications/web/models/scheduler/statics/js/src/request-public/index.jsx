import '../../request';

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

const $script = $('script[src*="request-public.min.js"]');

const calendar = $script.data('calendar');

const store = createStore(rootReducer, {calendar, dialog: {isOpen: false}})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)