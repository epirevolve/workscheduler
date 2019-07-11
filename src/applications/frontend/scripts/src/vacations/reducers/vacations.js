import * as actionTypes from '../actionTypes';

const vacations = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_FETCH_VACATIONS:
            return payload.vacations;
        case actionTypes.SUCCESS_APPEND_VACATION:
            return state.concat([payload.vacation]);
        case actionTypes.SUCCESS_UPDATE_VACATION:
            return state.map((x) => {
                if (x.id != payload.vacation.id) return x;
                return payload.vacation;
            });
        case actionTypes.SUCCESS_REMOVE_VACATION:
            return state.filter((x) => x.id != payload.id);
        default:
            return state;
    }
};

export default vacations;