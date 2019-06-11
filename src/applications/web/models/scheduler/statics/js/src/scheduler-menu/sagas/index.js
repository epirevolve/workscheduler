import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { START_LAUNCH_SCHEDULER } from '../actionTypes';
import * as actions from '../actions';
import { showSnackbar } from 'snackbarActions';
import * as api from '../services/api';

function *runLaunchScheduler(action) {
    const { error } = yield call(api.launchScheduler, action.payload);
    if (!error) {
        yield put(showSnackbar('Succeed to update monthly setting'));
    } else {
        yield put(showSnackbar('Fail to update monthly setting'));
    }
}

function *handleLaunchScheduler() {
    yield takeEvery(START_LAUNCH_SCHEDULER, runLaunchScheduler);
}

export default function *rootSaga() {
	yield fork(handleLaunchScheduler);
}