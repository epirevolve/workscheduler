import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as waitingActions from 'waitingActions';
import * as api from '../services/api';

export function *runFetchScheduler(action) {
    yield put(waitingActions.waiting());
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
            put(showSnackbar('Succeed to update scheduler'))
        ]);
    } else {
        yield all([
            put(actions.failureUpdateScheduler()),
            put(showSnackbar('Sorry... we had failed to update scheduler'))
        ]);
    }
}

function *handleUpdateScheduler() {
    yield takeEvery(actionTypes.START_UPDATE_SCHEDULER, runUpdateScheduler);
}

export default function *rootSaga() {
    yield all([
        fork(handleFetchScheduler),
        fork(handleUpdateScheduler)
    ]);
}