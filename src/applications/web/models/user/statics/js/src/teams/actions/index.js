export const addTeam = (team) => ({
    type: 'APPEND_TEAM',
    team
});

export const editTeam = (team) => ({
    type: 'EDIT_TEAM',
    team
});

export const removeTeam = (id) => ({
    type: 'REMOVE_TEAM',
    id
});

export const openDialogToAppend = () => ({
    type: 'OPEN_DIALOG_APPEND'
});

export const openDialogToEdit = (team) => ({
    type: 'OPEN_DIALOG_EDIT',
    team
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