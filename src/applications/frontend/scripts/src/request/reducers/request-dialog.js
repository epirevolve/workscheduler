import moment from 'moment';

import * as actionTypes from '../actionTypes';

const dialog = (state = { isOpen: false }, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: '',
                title: '',
                note: '',
                atFrom: moment(payload.atFrom),
                atTo: moment(payload.atTo)
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                ...payload.request,
                atFrom: moment(payload.request.atFrom),
                atTo: moment(payload.request.atTo)
            };
        case actionTypes.CHANGE_TITLE:
            return { ...state,
                title: payload.text
            };
        case actionTypes.CHANGE_NOTE:
            return { ...state,
                note: payload.text
            };
        case actionTypes.CHANGE_DATE:
            return { ...state,
                atFrom: payload.atFrom,
                atTo: payload.atTo
            };
        default:
            return state;
    }
};

export default dialog;