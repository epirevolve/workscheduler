import { put, call, fork, takeEvery } from 'redux-saga/effects';

import { START_LAUNCH_SCHEDULER } from '../actionTypes';
import { showSnackbar } from 'snackbarActions';
import * as api from '../services/api';

function *runLaunchScheduler(action) {
    const { error } = yield call(api.launchScheduler, action.payload);
    if (!error) {
        yield put(showSnackbar('Success to start scheduling. Please check a state at history page.'));
    } else {
        yield put(showSnackbar('Sorry... we have some trouble with launching scheduler.'));
    }
}

function *handleLaunchScheduler() {
    yield takeEvery(START_LAUNCH_SCHEDULER, runLaunchScheduler);
}

export default function *rootSaga() {
    yield fork(handleLaunchScheduler);
}