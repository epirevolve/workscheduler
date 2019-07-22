import * as actionTypes from "../actionTypes";

const calendar = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_FETCH_MONTHLY_SETTING:
            return { state, ...payload.monthlySetting };
        case actionTypes.SUCCESS_UPDATE_MONTHLY_SETTING: {
            const atFromDate = new Date(action.request.atFrom).setEarliestTime();
            const atToDate = new Date(action.request.atTo).setLatestTime();
            return state.map((x) => x.map((y) => {
                    if (!y)
                        return y;
                    const date = new Date(`${action.scheduleOf}-${y.day}`);
                    if (!(atFromDate <= date && date <= atToDate))
                        return y;
                    return { ...y, requests: y.requests.concat(action.request) };
                })
            );
        }
        case actionTypes.SUCCESS_REMOVE_REQUEST:
            return state.map((x) => x.map((y) => (y)
                ? { ...y, requests: y.requests.filter((z) => z.id != action.id) }
                : y)
            );
        default:
            return state;
    }
};

export default calendar;