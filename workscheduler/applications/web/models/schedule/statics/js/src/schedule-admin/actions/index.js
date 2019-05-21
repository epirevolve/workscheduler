import { fetchSchedules } from '../../schedule/actions';

export const changeAffiliation = (affiliation, scheduleOf) => {
    return fetchSchedules(affiliation, scheduleOf)
        .then(action => ({...action,
            type: 'CHANGE_AFFILIATION',
            affiliation,
        }))
}

export const changeWorkCategory = (operator, day, category, workCategories) => ({
    type: 'CHANGE_WORK_CATEGORY',
    operator,
    day,
    category,
    workCategories
})