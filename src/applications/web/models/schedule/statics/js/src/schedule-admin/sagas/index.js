import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import { START_SAVE_SCHEDULES, START_PUBLIC_SCHEDULES } from '../actionTypes';
import * as actions from '../actions';
import { showSnackbar } from 'snackbarActions';
import * as api from '../services/api';

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
    yield takeEvery(START_SAVE_SCHEDULES, runSaveSchedules);
}

function *runPublicSchedules(action) {
    const { error } = yield call(api.saveSchedules, action.payload);
    if (!error) {
        yield all([
            put(actions.successPublicSchedules()),
            put(showSnackbar('Succeed to public schedules'))
        ]);

    } else {
        yield all([
            put(actions.failurePublicSchedules()),
            put(showSnackbar('Sorry... we had failed to public schedules'))
        ]);
    }
}

export function *handlePublicSchedules() {
    yield takeEvery(START_PUBLIC_SCHEDULES, runPublicSchedules);
}

export default function *rootSaga() {
    yield all([
		fork(handleRequestSchedules),
		fork(handleSaveSchedules),
		fork(handlePublicSchedules),
	]);
}