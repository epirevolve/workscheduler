import * as actionTypes from '../actionTypes';

export const startUpdateMyself = (myself) => ({
    type: actionTypes.START_UPDATE_MYSELF,
    payload: { myself }
});

export const successUpdateMyself = () => ({
    type: actionTypes.SUCCESS_UPDATE_MYSELF
});

export const failureUpdateMyself = () => ({
    type: actionTypes.FAILURE_UPDATE_MYSELF,
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changePassword = (password) => ({
    type: actionTypes.CHANGE_PASSWORD,
    payload: { password }
});

export const changeName = (name) => ({
    type: actionTypes.CHANGE_NAME,
    payload: { name }
});