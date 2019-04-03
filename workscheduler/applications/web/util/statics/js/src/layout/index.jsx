import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import NavContainer from './containers/NavContainer';
import DrawerContainer from './containers/DrawerContainer';

const store = createStore(rootReducer, {open: false})

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