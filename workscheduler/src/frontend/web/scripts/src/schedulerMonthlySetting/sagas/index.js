import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as apiActions from '../actions/api';
import * as waitingActions from 'waitingActions';
import * as api from '../services/api';

export function *runFetchMonthlySetting(action) {
    yield put(waitingActions.waiting());
    const { res, error } = yield call(api.fetchMonthlySetting, action.payload);
    if (res && !error) {
        yield all([
            put(apiActions.successFetchMonthlySetting(JSON.parse(res.text))),
            put(waitingActions.onGoing())
        ]);
    } else {
        yield all([
            put(apiActions.failureFetchMonthlySetting()),
            put(waitingActions.onGoing())
        ]);
    }
}

function *handleFetchMonthlySetting() {
    yield takeEvery(apiActions.START_FETCH_MONTHLY_SETTING, runFetchMonthlySetting);
}

function *runUpdateMonthlySetting(action) {
    const { error } = yield call(api.updateMonthlySetting, action.payload);
    if (!error) {
        yield all([
            put(apiActions.successUpdateMonthlySetting()),
            put(showSnackbar('Succeed to update monthly setting'))
        ]);
    } else {
        yield all([
            put(apiActions.failureUpdateMonthlySetting()),
            put(showSnackbar('Sorry... we had failed to update monthly setting'))
        ]);
    }
}

function *handleUpdateMonthlySetting() {
    yield takeEvery(apiActions.START_UPDATE_MONTHLY_SETTING, runUpdateMonthlySetting);
}

function *runPublicMonthlySetting(action) {
    const { error } = yield call(api.publicMonthlySetting, action.payload);
    if (!error) {
        yield all([
            put(apiActions.successPublicMonthlySetting()),
            put(showSnackbar('Succeed to public monthly setting'))
        ]);
    } else {
        yield all([
            put(apiActions.failurePublicMonthlySetting()),
            put(showSnackbar('Sorry... we had failed to public monthly setting'))
        ]);
    }
}

function *handlePublicMonthlySetting() {
    yield takeEvery(apiActions.START_PUBLIC_MONTHLY_SETTING, runPublicMonthlySetting);
}

export default function *rootSaga() {
    yield all([
        fork(handleFetchMonthlySetting),
        fork(handleUpdateMonthlySetting),
        fork(handlePublicMonthlySetting)
    ]);
}