export const addSkill = (skill) => ({
    type: 'APPEND_SKILL',
    skill
})

export const editSkill = (skill) => ({
    type: 'EDIT_SKILL',
    skill
})

export const removeSkill = (id) => ({
    type: 'REMOVE_SKILL',
    id
})

export const openDialogToAppend = () => ({
    type: 'OPEN_DIALOG_APPEND'
})

export const openDialogToEdit = (skill) => ({
    type: 'OPEN_DIALOG_EDIT',
    skill
})

export const closeDialog = () => ({
    type: 'CLOSE_DIALOG'
})

export const changeName = (text) => ({
    type: 'CHANGE_NAME',
    text
})

export const changeScore = (score) => ({
    type: 'CHANGE_SCORE',
    score
})

export const changeIsCertified = (isChecked) => ({
    type: 'CHANGE_IS_CERTIFIED',
    isChecked
})