import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="affiliations"]').dataset;
const affiliations = JSON.parse(dataset.affiliations);

const store = createStore(rootReducer, {affiliations, affiliationDialog: {isOpen: false}})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)