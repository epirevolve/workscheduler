import * as actionTypes from '../actionTypes';

export const changeRequire = (day, categoryId, require) => ({
    type: 'CHANGE_REQUIRE',
    day,
    categoryId,
    require
});

export const changeIsHoliday = (day, isHoliday) => ({
    type: 'CHANGE_IS_HOLIDAY',
    day,
    isHoliday
});

export const changeMonthlyHoliday = (count) => ({
    type: 'CHANGE_MONTHLY_HOLIDAY',
    count
});

export const changeFixedScheduleTitle = (id, title) => ({
    type: 'CHANGE_FIXED_SCHEDULE_TITLE',
    id,
    title
});

export const changeFixedScheduleDate = (id, date) => ({
    type: 'CHANGE_FIXED_SCHEDULE_DATE',
    id,
    date
});

export const changeFixedScheduleAtFrom = (id, atFrom) => ({
    type: 'CHANGE_FIXED_SCHEDULE_AT_FROM',
    id,
    atFrom
});

export const changeFixedScheduleAtTo = (id, atTo) => ({
    type: 'CHANGE_FIXED_SCHEDULE_AT_TO',
    id,
    atTo
});

export const changeFixedScheduleParticipant = (id, participant) => ({
    type: 'CHANGE_FIXED_SCHEDULE_PARTICIPANT',
    id,
    participant
});

export const addFixedSchedule = () => ({
    type: 'ADD_FIXED_SCHEDULE'
});

export const removeFixedSchedule = (id) => ({
    type: 'REMOVE_FIXED_SCHEDULE',
    id
});

export const startSaveMonthlySetting = (monthlySetting) => ({
    type: actionTypes.START_UPDATE_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const startPublicMonthlySetting = (monthlySetting) => ({
    type: actionTypes.START_PUBLIC_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const successMonthlySettingUpdate = () => ({
    type: actionTypes.SUCCESS_UPDATE_MONTHLY_SETTING,
    payload: { message: '' }
});

export const failureMonthlySettingUpdate = () => ({
    type: actionTypes.FAILURE_UPDATE_MONTHLY_SETTING,
    payload: { message: '' }
});

export const successMonthlySettingPublic = () => ({
    type: actionTypes.SUCCESS_PUBLIC_MONTHLY_SETTING,
    payload: { message: '' }
});

export const failureMonthlySettingPublic = () => ({
    type: actionTypes.FAILURE_PUBLIC_MONTHLY_SETTING,
    payload: { message: '' }
});