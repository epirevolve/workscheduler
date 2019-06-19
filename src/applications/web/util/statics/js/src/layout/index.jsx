import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import Theme from 'ColorTheme';

import rootReducer from './reducers';

import NavContainer from './containers/NavContainer';
import DrawerContainer from './containers/DrawerContainer';

const store = createStore(rootReducer, {open: false});

render(
    <StylesProvider injectFirst={true}>
        <ThemeProvider theme={Theme}>
            <Provider store={store}>
                <NavContainer />
            </Provider>
        </ThemeProvider>
    </StylesProvider>,
    document.getElementById('nav')
);

render(
    <StylesProvider injectFirst={true}>
        <ThemeProvider theme={Theme}>
            <Provider store={store}>
                <DrawerContainer />
            </Provider>
        </ThemeProvider>
    </StylesProvider>,
    document.getElementById('drawer')
);