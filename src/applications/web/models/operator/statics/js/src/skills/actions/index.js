import * as actionTypes from '../actionTypes';

export const addSkill = (skill) => ({
    type: actionTypes.APPEND_SKILL,
    payload: {skill}
});

export const editSkill = (skill) => ({
    type: actionTypes.EDIT_SKILL,
    payload: {skill}
});

export const removeSkill = (id) => ({
    type: actionTypes.REMOVE_SKILL,
    payload: {id}
});

export const openDialogToAppend = () => ({
    type: actionTypes.OPEN_DIALOG_APPEND
});

export const openDialogToEdit = (skill) => ({
    type: actionTypes.OPEN_DIALOG_EDIT,
    payload: {skill}
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changeName = (text) => ({
    type: actionTypes.CHANGE_NAME,
    payload: {text}
});

export const changeScore = (score) => ({
    type: actionTypes.CHANGE_SCORE,
    payload: {score}
});

export const changeIsCertified = (isChecked) => ({
    type: actionTypes.CHANGE_IS_CERTIFIED,
    payload: {isChecked}
});