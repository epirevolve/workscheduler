import moment from 'moment';

import { newPseudoUuid } from 'id-util';

const $script = $('script[src*="scheduler-monthly-setting"]');
const scheduleOf = $script.data('scheduleOf');

const monthlySetting = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_REQUIRE':
            return {...state,
                days: state.days.map(x => {
                    if (x.day != action.day) return x;
                    return {...x,
                        details: x.details.map(detail => {
                            if (detail.workCategory.id != action.categoryId) return detail;
                            return {...detail,
                                require: action.require
                            }
                        })
                    }
                })
            }
        case 'CHANGE_MONTHLY_HOLIDAY':
            return {...state,
                holidays: action.count
            }
        case 'CHANGE_FIXED_SCHEDULE_TITLE':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        title: action.title
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_DATE':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        onFrom: action.date[0].toDate().toDateFormatString(),
                        onTo: action.date[1].toDate().toDateFormatString()
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_AT_FROM':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        atFrom: action.atFrom + ':00'
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_AT_TO':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        atTo: action.atTo + ':00'
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_PARTICIPANT':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(x => {
                    if (x.id != action.id) return x;
                    const participantIds = x.participants.map(y => y.id);
                    return {...x,
                        participants: (participantIds.includes(action.participant.id))
                            ? x.participants.filter(y => y.id != action.participant.id)
                            : x.participants.concat(action.participant).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    }
                })
            }
        case 'ADD_FIXED_SCHEDULE':
            return {...state,
                fixedSchedules: state.fixedSchedules.concat({
                    id: newPseudoUuid(),
                    title: '',
                    date: [moment(`${scheduleOf}`, 'YYYY-MM-DD'), moment(`${scheduleOf}`, 'YYYY-MM-DD')],
                    atFrom: "00:00:00",
                    atTo: "00:00:00",
                    participants: []
                })
            }
        case 'REMOVE_FIXED_SCHEDULE':
            return {...state,
                fixedSchedules: state.fixedSchedules.filter(x => x.id != action.id)
            }
        default:
            return state
    }
}

export default monthlySetting;