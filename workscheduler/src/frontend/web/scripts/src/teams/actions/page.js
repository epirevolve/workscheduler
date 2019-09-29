export const OPEN_DIALOG_APPEND = Symbol();
export const OPEN_DIALOG_UPDATE = Symbol();
export const CLOSE_DIALOG = Symbol();

export const CHANGE_NAME = Symbol();
export const CHANGE_NOTE = Symbol();

import { getUuid } from 'commonApi';

export const openDialogToAppend = async () => {
    const uuid = await getUuid();
    return {
        type: OPEN_DIALOG_APPEND,
        payload: { uuid }
    };
};

export const openDialogToUpdate = (team) => ({
    type: OPEN_DIALOG_UPDATE,
    payload: { team }
});

export const closeDialog = () => ({
    type: CLOSE_DIALOG
});

export const changeName = (text) => ({
    type: CHANGE_NAME,
    payload: { text }
});

export const changeNote = (text) => ({
    type: CHANGE_NOTE,
    payload: { text }
});