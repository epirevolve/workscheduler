import base from '../../schedule/reducers/schedules';

import * as actionAppendedTypes from '../../schedule-admin/actionTypes';

const schedules = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionAppendedTypes.CHANGE_WORK_CATEGORY:{
            const { operator, day, daySetting, category, workCategories } = action.payload;
            const oldCategoryName = state.schedules.find((x) => x.operator.id == action.operator.id)
                .schedule.find((x) => x.day == action.day).name;
            if (oldCategoryName == action.category) return state;

            return {...state,
                schedules: state.schedules.map((x) => {
                    if (x.operator.id != action.operator.id) return x;
                    return {...x,
                        totals: x.totals.map((y) => {
                            if (y.workCategory.title == action.category)
                                return {...y, total: y.total+1};
                            else if (y.workCategory.title == oldCategoryName)
                                return {...y, total: y.total-1};
                            else
                                return y;
                        }),
                        schedule: x.schedule.map((y) => {
                            if (y.day != action.day) return y;
                            return {...y, name: action.category};
                        })
                    };
                }),
                totals: state.totals.map((x) => {
                    if (x.workCategory.title == action.category) {
                        return {...x,
                            totals: x.totals.map((y) => {
                                if (y.day != action.day) return y;
                                const newCount = y.count+1;
                                return {...y, count: newCount};
                            })
                        };
                    }
                    else if (x.workCategory.title == oldCategoryName) {
                        return {...x,
                            totals: x.totals.map((y) => {
                                if (y.day != action.day) return y;
                                const newCount = y.count-1;
                                return {...y, count: newCount};
                            })
                        };
                    }
                    else
                        return x;
                })
            };
        }
        default:
            return base(state, action);
    }
};

export default schedules;