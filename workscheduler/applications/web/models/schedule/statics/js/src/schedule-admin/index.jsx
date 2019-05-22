import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'
import { initValue } from '../schedule/reducers'

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import App from './components/App'

const store = createStore(rootReducer, {schedules: initValue})

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update')
    whyDidYouUpdate(React)
}

render(
    <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)