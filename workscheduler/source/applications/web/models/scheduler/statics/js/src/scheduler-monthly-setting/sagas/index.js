import { take, put, all, call, fork, race, cancelled, takeEvery } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import { START_UPDATE_MONTHLY_SETTING, START_PUBLIC_MONTHLY_SETTING } from '../actionTypes';
import { successMonthlySettingUpdate, failureMonthlySettingUpdate,
	successMonthlySettingPublic, failureMonthlySettingPublic } from '../actions';
import * as api from '../services/api';

function* runUpdateMonthlySetting(action) {
    const { res, error } = yield call(api.updateMonthlySetting, action.payload);
    if (res && !error) {
        yield put(successMonthlySettingUpdate(res));
    } else {
        yield put(failureMonthlySettingUpdate(error));
    }
}

function* handleUpdateMonthlySetting() {
    yield takeEvery(START_UPDATE_MONTHLY_SETTING, runUpdateMonthlySetting);
}

function* runPublicMonthlySetting(action) {
    const { res, error } = yield call(api.publicMonthlySetting, action.payload);
    if (res && !error) {
        yield put(successMonthlySettingPublic(res));
    } else {
        yield put(failureMonthlySettingPublic(error));
    }
}

function* handlePublicMonthlySetting() {
    yield takeEvery(START_PUBLIC_MONTHLY_SETTING, runPublicMonthlySetting);
}

export default function* rootSaga() {
	yield all([
		fork(handleUpdateMonthlySetting),
		fork(handlePublicMonthlySetting)
	]);
}