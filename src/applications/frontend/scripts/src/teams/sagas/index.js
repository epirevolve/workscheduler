import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';

function *runAppendTeam(action) {
    const { res, error } = yield call(api.appendTeam, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successAppendTeam(JSON.parse(res.text))),
            put(showSnackbar('Succeed to append a team')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureAppendTeam()),
            put(showSnackbar('Sorry... we had failed to append a team'))
        ]);
    }
}

function *handleAppendTeam() {
    yield takeEvery(actionTypes.START_APPEND_TEAM, runAppendTeam);
}

function *runUpdateTeam(action) {
    const { res, error } = yield call(api.updateTeam, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successUpdateTeam(JSON.parse(res.text))),
            put(showSnackbar('Succeed to update a team')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateTeam()),
            put(showSnackbar('Sorry... we had failed to update a team'))
        ]);
    }
}

function *handleUpdateTeam() {
    yield takeEvery(actionTypes.START_UPDATE_TEAM, runUpdateTeam);
}

function *runRemoveTeam(action) {
    const { error } = yield call(api.removeTeam, action.payload);
    if (!error) {
        yield all([
            put(actions.successRemoveTeam(action.payload.id)),
            put(showSnackbar('Succeed to remove a team')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureRemoveTeam()),
            put(showSnackbar('Sorry... we had failed to remove a team'))
        ]);
    }
}

function *handleRemoveTeam() {
    yield takeEvery(actionTypes.START_REMOVE_TEAM, runRemoveTeam);
}

export default function *rootSaga() {
    yield all([
        fork(handleAppendTeam),
        fork(handleUpdateTeam),
        fork(handleRemoveTeam)
    ]);
}