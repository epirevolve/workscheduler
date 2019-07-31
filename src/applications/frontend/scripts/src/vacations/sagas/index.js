import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as waitingActions from 'waitingActions';
import * as api from '../services/api';

function *runFetchScheduler(action) {
    const { res, error } = yield call(api.fetchScheduler, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successFetchScheduler(JSON.parse(res.text))),
            put(waitingActions.onGoing())
        ]);
    } else {
        yield all([
            put(actions.failureFetchScheduler()),
            put(waitingActions.onGoing())
        ]);
    }
}

function *handleFetchScheduler() {
    yield takeEvery(actionTypes.START_FETCH_SCHEDULER, runFetchScheduler);
}

function *runUpdateScheduler(action) {
    const { error } = yield call(api.updateScheduler, action.payload);
    if (!error) {
        yield all([
            put(actions.successUpdateScheduler()),
            put(showSnackbar('Succeed to update monthly setting')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateScheduler()),
            put(showSnackbar('Sorry... we had failed to update monthly setting'))
        ]);
    }
}

function *handleUpdateScheduler() {
    yield takeEvery(actionTypes.START_UPDATE_SCHEDULER, runUpdateScheduler);
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
        fork(handleFetchScheduler),
        fork(handleUpdateScheduler),
        fork(handleRemoveVacation)
    ]);
}