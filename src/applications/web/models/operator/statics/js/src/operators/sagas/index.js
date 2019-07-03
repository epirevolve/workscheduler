import { put, call, fork, takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as api from '../services/api';
import { showSnackbar } from 'snackbarActions';

function *runSaveOpeartor(action) {
    const { res, error } = yield call(api.saveOperator, action.payload);
    if (res && !error) {
        yield all([
            put(actions.successSaveOperator(JSON.parse(res.text))),
            put(actions.closeDialog()),
            put(showSnackbar('Succeed to update operator', 'success'))
        ]);
    } else {
        yield all([
            put(actions.failureSaveOperator()),
            put(showSnackbar('Sorry... we had failed to update operator'))
        ]);
    }
}

export function *handleSaveOperator() {
    yield takeEvery(actionTypes.START_SAVE_OPERATOR, runSaveOpeartor);
}

export default function *rootSaga() {
    yield all([
        fork(handleSaveOperator),
    ]);
}