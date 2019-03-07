import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const $script = $('script[src*="users"]');
const users = $script.data('users');

const store = createStore(rootReducer, {users, userDialog: {isOpen: false}})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)