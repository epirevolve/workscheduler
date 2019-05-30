export const editOperator = (operator) => ({
    type: 'EDIT_OPERATOR',
    operator
})

export const openDialogToEdit = (operator) => ({
    type: 'OPEN_DIALOG_EDIT',
    operator
})

export const closeDialog = () => ({
    type: 'CLOSE_DIALOG'
})

export const changeSkill = (skill) => ({
    type: 'CHANGE_SKILL',
    skill
})

export const changeOjt = (operator) => ({
    type: 'CHANGE_OJT',
    operator
})