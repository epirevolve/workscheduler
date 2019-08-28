import * as actionTypes from '../actionTypes';

const controlTower = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_FETCH_RUNNERS:
            return { ...state,
                currentRunners: payload.currentRunners
            };
        case actionTypes.SUCCESS_FETCH_LAUNCH_HISTORIES:
            return { ...state,
                launchHistories: payload.launchHistories
            };
        default:
            return state;
    }
};

export default controlTower;