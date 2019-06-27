import * as actionTypes from '../actionTypes';

const dialog = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return {...state,
                dialogOpen: true
            };
        case actionTypes.OPEN_DIALOG_EDIT:
            return {...state,
                dialogOpen: true
            };
        case actionTypes.CLOSE_DIALOG:
                return {...state,
                    dialogOpen: false
                };
        default:
            return state;
    }
};

export default dialog;