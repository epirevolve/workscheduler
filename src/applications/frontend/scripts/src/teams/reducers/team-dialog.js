import * as pageActions from "../actions/page";

const dialog = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case pageActions.OPEN_DIALOG_APPEND:
            return { ...state,
                id: payload.uuid,
                name: '',
                note: ''
            };
        case pageActions.OPEN_DIALOG_UPDATE:
            return { ...state,
                id: payload.team.id,
                name: payload.team.name,
                note: payload.team.note
            };
        case pageActions.CHANGE_NAME:
            return { ...state,
                name: payload.text
            };
        case pageActions.CHANGE_NOTE:
            return { ...state,
                note: payload.text
            };
        default:
            return state;
    }
};

export default dialog;