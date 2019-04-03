import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import NavContainer from './containers/NavContainer';
import DrawerContainer from './containers/DrawerContainer';

const dataset = document.querySelector('script[src*="layout"]').dataset;
const auth = JSON.parse(dataset.auth);

const store = createStore(rootReducer, {auth, open: false})

render(
    <Provider store={store}>
        <NavContainer />
    </Provider>,
    document.getElementById('nav')
)

render(
    <Provider store={store}>
        <DrawerContainer />
    </Provider>,
    document.getElementById('drawer')
)