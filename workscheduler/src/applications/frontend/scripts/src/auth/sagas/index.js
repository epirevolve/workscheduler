import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as apiActions from '../actions/api';
import * as api from '../services/api';

function *runTryToAuth(action) {
    const { error } = yield call(api.tryToAuth, action.payload);
    if (!error) {
        window.location = '/menu/';
    } else {
        yield all([
            put(showSnackbar('LogIn Id or Password were incorrect.'))
        ]);
    }
}

function *handleTryToAuth() {
    yield takeEvery(apiActions.START_TRY_AUTH, runTryToAuth);
}

export default function *rootSaga() {
    yield all([
        fork(handleTryToAuth),
    ]);
}