import * as actionTypes from '../actionTypes';

const waiting = (state = { isLoading: true }, action) => {
    switch (action.type) {
        case actionTypes.WAITING:
            return { ...state,
                isLoading: true,
            };
        case actionTypes.ON_GOING:
            return { ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default waiting;