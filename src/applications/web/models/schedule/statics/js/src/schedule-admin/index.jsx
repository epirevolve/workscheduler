import React from 'react';
import { render } from 'react-dom';
import { createStore, compose , applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import rootReducer, { initValue as teams} from './reducers';
import { initValue as schedules } from '../schedule/reducers';

import rootSaga from './sagas';

import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import Theme from 'ColorTheme';

import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    {schedules, teams, ui: {isLoading: true, isProgressing: false}},
    composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

render(
    <StylesProvider injectFirst={true}>
        <ThemeProvider theme={Theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </StylesProvider>,
    document.getElementById('root')
);