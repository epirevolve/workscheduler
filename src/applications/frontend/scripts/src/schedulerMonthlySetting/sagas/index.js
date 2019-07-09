import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as waitActions from 'waitActions';
import * as api from '../services/api';

function *runFetchMonthlySetting(action) {
    const { error } = yield call(api.updateMonthlySetting, action.payload);
    if (!error) {
        yield all([
            put(actions.successUpdateMonthlySetting()),
            put(waitActions.onGoing())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateMonthlySetting()),
            put(waitActions.onGoing())
        ]);
    }
}

function *handleFetchMonthlySetting() {
    yield takeEvery(actionTypes.START_FETCH_MONTHLY_SETTING, runFetchMonthlySetting);
}

function *runUpdateMonthlySetting(action) {
    const { error } = yield call(api.updateMonthlySetting, action.payload);
    if (!error) {
        yield all([
            put(actions.successUpdateMonthlySetting()),
            put(showSnackbar('Succeed to update monthly setting'))
        ]);
    } else {
        yield all([
            put(actions.failureUpdateMonthlySetting()),
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
            put(actions.successPublicMonthlySetting()),
            put(showSnackbar('Succeed to public monthly setting'))
        ]);
    } else {
        yield all([
            put(actions.failurePublicMonthlySetting()),
            put(showSnackbar('Sorry... we had failed to public monthly setting'))
        ]);
    }
}

function *handlePublicMonthlySetting() {
    yield takeEvery(actionTypes.START_PUBLIC_MONTHLY_SETTING, runPublicMonthlySetting);
}

export default function *rootSaga() {
    yield all([
        fork(handleFetchMonthlySetting),
        fork(handleUpdateMonthlySetting),
        fork(handlePublicMonthlySetting)
    ]);
}