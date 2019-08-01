import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as waitingActions from 'waitingActions';
import * as api from '../services/api';

export function *runFetchMonthlySetting(action) {
    yield put(waitingActions.waiting());
    const { res, error } = yield call(api.fetchMonthlySetting, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successFetchMonthlySetting(JSON.parse(res.text))),
            put(actions.startFetchVacations(action.payload.team, action.payload.scheduleOf)),
            put(waitingActions.onGoing())
        ]);
    } else {
        yield all([
            put(actions.failureFetchMonthlySetting()),
            put(waitingActions.onGoing())
        ]);
    }
}

function *handleFetchMonthlySetting() {
    yield takeEvery(actionTypes.START_FETCH_MONTHLY_SETTING, runFetchMonthlySetting);
}

export function *runFetchVacations(action) {
    const { res, error } = yield call(api.fetchVacations, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successFetchVacations(JSON.parse(res.text)))
        ]);
    } else {
        yield all([
            put(actions.failureFetchVacations())
        ]);
    }
}

function *handleFetchVacations() {
    yield takeEvery(actionTypes.START_FETCH_VACATIONS, runFetchVacations);
}

function *runUpdateMonthlySetting(action) {
    const { error } = yield call(api.updateMonthlySetting, action.payload);
    if (!error) {
        yield all([
            put(actions.successUpdateMonthlySetting(action.payload.monthlySetting)),
            put(showSnackbar('Succeed to append a request')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateMonthlySetting()),
            put(showSnackbar('Sorry... we had failed to append a request'))
        ]);
    }
}

function *handleUpdateMonthlySetting() {
    yield takeEvery(actionTypes.START_UPDATE_MONTHLY_SETTING, runUpdateMonthlySetting);
}

function *runRemoveRequest(action) {
    const { error } = yield call(api.removeRequest, action.payload);
    if (!error) {
        yield all([
            put(actions.successRemoveRequest(action.payload.id)),
            put(showSnackbar('Succeed to remove a request')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureRemoveRequest()),
            put(showSnackbar('Sorry... we had failed to remove a request'))
        ]);
    }
}

function *handleRemoveRequest() {
    yield takeEvery(actionTypes.START_REMOVE_REQUEST, runRemoveRequest);
}

export default function *rootSaga() {
    yield all([
        fork(handleFetchMonthlySetting),
        fork(handleFetchVacations),
        fork(handleUpdateMonthlySetting),
        fork(handleRemoveRequest)
    ]);
}