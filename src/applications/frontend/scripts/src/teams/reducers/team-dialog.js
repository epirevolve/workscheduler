import * as actionTypes from "../actionTypes";

const dialog = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: payload.uuid,
                name: '',
                note: ''
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                id: payload.team.id,
                name: payload.team.name,
                note: payload.team.note
            };
        case actionTypes.CHANGE_NAME:
            return { ...state,
                name: payload.text
            };
        case actionTypes.CHANGE_NOTE:
            return { ...state,
                note: payload.text
            };
        default:
            return state;
    }
};

export default dialog;