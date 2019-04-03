import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="user"]').dataset;
const user = JSON.parse(dataset.user);

const store = createStore(rootReducer, {user});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)