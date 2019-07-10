import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as uiActions from 'uiActions';
import * as api from '../services/api';

export function *runFetchMonthlySetting(action) {
    const { res, error } = yield call(api.fetchMonthlySetting, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successFetchMonthlySetting(JSON.parse(res.text))),
            put(uiActions.onGoing())
        ]);
    } else {
        yield all([
            put(actions.failureFetchMonthlySetting()),
            put(uiActions.onGoing())
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