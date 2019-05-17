import '../schedule';

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer, { initValue } from './reducers'
import { initValue as initScheduleValue } from '../schedule/reducers'

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import App from './components/App'

const store = createStore(rootReducer, {schedules: initScheduleValue, affiliations: initValue})

render(
    <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)