import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import rootReducer from './reducers';

import NavContainer from './containers/NavContainer';
import DrawerContainer from './containers/DrawerContainer';

const store = createStore(rootReducer, {open: false});

render(
    <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
            <NavContainer />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('nav')
);

render(
    <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
            <DrawerContainer />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('drawer')
);