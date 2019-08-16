import * as actionTypes from '../actionTypes';

const vacations = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_FETCH_SCHEDULER:
            return { ...state,
                ...payload.scheduler
            };
        case actionTypes.SUCCESS_UPDATE_SCHEDULER:
            return { ...state,
                ...payload.scheduler
            };
        case actionTypes.SUCCESS_REMOVE_VACATION:
                return { ...state,
                    vacations: state.vacations.filter((x) => x.id != payload.id)
                };
        default:
            return state;
    }
};

export default vacations;