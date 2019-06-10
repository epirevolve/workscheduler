import { CHANGE_MAIN_TEAM } from '../actionTypes';

export const changeTeam = (team) => ({
    type: CHANGE_MAIN_TEAM,
    payload: { team }
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