import { take, put, call, fork, race, cancelled, takeEvery } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import { REQUEST_SCHEDULES } from '../actionTypes';
import { successSchedules, failureSchedules } from '../actions';
import * as api from '../services/api';

function* runRequestSchedules(action) {
    const { res, error } = yield call(api.fetchSchedules, action.payload);
    if (res && !error) {
        yield put(successSchedules(res));
    } else {
        yield put(failureSchedules(error));
    }
}

function* handleRequestSchedules() {
    yield takeEvery(REQUEST_SCHEDULES, runRequestSchedules);
}

export default function* rootSaga() {
    yield fork(handleRequestSchedules);
}