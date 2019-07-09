import * as actionTypes from '../actionTypes';

import base from "uiReducer";

const ui = (state = { isProgressing: false }, action) => {
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                dialogOpen: true,
                isAppend: true,
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                dialogOpen: true,
                isAppend: false
            };
        case actionTypes.CLOSE_DIALOG:
            return { ...state,
                dialogOpen: false
            };
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
            return base(state, action);
    }
};

export default ui;