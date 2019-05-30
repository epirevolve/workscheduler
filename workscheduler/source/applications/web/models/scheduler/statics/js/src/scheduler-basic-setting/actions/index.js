export const changeCertifiedSkill = (checked) => ({
    type: 'CHANGE_CERTIFIED_SKILL',
    checked
})

export const changeNotCertifiedSkill = (checked) => ({
    type: 'CHANGE_NOT_CERTIFIED_SKILL',
    checked
})

export const changeWorkCategoryTitle = (id, text) => ({
    type: 'CHANGE_WORK_CATEGORY_TITLE',
    id,
    text
})

export const changeWorkCategoryAtFrom = (id, time) => ({
    type: 'CHANGE_WORK_CATEGORY_AT_FROM',
    id,
    time
})

export const changeWorkCategoryAtTo = (id, time) => ({
    type: 'CHANGE_WORK_CATEGORY_AT_TO',
    id,
    time
})

export const changeWorkCategoryWeekDayRequire = (id, count) => ({
    type: 'CHANGE_WORK_CATEGORY_WEEK_DAY_REQUIRE',
    id,
    count
})

export const changeWorkCategoryWeekDayMax = (id, count) => ({
    type: 'CHANGE_WORK_CATEGORY_WEEK_DAY_MAX',
    id,
    count
})

export const changeWorkCategoryHolidayRequire = (id, count) => ({
    type: 'CHANGE_WORK_CATEGORY_HOLIDAY_REQUIRE',
    id,
    count
})

export const changeWorkCategoryHolidayMax = (id, count) => ({
    type: 'CHANGE_WORK_CATEGORY_HOLIDAY_MAX',
    id,
    count
})

export const changeWorkCategoryRestDays = (id, count) => ({
    type: 'CHANGE_WORK_CATEGORY_REST_DAYS',
    id,
    count
})

export const changeWorkCategoryMaxTimes = (id, count) => ({
    type: 'CHANGE_WORK_CATEGORY_MAX_TIMES',
    id,
    count
})

export const changeWorkCategoryWeekDayOperator = (id, operator) => ({
    type: 'CHANGE_WORK_CATEGORY_WEEK_DAY_OPERATOR',
    id,
    operator
})

export const changeWorkCategoryHolidayOperator = (id, operator) => ({
    type: 'CHANGE_WORK_CATEGORY_HOLIDAY_OPERATOR',
    id,
    operator
})

export const changeWorkCategoryEssentialSkill = (id, skill) => ({
    type: 'CHANGE_WORK_CATEGORY_ESSENTIAL_SKILL',
    id,
    skill
})

export const changeWorkCategoryExclusiveOperator = (id, operator) => ({
    type: 'CHANGE_WORK_CATEGORY_EXCLUSIVE_OPERATOR',
    id,
    operator
})

export const changeWorkCategoryImpossibleOperator = (id, operator) => ({
    type: 'CHANGE_WORK_CATEGORY_IMPOSSIBLE_OPERATOR',
    id,
    operator
})

export const addWorkCategory = () => ({
    type: 'ADD_WORK_CATEGORY'
})

export const removeWorkCategory = (id) => ({
    type: 'REMOVE_WORK_CATEGORY',
    id
})