const $script = $('script[src*="users"]');
const affiliations = $script.data('affiliations');

const dialog = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG_APPEND':
            return {...state,
                isOpen: true,
                id: '',
                loginId: '',
                name: '',
                affiliation: affiliations[0],
                isAdmin: false,
                isOperator: false
            };
        case 'OPEN_DIALOG_EDIT':
            return {...state,
                isOpen: true,
                id: action.user.id,
                loginId: action.user.loginId,
                name: action.user.name,
                affiliation: action.user.affiliation,
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
        case 'CHANGE_AFFILIATION':
            return {...state,
                affiliation: action.obj
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
            return state
    }
}

export default dialog;