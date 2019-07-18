import * as actionTypes from '../actionTypes';

const dataset = document.querySelector('script[src*="users"]').dataset;
const teams = JSON.parse(dataset.teams);

const dialog = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: '',
                loginId: '',
                name: '',
                team: teams[0],
                role: 3,
                isInactivated: false,
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                id: action.user.id,
                loginId: action.user.loginId,
                name: action.user.name,
                team: action.user.team,
                role: action.user.role,
                isInactivated: action.user.isInactivated,
            };
        case actionTypes.CHANGE_LOGIN_ID:
            return { ...state,
                loginId: action.text
            };
        case actionTypes.CHANGE_NAME:
            return { ...state,
                name: action.text
            };
        case actionTypes.CHANGE_TEAM:
            return { ...state,
                team: action.obj
            };
        case actionTypes.CHANGE_ROLE:
            return { ...state,
                role: action.role
            };
        default:
            return state;
    }
};

export default dialog;