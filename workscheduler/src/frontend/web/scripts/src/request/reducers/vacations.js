import * as actionTypes from "../actionTypes";

const vacations = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_FETCH_VACATIONS:
            return [...payload.vacations];
        default:
            return state;
    }
};

export default vacations;