export const changeVacationTitle = (id, text) => ({
    type: 'CHANGE_VACATION_TITLE',
    text
})

export const changeVacationDate = (id, date) => ({
    type: 'CHANGE_VACATION_DATE',
    date
})

export const changeVacationDays = (id, text) => ({
    type: 'CHANGE_VACATION_DAYS',
    text
})

export const addVacation = () => ({
    type: 'ADD_VACATION'
})

export const removeVacation = (id) => ({
    type: 'REMOVE_VACATION',
    id
})