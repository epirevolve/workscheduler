import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as uiActions from 'uiActions';
import * as api from '../services/api';

export function *runFetchMonthlySetting(action) {
    yield put(uiActions.waiting());
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
    yield takeEvery(actionTypes.START_FETCH_CALENDAR, runFetchMonthlySetting);
}

function *runAppendRequest(action) {
    const { res, error } = yield call(api.appendRequest, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successAppendRequest(JSON.parse(res.text))),
            put(showSnackbar('Succeed to append a request')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureAppendRequest()),
            put(showSnackbar('Sorry... we had failed to append a request'))
        ]);
    }
}

function *handleAppendRequest() {
    yield takeEvery(actionTypes.START_APPEND_REQUEST, runAppendRequest);
}

function *runUpdateRequest(action) {
    const { error } = yield call(api.updateRequest, action.payload);
    if (!error) {
        yield all([
            put(actions.successUpdateRequest(action.payload)),
            put(showSnackbar('Succeed to update a request')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateRequest()),
            put(showSnackbar('Sorry... we had failed to update a request'))
        ]);
    }
}

function *handleUpdateRequest() {
    yield takeEvery(actionTypes.START_UPDATE_REQUEST, runUpdateRequest);
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
        fork(handleAppendRequest),
        fork(handleUpdateRequest),
        fork(handleRemoveRequest)
    ]);
}