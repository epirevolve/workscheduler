import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import { REQUEST_SCHEDULES } from '../actionTypes';
import * as actions from '../actions';
import * as waitActions from '../actions/waitActions';
import * as api from '../services/api';

function *runRequestSchedules(action) {
    const { res, error } = yield call(api.fetchSchedules, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successSchedules(res)),
            put(waitActions.onGoing())
        ]);
    } else {
        yield all([
            put(actions.failureSchedules(error)),
            put(waitActions.onGoing())
        ]);
    }
}

export function *handleRequestSchedules() {
    yield takeEvery(REQUEST_SCHEDULES, runRequestSchedules);
}

export default function *rootSaga() {
    yield fork(handleRequestSchedules);
}