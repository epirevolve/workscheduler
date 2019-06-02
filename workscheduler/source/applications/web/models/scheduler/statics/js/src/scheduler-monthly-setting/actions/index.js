import * as actionTypes from '../actionTypes';

export const changeRequire = (day, categoryId, require) => ({
    type: 'CHANGE_REQUIRE',
    day,
    categoryId,
    require
})

export const changeIsHoliday = (day, isHoliday) => ({
    type: 'CHANGE_IS_HOLIDAY',
    day,
    isHoliday
})

export const changeMonthlyHoliday = (count) => ({
    type: 'CHANGE_MONTHLY_HOLIDAY',
    count
})

export const changeFixedScheduleTitle = (id, title) => ({
    type: 'CHANGE_FIXED_SCHEDULE_TITLE',
    id,
    title
})

export const changeFixedScheduleDate = (id, date) => ({
    type: 'CHANGE_FIXED_SCHEDULE_DATE',
    id,
    date
})

export const changeFixedScheduleAtFrom = (id, atFrom) => ({
    type: 'CHANGE_FIXED_SCHEDULE_AT_FROM',
    id,
    atFrom
})

export const changeFixedScheduleAtTo = (id, atTo) => ({
    type: 'CHANGE_FIXED_SCHEDULE_AT_TO',
    id,
    atTo
})

export const changeFixedScheduleParticipant = (id, participant) => ({
    type: 'CHANGE_FIXED_SCHEDULE_PARTICIPANT',
    id,
    participant
})

export const addFixedSchedule = () => ({
    type: 'ADD_FIXED_SCHEDULE'
})

export const removeFixedSchedule = (id) => ({
    type: 'REMOVE_FIXED_SCHEDULE',
    id
})

export const updateMonthlySetting = (monthlySetting) = ({
    type: actionTypes.UPDATE_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const publicMonthlySetting = (monthlySetting) = ({
    type: actionTypes.PUBLIC_MONTHLY_SETTING,
    payload: { monthlySetting }
});