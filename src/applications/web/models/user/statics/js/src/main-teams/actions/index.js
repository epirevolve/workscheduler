export const addMainTeam = (mainTeam) => ({
    type: 'APPEND_MAIN_TEAM',
    mainTeam
});

export const editMainTeam = (mainTeam) => ({
    type: 'EDIT_MAIN_TEAM',
    mainTeam
});

export const removeMainTeam = (id) => ({
    type: 'REMOVE_MAIN_TEAM',
    id
});

export const openDialogToAppend = () => ({
    type: 'OPEN_DIALOG_APPEND'
});

export const openDialogToEdit = (mainTeam) => ({
    type: 'OPEN_DIALOG_EDIT',
    mainTeam
});

export const closeDialog = () => ({
    type: 'CLOSE_DIALOG'
});

export const changeName = (text) => ({
    type: 'CHANGE_NAME',
    text
});

export const changeNote = (text) => ({
    type: 'CHANGE_NOTE',
    text
});