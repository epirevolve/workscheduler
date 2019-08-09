import * as actionTypes from '../actionTypes';

const ui = (state = { isProgressing: false }, action) => {
    switch (action.type) {
        case actionTypes.START_UPDATE_SCHEDULER:
            return { ...state,
                isProgressing: true
            };
        default:
            return state;
    }
};

export default ui;