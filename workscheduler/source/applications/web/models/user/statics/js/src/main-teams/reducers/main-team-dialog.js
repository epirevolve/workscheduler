const dialog = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG_APPEND':
            return {...state,
                isOpen: true,
                id: '',
                name: '',
                note: ''
            };
        case 'OPEN_DIALOG_EDIT':
            return {...state,
                isOpen: true,
                id: action.mainTeam.id,
                name: action.mainTeam.name,
                note: action.mainTeam.note
            };
        case 'CLOSE_DIALOG':
            return {...state,
                isOpen: false
            };
        case 'CHANGE_NAME':
            return {...state,
                name: action.text
            };
        case 'CHANGE_NOTE':
            return {...state,
                note: action.text
            };
        default:
            return state
    }
}

export default dialog;