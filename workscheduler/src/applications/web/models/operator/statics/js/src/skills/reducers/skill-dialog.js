const dialog = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG_APPEND':
            return {...state,
                isOpen: true,
                id: '',
                name: '',
                score: '1',
                isCertified: true
            };
        case 'OPEN_DIALOG_EDIT':
            return {...state,
                isOpen: true,
                id: action.skill.id,
                name: action.skill.name,
                score: action.skill.score,
                isCertified: action.skill.isCertified
            };
        case 'CLOSE_DIALOG':
            return {...state,
                isOpen: false
            };
        case 'CHANGE_NAME':
            return {...state,
                name: action.text
            };
        case 'CHANGE_SCORE':
            return {...state,
                score: action.score
            };
        case 'CHANGE_IS_CERTIFIED':
            return {...state,
                isCertified: action.isChecked
            };
        default:
            return state;
    }
};

export default dialog;