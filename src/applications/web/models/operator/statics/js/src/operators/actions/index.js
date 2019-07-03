import * as actionTypes from '../actionTypes';

export const openDialogToEdit = (operator) => ({
    type: actionTypes.OPEN_DIALOG_EDIT,
    payload: { operator }
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changeSkill = (skill) => ({
    type: actionTypes.CHANGE_SKILL,
    payload: { skill }
});

export const changeOjt = (operator) => ({
    type: actionTypes.CHANGE_OJT,
    payload: { operator }
});

export const startSaveOperator = (operator) => ({
    type: actionTypes.START_SAVE_OPERATOR,
    payload: { operator }
});

export const successSaveOperator = (operator) => ({
    type: actionTypes.SUCCESS_SAVE_OPERATOR,
    payload: { operator }
});

export const failureSaveOperator = () => ({
    type: actionTypes.FAILURE_SAVE_OPERATOR
});