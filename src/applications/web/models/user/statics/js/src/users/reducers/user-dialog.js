const dataset = document.querySelector('script[src*="users"]').dataset;
const teams = JSON.parse(dataset.teams);

const dialog = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG_APPEND':
            return {...state,
                isOpen: true,
                id: '',
                loginId: '',
                name: '',
                team: teams[0],
                isAdmin: false,
                isOperator: false
            };
        case 'OPEN_DIALOG_EDIT':
            return {...state,
                isOpen: true,
                id: action.user.id,
                loginId: action.user.loginId,
                name: action.user.name,
                team: action.user.team,
                isAdmin: action.user.isAdmin,
                isOperator: action.user.isOperator
            };
        case 'CLOSE_DIALOG':
            return {...state,
                isOpen: false
            };
        case 'CHANGE_LOGIN_ID':
            return {...state,
                loginId: action.text
            };
        case 'CHANGE_NAME':
            return {...state,
                name: action.text
            };
        case 'CHANGE_TEAM':
            return {...state,
                team: action.obj
            };
        case 'CHANGE_IS_ADMIN':
            return {...state,
                isAdmin: action.isChecked
            };
        case 'CHANGE_IS_OPERATOR':
            return {...state,
                isOperator: action.isChecked
            };
        default:
            return state;
    }
};

export default dialog;