import { SUCCESS_SCHEDULES, CHANGE_SCHEDULE_OF } from '../actionTypes';

const schedules = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case SUCCESS_SCHEDULES:
            return {...state,
                daySettings: payload.daySettings,
                schedules: payload.schedules,
                totals: payload.totals,
                isPublished: payload.isPublished,
            };
        case CHANGE_SCHEDULE_OF:
            return {...state,
                scheduleOf: payload.scheduleOf
            };
        case 'CHANGE_WORK_CATEGORY':{
            const oldCategoryName = state.schedules.find((x) => x.operator.id == action.operator.id)
            .schedule.find((x) => x.day == action.day).name;
            if (oldCategoryName == action.category) return state;

            return {...state,
                schedules: state.schedules.map((x) => {
                    if (x.operator.id != action.operator.id) return x;
                    return {...x,
                        totals: x.totals.map((y) => {
                            if (y.workCategory.title == action.category)
                                return {...y,
                                    total: y.total+1};
                            else if (y.workCategory.title == oldCategoryName)
                                return {...y,
                                    total: y.total-1};
                            else
                                return y;
                        }),
                        schedule: x.schedule.map((y) => {
                            if (y.day != action.day) return y;
                            return {...y,
                                name: action.category};
                        })
                    };
                }),
                totals: state.totals.map((x) => {
                    if (x.workCategory.title == action.category) {
                        return {...x,
                            totals: x.totals.map((y) => {
                                if (y.day != action.day) return y;
                                const newCount = y.count+1;
                                return {...y,
                                    count: newCount,
                                };
                            })
                        };
                    }
                    else if (x.workCategory.title == oldCategoryName) {
                        return {...x,
                            totals: x.totals.map((y) => {
                                if (y.day != action.day) return y;
                                const newCount = y.count-1;
                                return {...y,
                                    count: newCount,
                                };
                            })
                        };
                    }
                    else
                        return x;
                })
            };
        }
        default:
            return state;
    }
};

export default schedules;