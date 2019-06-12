import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import rootReducer, { initValue as teams} from './reducers';
import { initValue as schedules } from '../schedule/reducers';

import rootSaga from './sagas';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import App from './components/App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {schedules, teams, ui: {isLoading: true}}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

render(
    <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);