import * as actionTypes from '../actionTypes';

export const addUser = (user) => ({
    type: actionTypes.APPEND_USER,
    user
});

export const editUser = (user) => ({
    type: actionTypes.EDIT_USER,
    user
});

export const activateUser = (id) => ({
    type: actionTypes.ACTIVATE_USER,
    id
});

export const inactivateUser = (id) => ({
    type: actionTypes.INACTIVATE_USER,
    id
});

export const openDialogToAppend = () => ({
    type: actionTypes.OPEN_DIALOG_APPEND
});

export const openDialogToEdit = (user) => ({
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