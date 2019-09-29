import * as actionTypes from '../actionTypes';

const dialog = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: payload.uuid,
                name: '',
                score: 1,
                isCertified: true
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                ...payload.skill
            };
        case actionTypes.CHANGE_NAME:
            return { ...state,
                name: payload.text
            };
        case actionTypes.CHANGE_SCORE:
            return { ...state,
                score: payload.score
            };
        case actionTypes.CHANGE_IS_CERTIFIED:
            return { ...state,
                isCertified: payload.isChecked
            };
        default:
            return state;
    }
};

export default dialog;