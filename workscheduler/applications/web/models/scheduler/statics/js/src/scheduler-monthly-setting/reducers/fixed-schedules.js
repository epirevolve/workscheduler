import moment from 'moment';

import { newPseudoUuid } from 'id-util';

const dataset = document.querySelector('script[src*="scheduler-monthly-setting"]').dataset;
const scheduleOf = dataset.scheduleOf;

const fixedSchedules = (state = [], action) => {
    switch (action.type) {
        case 'CHANGE_FIXED_SCHEDULE_TITLE':
            return state.map(x => {
                if (x.id != action.id) return x;
                return {...x,
                    title: action.title
                }
            })
        case 'CHANGE_FIXED_SCHEDULE_DATE':
            return state.map(x => {
                if (x.id != action.id) return x;
                return {...x,
                    onFrom: action.date[0].toDate().toDateFormatString(),
                    onTo: action.date[1].toDate().toDateFormatString()
                }
            })
        case 'CHANGE_FIXED_SCHEDULE_AT_FROM':
            return state.map(x => {
                if (x.id != action.id) return x;
                return {...x,
                    atFrom: action.atFrom + ':00'
                }
            })
        case 'CHANGE_FIXED_SCHEDULE_AT_TO':
            return state.map(x => {
                if (x.id != action.id) return x;
                return {...x,
                    atTo: action.atTo + ':00'
                }
            })
        case 'CHANGE_FIXED_SCHEDULE_PARTICIPANT':
            return state.map(x => {
                if (x.id != action.id) return x;
                const participantIds = x.participants.map(y => y.id);
                return {...x,
                    participants: (participantIds.includes(action.participant.id))
                        ? x.participants.filter(y => y.id != action.participant.id)
                        : x.participants.concat(action.participant).sort((a, b) => (a.id < b.id) ? -1 : 1)
                }
            })
        case 'ADD_FIXED_SCHEDULE':
            return state.concat({
                id: newPseudoUuid(),
                title: '',
                onFrom: moment(`${scheduleOf}`, 'YYYY-MM-DD'),
                onTo: moment(`${scheduleOf}`, 'YYYY-MM-DD'),
                atFrom: "00:00:00",
                atTo: "00:00:00",
                participants: []
            })
        case 'REMOVE_FIXED_SCHEDULE':
            return state.filter(x => x.id != action.id)
        default:
            return state
    }
}

export default fixedSchedules;