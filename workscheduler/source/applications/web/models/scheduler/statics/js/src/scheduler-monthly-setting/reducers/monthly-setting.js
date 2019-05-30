import moment from 'moment';

import { newPseudoUuid } from 'id-util';

const dataset = document.querySelector('script[src*="scheduler-monthly-setting"]').dataset;
const scheduleOf = dataset.scheduleOf;

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
        case 'CHANGE_IS_HOLIDAY':
            return {...state,
                days: state.days.map(x => {
                    if (x.day != action.day) return x;
                    return {...x,
                        isHoliday: action.isHoliday
                    }
                })
            }
        case 'CHANGE_MONTHLY_HOLIDAY':
            return {...state,
                holidays: action.count
            }
        case 'CHANGE_FIXED_SCHEDULE_TITLE':
            return {...state,
                days: state.days.map(x => {
                    if (!x.fixedSchedules.map(y => y.id).includes(action.id)) return x;
                    return {...x,
                        fixedSchedules: x.fixedSchedules.map(y => {
                            if (y.id != action.id) return y;
                            return {...y,
                                title: action.title
                            }
                        })
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_DATE':
            return {...state,
                days: state.days.map(x => {
                    if (!x.fixedSchedules.map(y => y.id).includes(action.id)) return x;
                    return {...x,
                        fixedSchedules: x.fixedSchedules.map(y => {
                            if (y.id != action.id) return y;
                            return {...y,
                                onFrom: action.date[0].toDate().toDateFormatString(),
                                onTo: action.date[1].toDate().toDateFormatString()
                            }
                        })
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_AT_FROM':
            return {...state,
                days: state.days.map(x => {
                    if (!x.fixedSchedules.map(y => y.id).includes(action.id)) return x;
                    return {...x,
                        fixedSchedules: x.fixedSchedules.map(y => {
                            if (y.id != action.id) return y;
                            return {...y,
                                atFrom: action.atFrom + ':00'
                            }
                        })
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_AT_TO':
            return {...state,
                days: state.days.map(x => {
                    if (!x.fixedSchedules.map(y => y.id).includes(action.id)) return x;
                    return {...x,
                        fixedSchedules: x.fixedSchedules.map(y => {
                            if (y.id != action.id) return y;
                            return {...y,
                                atTo: action.atTo + ':00'
                            }
                        })
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_PARTICIPANT':
            return {...state,
                days: state.days.map(x => {
                    if (!x.fixedSchedules.map(y => y.id).includes(action.id)) return x;
                    return {...x,
                        fixedSchedules: x.fixedSchedules.map(y => {
                            if (y.id != action.id) return y;
                            const participantIds = y.participants.map(y => y.id);
                            return {...y,
                                participants: (participantIds.includes(action.participant.id))
                                    ? y.participants.filter(z => z.id != action.participant.id)
                                    : y.participants.concat(action.participant).sort((a, b) => (a.id < b.id) ? -1 : 1)
                            }
                        })
                    }
                })
            }
        case 'ADD_FIXED_SCHEDULE':
            const day = moment(`${scheduleOf}`, 'YYYY-MM-DD');
            return {...state,
                days: state.days.map(x => {
                    if (x.day != day.date()) return x;
                    return {...x,
                        fixedSchedules: x.fixedSchedules.concat({
                            id: newPseudoUuid(),
                            title: '',
                            onFrom: moment(`${scheduleOf}`, 'YYYY-MM-DD'),
                            onTo: moment(`${scheduleOf}`, 'YYYY-MM-DD'),
                            atFrom: "00:00:00",
                            atTo: "00:00:00",
                            participants: []
                        })
                    }
                })
            }
        case 'REMOVE_FIXED_SCHEDULE':
            return {...state,
                days: state.days.map(x => {
                    if (!x.fixedSchedules.map(y => y.id).includes(action.id)) return x;
                    return {...x,
                        fixedSchedules: x.fixedSchedules.filter(x => x.id != action.id)
                    }
                })
            }
        default:
            return state
    }
}

export default monthlySetting;