import { newPseudoUuid } from 'idUtil';
import * as actionTypes from '../actionTypes';

const vacations = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.CHANGE_TITLE:
            return state.vacations.map((x) => {
                if (x.id != payload.id) return x;
                return { ...x,
                    title: payload.text
                };
            });
        case actionTypes.CHANGE_START_FROM:
            return state.vacations.map((x) => {
                if (x.id != payload.id) return x;
                return { ...x,
                    startFrom: payload.date.toDate().toDateFormatString(),
                };
            });
            case actionTypes.CHANGE_END_ON:
                return state.vacations.map((x) => {
                    if (x.id != payload.id) return x;
                    return { ...x,
                        endOn: payload.date.toDate().toDateFormatString(),
                    };
                });
        case actionTypes.CHANGE_DAYS_COUNT:
            return state.vacations.map((x) => {
                if (x.id != payload.id) return x;
                return { ...x,
                    daysCount: payload.count
                };
            });
        case actionTypes.CHANGE_PARTICIPANTS_COUNT:
            return state.vacations.map((x) => {
                if (x.id != payload.id) return x;
                return { ...x,
                    days: payload.text
                };
            });
        case actionTypes.APPEND_VACATION:
            return state.vacations.concat({
                id: newPseudoUuid(),
                title: '',
                onFrom: new Date().toDateFormatString(),
                onTo: new Date().toDateFormatString(),
                days: 0
            });
        case actionTypes.REMOVE_VACATION:
            return state.vacations.filter((x) => x.id != payload.id);
        default:
            return state;
    }
};

export default vacations;