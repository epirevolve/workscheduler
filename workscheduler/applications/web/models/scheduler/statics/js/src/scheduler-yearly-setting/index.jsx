import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import App from './components/App'

const $script = $('script[src*="scheduler-yearly-setting"]');
const yearlySetting = $script.data('yearlySetting');

const store = createStore(rootReducer, {yearlySetting});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)