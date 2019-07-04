import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';
import { showSnackbar } from 'snackbarActions';

function *runAppendUser(action) {
    const { res, error } = yield call(api.appendUser, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successAppendUser(JSON.parse(res.text))),
            put(actions.closeDialog()),
            put(showSnackbar('Succeed to append user', 'success')),
            put(showSnackbar('New password is p + his/her login id. Please change it.'))
        ]);
    } else {
        yield all([
            put(actions.failureAppendUser()),
            put(showSnackbar('Sorry... we had failed to append user'))
        ]);
    }
}

export function *handleAppendUser() {
    yield takeEvery(actionTypes.START_APPEND_OPERATOR, runAppendUser);
}

function *runUpdateUser(action) {
    const { res, error } = yield call(api.udpateUser, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successUpdateUser(JSON.parse(res.text))),
            put(actions.closeDialog()),
            put(showSnackbar('Succeed to update user', 'success')),
        ]);
    } else {
        yield all([
            put(actions.failureUpdateUser()),
            put(showSnackbar('Sorry... we had failed to update user'))
        ]);
    }
}

export function *handleUpdateUser() {
    yield takeEvery(actionTypes.START_UPDATE_USER, runUpdateUser);
}

function *runActicateUser(action) {
    const { error } = yield call(api.activateUser, action.payload);
    if (!error) {
        yield all([
            put(actions.successActivateUser(action.payload.id)),
            put(actions.closeDialog()),
            put(showSnackbar('Succeed to activate user', 'success')),
        ]);
    } else {
        yield all([
            put(actions.failureActivateUser()),
            put(showSnackbar('Sorry... we had failed to activate user'))
        ]);
    }
}

export function *handleActivateUser() {
    yield takeEvery(actionTypes.START_ACTIVATE_USER, runActicateUser);
}

function *runInactivateUser(action) {
    const { error } = yield call(api.inactivateUser, action.payload);
    if (!error) {
        yield all([
            put(actions.successInactivateUser(action.payload.id)),
            put(actions.closeDialog()),
            put(showSnackbar('Succeed to inactivate user', 'success')),
        ]);
    } else {
        yield all([
            put(actions.failureInactivateUser()),
            put(showSnackbar('Sorry... we had failed to inactivate user'))
        ]);
    }
}

export function *handleInactivateUser() {
    yield takeEvery(actionTypes.START_INACTIVATE_USER, runInactivateUser);
}

function *runResetPassword(action) {
    const { error } = yield call(api.resetPassword, action.payload);
    if (!error) {
        yield all([
            put(actions.successResetPassword(action.payload.id)),
            put(actions.closeDialog()),
            put(showSnackbar('Succeed to reset password', 'success')),
        ]);
    } else {
        yield all([
            put(actions.failureResetPassword()),
            put(showSnackbar('Sorry... we had failed to reset password'))
        ]);
    }
}

export function *handleResetPassword() {
    yield takeEvery(actionTypes.START_RESET_PASSWORD, runResetPassword);
}

export default function *rootSaga() {
    yield all([
        fork(handleAppendUser),
        fork(handleUpdateUser),
        fork(handleActivateUser),
        fork(handleInactivateUser),
        fork(handleResetPassword),
    ]);
}