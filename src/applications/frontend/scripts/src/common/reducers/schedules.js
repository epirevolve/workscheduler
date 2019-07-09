import * as actionTypes from '../actionTypes';

const schedules = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_SCHEDULES:
            return { ...state,
                daySettings: payload.schedules.daySettings,
                schedules: payload.schedules.schedules || {},
                workCategories: payload.workCategories,
                availableSigns: payload.availableSigns,
                isPublished: payload.schedules ? payload.schedules.isPublished : false,
            };
        case actionTypes.CHANGE_SCHEDULE_OF:
            return { ...state,
                scheduleOf: payload.scheduleOf
            };
        default:
            return state;
    }
};

export const initValue = {
    daySettings: [],
    schedules: {},
    scheduleOf: new Date().toYearMonthFormatString()
};

export default schedules;