import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';

function *runUpdateMonthlySetting(action) {
    const { error } = yield call(api.updateMonthlySetting, action.payload);
    if (!error) {
        yield all([
            put(actions.successMonthlySettingUpdate()),
            put(showSnackbar('Succeed to update monthly setting'))
        ]);
    } else {
        yield all([
            put(actions.failureMonthlySettingUpdate()),
            put(showSnackbar('Sorry... we had failed to update monthly setting'))
        ]);
    }
}

function *handleUpdateMonthlySetting() {
    yield takeEvery(actionTypes.START_UPDATE_MONTHLY_SETTING, runUpdateMonthlySetting);
}

function *runPublicMonthlySetting(action) {
    const { error } = yield call(api.publicMonthlySetting, action.payload);
    if (!error) {
        yield all([
            put(actions.successMonthlySettingPublic()),
            put(showSnackbar('Succeed to public monthly setting'))
        ]);
    } else {
        yield all([
            put(actions.failureMonthlySettingPublic()),
            put(showSnackbar('Sorry... we had failed to public monthly setting'))
        ]);
    }
}

function *handlePublicMonthlySetting() {
    yield takeEvery(actionTypes.START_PUBLIC_MONTHLY_SETTING, runPublicMonthlySetting);
}

export default function *rootSaga() {
    yield all([
        fork(handleUpdateMonthlySetting),
        fork(handlePublicMonthlySetting)
    ]);
}