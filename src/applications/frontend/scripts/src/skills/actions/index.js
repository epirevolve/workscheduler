import * as actionTypes from '../actionTypes';

import { getUuid } from 'commonApi';

export const startAppendSkill = (skill) => ({
    type: actionTypes.START_APPEND_SKILL,
    payload: { skill }
});

export const successAppendSkill = (skill) => ({
    type: actionTypes.SUCCESS_APPEND_SKILL,
    payload: { skill }
});

export const failureAppendSkill = () => ({
    type: actionTypes.FAILURE_APPEND_SKILL,
});

export const startUpdateSkill = (skill) => ({
    type: actionTypes.START_UPDATE_SKILL,
    payload: { skill }
});

export const successUpdateSkill = (skill) => ({
    type: actionTypes.SUCCESS_UPDATE_SKILL,
    payload: { skill }
});

export const failureUpdateSkill = () => ({
    type: actionTypes.FAILURE_UPDATE_SKILL,
});

export const startRemoveSkill = (id) => ({
    type: actionTypes.START_REMOVE_SKILL,
    payload: { id }
});

export const successRemoveSkill = (id) => ({
    type: actionTypes.SUCCESS_REMOVE_SKILL,
    payload: { id }
});

export const failureRemoveSkill = () => ({
    type: actionTypes.FAILURE_REMOVE_SKILL
});

export const openDialogToAppend = async () => {
    const uuid = await getUuid();
    return {
        type: actionTypes.OPEN_DIALOG_APPEND,
        payload: { uuid }
    };
};

export const openDialogToUpdate = (skill) => ({
    type: actionTypes.OPEN_DIALOG_UPDATE,
    payload: { skill }
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changeName = (text) => ({
    type: actionTypes.CHANGE_NAME,
    payload: { text }
});

export const changeScore = (score) => ({
    type: actionTypes.CHANGE_SCORE,
    payload: { score: parseInt(score, 10) }
});

export const changeIsCertified = (isChecked) => ({
    type: actionTypes.CHANGE_IS_CERTIFIED,
    payload: { isChecked }
});