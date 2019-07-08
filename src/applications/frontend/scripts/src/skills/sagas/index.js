import { put, all, call, fork, takeEvery } from 'redux-saga/effects';

import { showSnackbar } from 'snackbarActions';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';

function *runAppendSkill(action) {
    const { res, error } = yield call(api.appendSkill, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successAppendSkill(JSON.parse(res.text))),
            put(showSnackbar('Succeed to append a skill')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureAppendSkill()),
            put(showSnackbar('Sorry... we had failed to append a skill'))
        ]);
    }
}

function *handleAppendSkill() {
    yield takeEvery(actionTypes.START_APPEND_SKILL, runAppendSkill);
}

function *runUpdateSkill(action) {
    const { res, error } = yield call(api.updateSkill, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successUpdateSkill(JSON.parse(res.text))),
            put(showSnackbar('Succeed to update a skill')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureUpdateSkill()),
            put(showSnackbar('Sorry... we had failed to update a skill'))
        ]);
    }
}

function *handleUpdateSkill() {
    yield takeEvery(actionTypes.START_UPDATE_SKILL, runUpdateSkill);
}

function *runRemoveSkill(action) {
    const { error } = yield call(api.removeSkill, action.payload);
    if (!error) {
        yield all([
            put(actions.successRemoveSkill(action.payload.id)),
            put(showSnackbar('Succeed to remove a skill')),
            put(actions.closeDialog())
        ]);
    } else {
        yield all([
            put(actions.failureRemoveSkill()),
            put(showSnackbar('Sorry... we had failed to remove a skill'))
        ]);
    }
}

function *handleRemoveSkill() {
    yield takeEvery(actionTypes.START_REMOVE_SKILL, runRemoveSkill);
}

export default function *rootSaga() {
    yield all([
        fork(handleAppendSkill),
        fork(handleUpdateSkill),
        fork(handleRemoveSkill)
    ]);
}