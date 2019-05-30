import { REQUEST_SCHEDULES, SUCCESS_SCHEDULES, FAILURE_SCHEDULES } from '../actionTypes';

const ui = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_SCHEDULES:
            return {...state,
                isLoading: true,
            };
        case SUCCESS_SCHEDULES:
            return {...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export default ui;