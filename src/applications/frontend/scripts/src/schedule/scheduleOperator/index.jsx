import React from 'react';
import { render } from 'react-dom';
import { createStore, compose , applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import rootReducer, { initValue } from './reducers';
import rootSaga from '../common/sagas';

import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, initValue,
    composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

import { startFetchSchedules } from "../common/actions";
import { team } from "../common/embedData";
const scheduleOf = new Date().toYearMonthFormatString();
store.dispatch(startFetchSchedules(team, scheduleOf));