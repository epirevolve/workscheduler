export const addUser = (user) => ({
    type: 'APPEND_USER',
    user
});

export const editUser = (user) => ({
    type: 'EDIT_USER',
    user
});

export const inactivateUser = (id) => ({
    type: 'INACTIVATE_USER',
    id
});

export const openDialogToAppend = () => ({
    type: 'OPEN_DIALOG_APPEND'
});

export const openDialogToEdit = (user) => ({
    type: 'OPEN_DIALOG_EDIT',
    user
});

export const closeDialog = () => ({
    type: 'CLOSE_DIALOG'
});

export const changeLoginId = (text) => ({
    type: 'CHANGE_LOGIN_ID',
    text
});

export const changeName = (text) => ({
    type: 'CHANGE_NAME',
    text
});

export const changeTeam = (obj) => ({
    type: 'CHANGE_TEAM',
    obj
});

export const changeIsAdmin = (isChecked) => ({
    type: 'CHANGE_IS_ADMIN',
    isChecked
});

export const changeIsOperator = (isChecked) => ({
    type: 'CHANGE_IS_OPERATOR',
    isChecked
});