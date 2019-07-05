import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';

function *runUpdateMyself(action) {
    const { res, error } = yield call(api.updateMyself, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successUpdateMyself(JSON.parse(res.text))),
            put(showSnackbar('Succeed to update my info')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateMyself()),
            put(showSnackbar('Sorry... we had failed to update my info'))
        ]);
    }
}

function *handleUpdateMyself() {
    yield takeEvery(actionTypes.START_UPDATE_MYSELF, runUpdateMyself);
}

export default function *rootSaga() {
    yield all([
        fork(handleUpdateMyself),
    ]);
}