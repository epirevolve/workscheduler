import * as actionTypes from '../actionTypes';

export const openDialogToUpdate = (operator) => ({
    type: actionTypes.OPEN_DIALOG_UPDATE,
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

export const startUpdateOperator = (operator) => ({
    type: actionTypes.START_UPDATE_OPERATOR,
    payload: { operator }
});

export const successUpdateOperator = (operator) => ({
    type: actionTypes.SUCCESS_UPDATE_OPERATOR,
    payload: { operator }
});

export const failureUpdateOperator = () => ({
    type: actionTypes.FAILURE_UPDATE_OPERATOR
});