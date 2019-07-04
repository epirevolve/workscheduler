export const changeVacationTitle = (id, text) => ({
    type: 'CHANGE_VACATION_TITLE',
    id,
    text
})

export const changeVacationDate = (id, date) => ({
    type: 'CHANGE_VACATION_DATE',
    id,
    date
})

export const changeVacationDays = (id, text) => ({
    type: 'CHANGE_VACATION_NUMBER_OF_DAYS',
    id,
    text
})

export const addVacation = () => ({
    type: 'ADD_VACATION'
})

export const removeVacation = (id) => ({
    type: 'REMOVE_VACATION',
    id
})