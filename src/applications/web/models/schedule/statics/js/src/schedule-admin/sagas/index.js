import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import { START_SAVE_SCHEDULES } from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';

import { handleRequestSchedules } from '../../schedule/sagas';

function *runSaveSchedules(action) {
    const { error } = yield call(api.saveSchedules, action.payload);
    if (!error) {
        yield put(actions.successSaveSchedules());
    } else {
        yield put(actions.failureSaveSchedules());
    }
}

export function *handleSaveSchedules() {
    yield takeEvery(START_SAVE_SCHEDULES, runSaveSchedules);
}

export default function *rootSaga() {
    yield all([
		fork(handleRequestSchedules),
		fork(handleSaveSchedules)
	]);
}