import * as actionTypes from '../actionTypes';

const dataset = document.querySelector('script[src*="users"]').dataset;
const teams = JSON.parse(dataset.teams);

const dialog = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: payload.uuid,
                loginId: '',
                name: '',
                team: teams[0],
                role: { _value_: 3 },
                isInactivated: false,
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                id: payload.user.id,
                loginId: payload.user.loginId,
                name: payload.user.name,
                team: payload.user.team,
                role: payload.user.role,
                isInactivated: payload.user.isInactivated,
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