import moment from 'moment';

export const addRequest = (scheduleOf, request) => ({
    type: 'APPEND_REQUEST',
    scheduleOf,
    request
})

export const removeRequest = (id) => ({
    type: 'REMOVE_REQUEST',
    id
})

export const openDialogToAppend = (atFrom, atTo) => ({
    type: 'OPEN_DIALOG_APPEND',
    request: Object.assign({},
        {atFrom: moment(atFrom), atTo: moment(atTo)})
})

export const openDialogToEdit = (request) => ({
    type: 'OPEN_DIALOG_EDIT',
    request: Object.assign({}, request,
        {atFrom: moment(request.atFrom), atTo: moment(request.atTo)})
})

export const closeDialog = () => ({
    type: 'CLOSE_DIALOG'
})

export const changeTitle = (text) => ({
    type: 'CHANGE_TITLE',
    text
})

export const changeNote = (text) => ({
    type: 'CHANGE_NOTE',
    text
})

export const changeDate = ([atFrom, atTo]) => ({
    type: 'CHANGE_DATE',
    atFrom,
    atTo
})