import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import { REQUEST_SCHEDULES } from '../actionTypes';
import * as actions from '../actions';
import * as waitingActions from 'waitingActions';
import * as api from '../services/api';

function *runRequestSchedules(action) {
    yield put(waitingActions.waiting());
    const { res, error } = yield call(api.fetchSchedules, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successFetchSchedules(res)),
            put(waitingActions.onGoing())
        ]);
    } else {
        yield all([
            put(actions.failureFetchSchedules(error)),
            put(waitingActions.onGoing())
        ]);
    }
}

export function *handleRequestSchedules() {
    yield takeEvery(REQUEST_SCHEDULES, runRequestSchedules);
}

export default function *rootSaga() {
    yield fork(handleRequestSchedules);
}