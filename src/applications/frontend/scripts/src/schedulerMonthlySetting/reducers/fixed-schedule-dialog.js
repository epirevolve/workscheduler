import * as actionTypes from '../actionTypes';

import moment from "moment";

const dialog = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_APPEND:
            return { ...state,
                id: '',
                title: '',
                onFrom: moment(`${payload.scheduleOf}`, 'YYYY-MM-DD'),
                onTo: moment(`${payload.scheduleOf}`, 'YYYY-MM-DD'),
                atFrom: "00:00:00",
                atTo: "00:00:00",
                participants: []
            };
        case actionTypes.OPEN_DIALOG_UPDATE:
            return { ...state,
                id: payload.fixedSchedule.id,
                title: payload.fixedSchedule.title,
                onFrom: moment(`${payload.fixedSchedule.onFrom}`, 'YYYY-MM-DD'),
                onTo: moment(`${payload.fixedSchedule.onTo}`, 'YYYY-MM-DD'),
                atFrom: payload.fixedSchedule.atFrom,
                atTo: payload.fixedSchedule.atTo,
                participants: payload.fixedSchedule.participants
            };
        case actionTypes.CHANGE_TITLE:
            return { ...state,
                title: payload.text
            };
        case actionTypes.CHANGE_DATE:
            return { ...state,
                onFrom: moment(`${payload.onFrom}`, 'YYYY-MM-DD'),
                onTo: moment(`${payload.onTo}`, 'YYYY-MM-DD'),
            };
        case actionTypes.CHANGE_AT_FROM:
            return { ...state,
                atFrom: `${payload.atFrom}:00`
            };
        case actionTypes.CHANGE_AT_TO:
            return { ...state,
                atTo: `${payload.atTo}:00`
            };
        case actionTypes.CHANGE_PARTICIPANT: {
            const participantIds = state.participants.map((y) => y.id);
            return { ...state,
                participants: (participantIds.includes(payload.participant.id))
                    ? state.participants.filter((x) => x.id != payload.participant.id)
                    : state.participants.concat(payload.participant).sort((a, b) => (a.id < b.id) ? -1 : 1)
            };
        }
        default:
            return state;
    }
};

export default dialog;