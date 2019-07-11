import * as actionTypes from "../actionTypes";

const dialog = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: '',
                title: '',
                daysCount: 0,
                onFrom: new Date().toDateFormatString(),
                onTo: new Date().toDateFormatString(),
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                ...payload.vacation
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
                onFrom: payload.date,
            };
        case actionTypes.CHANGE_END_ON:
            return { ...state,
                onTo: payload.date,
            };
        default:
            return state;
    }
};

export default dialog;