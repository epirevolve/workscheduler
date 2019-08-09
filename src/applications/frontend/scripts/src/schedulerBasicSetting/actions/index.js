import * as actionTypes from "../actionTypes";

import { getUuid } from 'commonApi';

export const changeCertifiedSkill = (checked) => ({
    type: actionTypes.CHANGE_CERTIFIED_SKILL,
    checked
});

export const changeNotCertifiedSkill = (checked) => ({
    type: actionTypes.CHANGE_NOT_CERTIFIED_SKILL,
    checked
});

export const changeWorkCategoryTitle = (id, text) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_TITLE,
    id,
    text
});

export const changeWorkCategoryAtFrom = (id, time) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_AT_FROM,
    id,
    time
});

export const changeWorkCategoryAtTo = (id, time) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_AT_TO,
    id,
    time
});

export const changeWorkCategoryWeekDayRequire = (id, count) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_WEEK_DAY_REQUIRE,
    id,
    count
});

export const changeWorkCategoryHolidayRequire = (id, count) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_HOLIDAY_REQUIRE,
    id,
    count
});

export const changeWorkCategoryRestDays = (id, count) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_REST_DAYS,
    id,
    count
});

export const changeWorkCategoryMaxTimes = (id, count) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_MAX_TIMES,
    id,
    count
});

export const changeWorkCategoryWeekDayOperator = (id, operator) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_WEEK_DAY_OPERATOR,
    id,
    operator
});

export const changeWorkCategoryHolidayOperator = (id, operator) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_HOLIDAY_OPERATOR,
    id,
    operator
});

export const changeWorkCategoryEssentialSkill = (id, skill) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_ESSENTIAL_SKILL,
    id,
    skill
});

export const changeWorkCategoryExclusiveOperator = (id, operator) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_EXCLUSIVE_OPERATOR,
    id,
    operator
});

export const changeWorkCategoryImpossibleOperator = (id, operator) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY_IMPOSSIBLE_OPERATOR,
    id,
    operator
});

export const addWorkCategory = async () => {
    const uuid = await getUuid();
    return {
        type: actionTypes.ADD_WORK_CATEGORY,
        uuid
    };
};

export const removeWorkCategory = (id) => ({
    type: actionTypes.REMOVE_WORK_CATEGORY,
    id
});