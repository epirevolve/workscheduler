import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="users"]').dataset;
const users = JSON.parse(dataset.users);

const store = createStore(rootReducer, {users, userDialog: {isOpen: false}})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)