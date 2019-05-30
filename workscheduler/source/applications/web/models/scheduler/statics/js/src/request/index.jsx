import React from 'react';
import { render } from 'react-dom'

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import App from './components/App'

render(
    <MuiThemeProvider theme={Theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('monthSelector')
)