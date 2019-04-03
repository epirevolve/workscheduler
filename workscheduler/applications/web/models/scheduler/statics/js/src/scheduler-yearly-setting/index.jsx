import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const dataset = document.querySelector('script[src*="scheduler-yearly-setting"]').dataset;
const yearlySetting = JSON.parse(dataset.yearlySetting);

const store = createStore(rootReducer, {yearlySetting});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)