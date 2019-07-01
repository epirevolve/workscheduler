import * as actionTypes from '../actionTypes';

const dataset = document.querySelector('script[src*="users"]').dataset;
const teams = JSON.parse(dataset.teams);

const dialog = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return {...state,
                id: '',
                loginId: '',
                name: '',
                team: teams[0],
                isAdmin: false,
                isOperator: false,
                isInactivated: false,
            };
        case actionTypes.OPEN_DIALOG_EDIT:
            return {...state,
                id: action.user.id,
                loginId: action.user.loginId,
                name: action.user.name,
                team: action.user.team,
                isAdmin: action.user.isAdmin,
                isOperator: action.user.isOperator,
                isInactivated: action.user.isInactivated,
            };
        case actionTypes.CHANGE_LOGIN_ID:
            return {...state,
                loginId: action.text
            };
        case actionTypes.CHANGE_NAME:
            return {...state,
                name: action.text
            };
        case actionTypes.CHANGE_TEAM:
            return {...state,
                team: action.obj
            };
        case actionTypes.CHANGE_IS_ADMIN:
            return {...state,
                isAdmin: action.isChecked
            };
        case actionTypes.CHANGE_IS_OPERATOR:
            return {...state,
                isOperator: action.isChecked
            };
        default:
            return state;
    }
};

export default dialog;