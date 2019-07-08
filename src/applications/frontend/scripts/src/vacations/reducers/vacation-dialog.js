import * as actionTypes from "../actionTypes";

import moment from 'moment';

const dialog = (state, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: '',
                title: '',
                daysCount: 0,
                startFrom: moment.now().toDateFormatString(),
                endOn: moment.now().toDateFormatString(),
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                id: payload.id,
                title: payload.title,
                daysCount: payload.daysCount,
                startFrom: payload.startFrom,
                endOn: payload.endOn,
            };
        case actionTypes.CHANGE_TITLE:
            return { ...state,
                title: payload.text
            };
        case actionTypes.CHANGE_DAYS_COUNT:
            return { ...state,
                daysCount: payload.count
            };
        case actionTypes.CHANGE_START_FROM:
            return { ...state,
                startFrom: payload.date.toDate().toDateFormatString(),
            };
        case actionTypes.CHANGE_END_ON:
            return { ...state,
                endOn: payload.date.toDate().toDateFormatString(),
            };
        default:
            return state;
    }
};

export default dialog;