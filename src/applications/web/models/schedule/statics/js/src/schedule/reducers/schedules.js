import * as actionTypes from '../actionTypes';

const schedules = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_SCHEDULES:
            return {...state,
                daySettings: payload.daySettings,
                schedules: payload.schedules,
                totals: payload.totals,
                isPublished: payload.isPublished,
            };
        case actionTypes.CHANGE_SCHEDULE_OF:
            return {...state,
                scheduleOf: payload.scheduleOf
            };
        default:
            return state;
    }
};

export default schedules;