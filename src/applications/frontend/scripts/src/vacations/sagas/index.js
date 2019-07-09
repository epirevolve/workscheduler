import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';

function *runAppendVacation(action) {
    const { res, error } = yield call(api.appendVacation, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successAppendVacation(JSON.parse(res.text))),
            put(showSnackbar('Succeed to append a vacation')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureAppendVacation()),
            put(showSnackbar('Sorry... we had failed to append a vacation'))
        ]);
    }
}

function *handleAppendVacation() {
    yield takeEvery(actionTypes.START_APPEND_VACATION, runAppendVacation);
}

function *runUpdateVacation(action) {
    const { res, error } = yield call(api.updateVacation, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successUpdateVacation(JSON.parse(res.text))),
            put(showSnackbar('Succeed to update a vacation')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateVacation()),
            put(showSnackbar('Sorry... we had failed to update a vacation'))
        ]);
    }
}

function *handleUpdateVacation() {
    yield takeEvery(actionTypes.START_UPDATE_VACATION, runUpdateVacation);
}

function *runRemoveVacation(action) {
    const { error } = yield call(api.removeVacation, action.payload);
    if (!error) {
        yield all([
            put(actions.successRemoveVacation(action.payload.id)),
            put(showSnackbar('Succeed to remove a vacation')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureRemoveVacation()),
            put(showSnackbar('Sorry... we had failed to remove a vacation'))
        ]);
    }
}

function *handleRemoveVacation() {
    yield takeEvery(actionTypes.START_REMOVE_VACATION, runRemoveVacation);
}

export default function *rootSaga() {
    yield all([
        fork(handleAppendVacation),
        fork(handleUpdateVacation),
        fork(handleRemoveVacation)
    ]);
}