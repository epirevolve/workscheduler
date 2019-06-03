import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { START_UPDATE_MONTHLY_SETTING, START_PUBLIC_MONTHLY_SETTING } from '../actionTypes';
import { successMonthlySettingUpdate, failureMonthlySettingUpdate,
	successMonthlySettingPublic, failureMonthlySettingPublic } from '../actions';
import { showSnackbar } from 'snackbarActions';
import * as api from '../services/api';

function *runUpdateMonthlySetting(action) {
    const { error } = yield call(api.updateMonthlySetting, action.payload);
    if (!error) {
        yield all([
			put(successMonthlySettingUpdate()),
			put(showSnackbar('Succeed to update monthly setting'))
		]);
    } else {
        yield all([
			put(failureMonthlySettingUpdate()),
			put(showSnackbar('Fail to update monthly setting'))
		]);
    }
}

function *handleUpdateMonthlySetting() {
    yield takeEvery(START_UPDATE_MONTHLY_SETTING, runUpdateMonthlySetting);
}

function *runPublicMonthlySetting(action) {
    const { error } = yield call(api.publicMonthlySetting, action.payload);
    if (!error) {
		yield all([
			put(successMonthlySettingPublic()),
			put(showSnackbar('Succeed to public monthly setting'))
		]);
    } else {
		yield all([
			put(failureMonthlySettingPublic()),
			put(showSnackbar('Fail to public monthly setting'))
		]);
    }
}

function *handlePublicMonthlySetting() {
    yield takeEvery(START_PUBLIC_MONTHLY_SETTING, runPublicMonthlySetting);
}

export default function *rootSaga() {
	yield all([
		fork(handleUpdateMonthlySetting),
		fork(handlePublicMonthlySetting)
	]);
}