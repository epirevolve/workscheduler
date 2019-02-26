import moment from 'moment';

export const changeRequire = (day, categoryId, require) => ({
    type: 'CHANGE_REQUIRE',
    day,
    categoryId,
    require
})

export const changeMonthlyHoliday = (count) => ({
    type: 'CHANGE_MONTHLY_HOLIDAY',
    count
})