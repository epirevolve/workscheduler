export const addAffiliation = (affiliation) => ({
    type: 'APPEND_AFFILIATION',
    affiliation
})

export const editAffiliation = (affiliation) => ({
    type: 'EDIT_AFFILIATION',
    affiliation
})

export const removeAffiliation = (id) => ({
    type: 'REMOVE_AFFILIATION',
    id
})

export const openDialogToAppend = () => ({
    type: 'OPEN_DIALOG_APPEND'
})

export const openDialogToEdit = (affiliation) => ({
    type: 'OPEN_DIALOG_EDIT',
    affiliation
})

export const closeDialog = () => ({
    type: 'CLOSE_DIALOG'
})

export const changeName = (text) => ({
    type: 'CHANGE_NAME',
    text
})

export const changeNote = (text) => ({
    type: 'CHANGE_NOTE',
    text
})