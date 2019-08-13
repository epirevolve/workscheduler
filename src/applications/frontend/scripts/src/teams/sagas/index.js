import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as pageActions from '../actions/page';
import * as apiActions from '../actions/api';
import * as api from '../services/api';

function *runAppendTeam(action) {
    const { error } = yield call(api.appendTeam, action.payload);
    if (!error) {
        yield all([
            put(apiActions.successAppendTeam(action.payload.team)),
            put(showSnackbar('Succeed to append a team')),
            put(pageActions.closeDialog())
        ]);
    } else {
        yield all([
            put(apiActions.failureAppendTeam()),
            put(showSnackbar('Sorry... we had failed to append a team'))
        ]);
    }
}

function *handleAppendTeam() {
    yield takeEvery(apiActions.START_APPEND_TEAM, runAppendTeam);
}

function *runUpdateTeam(action) {
    const { error } = yield call(api.updateTeam, action.payload);
    if (!error) {
        yield all([
            put(apiActions.successUpdateTeam(action.payload.team)),
            put(showSnackbar('Succeed to update a team')),
            put(pageActions.closeDialog())
        ]);
    } else {
        yield all([
            put(apiActions.failureUpdateTeam()),
            put(showSnackbar('Sorry... we had failed to update a team'))
        ]);
    }
}

function *handleUpdateTeam() {
    yield takeEvery(apiActions.START_UPDATE_TEAM, runUpdateTeam);
}

function *runRemoveTeam(action) {
    const { error } = yield call(api.removeTeam, action.payload);
    if (!error) {
        yield all([
            put(apiActions.successRemoveTeam(action.payload.id)),
            put(showSnackbar('Succeed to remove a team')),
            put(pageActions.closeDialog())
        ]);
    } else {
        yield all([
            put(apiActions.failureRemoveTeam()),
            put(showSnackbar('Sorry... we had failed to remove a team'))
        ]);
    }
}

function *handleRemoveTeam() {
    yield takeEvery(apiActions.START_REMOVE_TEAM, runRemoveTeam);
}

export default function *rootSaga() {
    yield all([
        fork(handleAppendTeam),
        fork(handleUpdateTeam),
        fork(handleRemoveTeam)
    ]);
}