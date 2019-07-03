import * as actionTypes from '../actionTypes';

export const openDialogToAppend = () => ({
    type: actionTypes.OPEN_DIALOG_APPEND
});

export const openDialogToUpdate = (user) => ({
    type: actionTypes.OPEN_DIALOG_EDIT,
    user
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changeLoginId = (text) => ({
    type: actionTypes.CHANGE_LOGIN_ID,
    text
});

export const changeName = (text) => ({
    type: actionTypes.CHANGE_NAME,
    text
});

export const changeTeam = (obj) => ({
    type: actionTypes.CHANGE_TEAM,
    obj
});

export const changeIsAdmin = (isChecked) => ({
    type: actionTypes.CHANGE_IS_ADMIN,
    isChecked
});

export const changeIsOperator = (isChecked) => ({
    type: actionTypes.CHANGE_IS_OPERATOR,
    isChecked
});

export const startAppendUser = (user) => ({
    type: actionTypes.START_APPEND_USER,
    payload: { user }
});

export const successAppendUser = (user) => ({
    type: actionTypes.SUCCESS_APPEND_USER,
    payload: { user }
});

export const failureAppendUser = () => ({
    type: actionTypes.FAILURE_APPEND_USER,
});

export const startUpdateUser = (user) => ({
    type: actionTypes.START_UPDATE_USER,
    payload: { user }
});

export const successUpdateUser = (user) => ({
    type: actionTypes.SUCCESS_UPDATE_USER,
    payload: { user }
});

export const failureUpdateUser = () => ({
    type: actionTypes.FAILURE_UPDATE_USER,
});

export const startActivateUser = (id) => ({
    type: actionTypes.START_ACTIVATE_USER,
    payload: { id }
});

export const successActivateUser = (id) => ({
    type: actionTypes.SUCCESS_ACTIVATE_USER,
    payload: { id }
});

export const failureActivateUser = () => ({
    type: actionTypes.FAILURE_ACTIVATE_USER,
});

export const startInactivateUser = (id) => ({
    type: actionTypes.START_INACTIVATE_USER,
    payload: { id }
});

export const successInactivateUser = (id) => ({
    type: actionTypes.SUCCESS_INACTIVATE_USER,
    payload: { id }
});

export const failureInactivateUser = () => ({
    type: actionTypes.FAILURE_INACTIVATE_USER,
});

export const startResetPassword = (id) => ({
    type: actionTypes.START_RESET_PASSWORD,
    payload: { id }
});

export const successResetPassword = (id) => ({
    type: actionTypes.SUCCESS_RESET_PASSWORD,
    payload: { id }
});

export const failureResetPassword = () => ({
    type: actionTypes.FAILURE_RESET_PASSWORD,
});