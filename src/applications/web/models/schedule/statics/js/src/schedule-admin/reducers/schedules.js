import base from '../../schedule/reducers/schedules';

import * as actionTypes from '../actionTypes';

const schedules = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.CHANGE_WORK_CATEGORY: {
            const { operator, day, daySetting, category, workCategories } = payload;
            const categoryId = workCategories.map((x) => x.title).includes(category) ?
                workCategories.find((x) => x.title == category).id : category;
            return {...state,
                schedules: {...state.schedules,
                    components: state.schedules.components.map((x) => {
                        if (x.operator.id != operator.id) return x;
                        return {...x,
                            dayWorkCategories: x.dayWorkCategories.map((y) => {
                                if (y.day != day) return y;
                                return {...y,
                                    workCategoryId: categoryId
                                };
                            })
                        };
                    })
                }
            };
        }
        case actionTypes.SUCCESS_PUBLISH_SCHEDULES:
            return {...state,
                isPublished: true
            }
        case actionTypes.SUCCESS_WITHDRAW_SCHEDULES:
            return {...state,
                isPublished: false
            }
        default:
            return base(state, action);
    }
};

export default schedules;