import moment from 'moment';

const dialog = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG_APPEND':
            return {...state,
                isOpen: true,
                id: '',
                title: '',
                note: '',
                atFrom: moment(action.request.atFrom),
                atTo: moment(action.request.atTo)
            };
        case 'OPEN_DIALOG_EDIT':
            return {...state,
                isOpen: true,
                id: action.request.id,
                title: action.request.title,
                note: action.request.note,
                atFrom: moment(action.request.atFrom),
                atTo: moment(action.request.atTo)
            };
        case 'CLOSE_DIALOG':
            return {...state,
                isOpen: false
            };
        case 'CHANGE_TITLE':
            return {...state,
                title: action.text
            };
        case 'CHANGE_NOTE':
            return {...state,
                note: action.text
            };
        case 'CHANGE_DATE':
            return {...state,
                atFrom: action.atFrom,
                atTo: action.atTo
            };
        default:
            return state
    }
}

export default dialog;