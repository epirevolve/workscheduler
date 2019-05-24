import { ActionType } from '../actions';

const ui = (state = {}, action) => {
    switch (action.type) {
        case ActionType.requestSchedules:
            return {...state,
                isLoading: true,
            };
        case ActionType.fetchSchedules:
        case ActionType.changeScheduleOf:
            return {...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export default ui;