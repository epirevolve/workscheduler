import { CHANGE_MAIN_TEAM } from '../actionTypes';

export const changeAffiliation = (affiliation) => ({
    type: CHANGE_MAIN_TEAM,
    payload: { affiliation }
})

export const changeWorkCategory = (operator, day, daySetting, category, workCategories) => ({
    type: 'CHANGE_WORK_CATEGORY',
    operator,
    day,
    daySetting,
    category,
    workCategories
});

export const saveSchedules = () => ({

});