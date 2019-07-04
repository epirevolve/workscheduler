import * as actionTypes from '../actionTypes';

const ui = (state = { isProgressing: false }, action) => {
    switch (action.type) {
        case actionTypes.START_UPDATE_MONTHLY_SETTING:
        case actionTypes.START_PUBLIC_MONTHLY_SETTING:
            return { ...state,
                isProgressing: true
            };
        case actionTypes.SUCCESS_UPDATE_MONTHLY_SETTING:
        case actionTypes.FAILURE_UPDATE_MONTHLY_SETTING:
        case actionTypes.SUCCESS_PUBLIC_MONTHLY_SETTING:
        case actionTypes.FAILURE_PUBLIC_MONTHLY_SETTING:
            return { ...state,
                isProgressing: false
            };
        default:
            return state;
    }
};

export default ui;