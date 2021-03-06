import * as actionTypes from '../actionTypes';

const dialog = (state = { dialogOpen: false }, action) => {
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
        default:
            return state;
    }
};

export default dialog;