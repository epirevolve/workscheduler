import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import App from './components/App';

const dataset = document.querySelector('script[src*="teams"]').dataset;
const teams = JSON.parse(dataset.teams);

const store = createStore(rootReducer, {teams, teamDialog: {isOpen: false}});

render(
    <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);