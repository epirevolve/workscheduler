import * as pageActions from '../actions/page';

const dialog = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case pageActions.OPEN_DIALOG_APPEND:
            return { ...state,
                dialogOpen: true,
                isAppend: true,
            };
        case pageActions.OPEN_DIALOG_UPDATE:
            return { ...state,
                dialogOpen: true,
                isAppend: false
            };
        case pageActions.CLOSE_DIALOG:
            return { ...state,
                dialogOpen: false
            };
        default:
            return state;
    }
};

export default dialog;