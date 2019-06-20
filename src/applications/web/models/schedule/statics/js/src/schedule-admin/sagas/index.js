import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';
import { showSnackbar } from 'snackbarActions';

import { handleRequestSchedules } from '../../schedule/sagas';

function *runSaveSchedules(action) {
    const { error } = yield call(api.saveSchedules, action.payload);
    if (!error) {
        yield all([
            put(actions.successSaveSchedules()),
            put(showSnackbar('Succeed to update schedules', 'success'))
        ]);

    } else {
        yield all([
            put(actions.failureSaveSchedules()),
            put(showSnackbar('Sorry... we had failed to update schedules'))
        ]);
    }
}

export function *handleSaveSchedules() {
    yield takeEvery(actionTypes.START_SAVE_SCHEDULES, runSaveSchedules);
}

function *runPublishSchedules(action) {
    const { error } = yield call(api.publishSchedules, action.payload);
    if (!error) {
        yield all([
            put(actions.successPublishSchedules()),
            put(showSnackbar('Succeed to publish schedules'))
        ]);

    } else {
        yield all([
            put(actions.failurePublishSchedules()),
            put(showSnackbar('Sorry... we had failed to publish schedules'))
        ]);
    }
}

export function *handlePublishSchedules() {
    yield takeEvery(actionTypes.START_PUBLISH_SCHEDULES, runPublishSchedules);
}

function *runWithdrawSchedules(action) {
    const { error } = yield call(api.withdrawSchedules, action.payload);
    if (!error) {
        yield all([
            put(actions.successWithdrawSchedules()),
            put(showSnackbar('Succeed to withdraw schedules'))
        ]);

    } else {
        yield all([
            put(actions.failureWithdrawSchedules()),
            put(showSnackbar('Sorry... we had failed to withdraw schedules'))
        ]);
    }
}

export function *handleWithdrawSchedules() {
    yield takeEvery(actionTypes.START_WITHDRAW_SCHEDULES, runWithdrawSchedules);
}

export default function *rootSaga() {
    yield all([
		fork(handleRequestSchedules),
		fork(handleSaveSchedules),
		fork(handlePublishSchedules),
		fork(handleWithdrawSchedules),
	]);
}