import React from 'react';
import { render } from 'react-dom'

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import MonthSelect from './components/MonthSelect'

render(
    <MuiThemeProvider theme={Theme}>
        <MonthSelect />
    </MuiThemeProvider>,
    document.getElementById('monthSelector')
)