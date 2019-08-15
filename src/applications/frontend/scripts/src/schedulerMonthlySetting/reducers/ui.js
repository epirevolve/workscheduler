import * as actionTypes from '../actionTypes';
import * as apiActions from '../actions/api';

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
        case apiActions.START_UPDATE_MONTHLY_SETTING:
        case apiActions.START_PUBLIC_MONTHLY_SETTING:
            return { ...state,
                isProgressing: true
            };
        case apiActions.SUCCESS_UPDATE_MONTHLY_SETTING:
        case apiActions.FAILURE_UPDATE_MONTHLY_SETTING:
        case apiActions.SUCCESS_PUBLIC_MONTHLY_SETTING:
        case apiActions.FAILURE_PUBLIC_MONTHLY_SETTING:
            return { ...state,
                isProgressing: false
            };
        default:
            return state;
    }
};

export default ui;