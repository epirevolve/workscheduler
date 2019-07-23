import * as actionTypes from "../actionTypes";

const calendar = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_FETCH_MONTHLY_SETTING:
            return { ...state, ...payload.monthlySetting };
        case actionTypes.SUCCESS_UPDATE_MONTHLY_SETTING: {
            return { ...state, ...payload.monthlySetting };
        }
        case actionTypes.SUCCESS_REMOVE_REQUEST:
            return { ...state,
                days: state.days.map((x) => ({ ...x,
                    requests: x.requests.filter((y) => y.id != payload.id)
                }))
            };
        default:
            return state;
    }
};

export default calendar;