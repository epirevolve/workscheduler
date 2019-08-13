import * as actionTypes from '../actionTypes';

import { teams } from "../embeddedData";

const dialog = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: payload.uuid,
                loginId: '',
                password: '',
                name: '',
                team: teams[0],
                role: { _value_: 3 },
                isInactivated: false,
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                ...payload.user
            };
        case actionTypes.CHANGE_LOGIN_ID:
            return { ...state,
                loginId: payload.text
            };
        case actionTypes.CHANGE_NAME:
            return { ...state,
                name: payload.text
            };
        case actionTypes.CHANGE_TEAM:
            return { ...state,
                team: payload.team
            };
        case actionTypes.CHANGE_ROLE:
            return { ...state,
                role: payload.role
            };
        default:
            return state;
    }
};

export default dialog;