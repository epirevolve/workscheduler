import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';
import { showSnackbar } from 'snackbarActions';

function *runUpdateOpeartor(action) {
    const { error } = yield call(api.updateOperator, action.payload);
    if (!error) {
        yield all([
            put(actions.successUpdateOperator()),
            put(showSnackbar('Succeed to update operator'))
        ]);
    } else {
        yield all([
            put(actions.failureUpdateOperator()),
            put(showSnackbar('Sorry... we had failed to update operator'))
        ]);
    }
}

export function *handleUpdateOperator() {
    yield takeEvery(actionTypes.START_UPDATE_OPERATOR, runUpdateOpeartor);
}

export default function *rootSaga() {
    yield all([
        fork(handleUpdateOperator),
    ]);
}