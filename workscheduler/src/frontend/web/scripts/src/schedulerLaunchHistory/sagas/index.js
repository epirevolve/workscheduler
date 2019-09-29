import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';

function *runFetchRunners(action) {
    const { res, error } = yield call(api.fetchCurrentRunners, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successFetchCurrentRunners(JSON.parse(res.text))),
        ]);
    } else {
        yield all([
            put(actions.failureFetchCurrentRunners()),
        ]);
    }
}

function *handleFetchRunners() {
    yield takeEvery(actionTypes.START_FETCH_RUNNERS, runFetchRunners);
}

function *runFetchLaunchHistories(action) {
    const { res, error } = yield call(api.fetchLaunchHistories, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successFetchLaunchHistories(JSON.parse(res.text))),
        ]);
    } else {
        yield all([
            put(actions.failureFetchLaunchHistories()),
        ]);
    }
}

function *handleFetchLaunchHistories() {
    yield takeEvery(actionTypes.START_FETCH_LAUNCH_HISTORIES, runFetchLaunchHistories);
}

function *runTerminateScheduler(action) {
    const { error } = yield call(api.terminateScheduler, action.payload);
    if (!error) {
        yield all([
            put(actions.successTerminateScheduler()),
            put(showSnackbar('Succeed to terminate scheduler'))
        ]);
    } else {
        yield all([
            put(actions.failureTerminateScheduler()),
            put(showSnackbar('Sorry... we had failed to terminate scheduler'))
        ]);
    }
}

function *handleTerminateScheduler() {
    yield takeEvery(actionTypes.START_TERMINATE_SCHEDULER, runTerminateScheduler);
}

export default function *rootSaga() {
    yield all([
        fork(handleFetchRunners),
        fork(handleFetchLaunchHistories),
        fork(handleTerminateScheduler),
    ]);
}