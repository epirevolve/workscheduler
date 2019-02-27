import { newPseudoUuid } from 'id-util';

const monthYearSetting = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_REQUIRE':
            return {...state,
                days: state.days.map(day => {
                    if (day.day != action.day) return day;
                    return {...day,
                        details: day.details.map(detail => {
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
                fixedSchedules: state.fixedSchedules.map(fixedSchedule => {
                    if (fixedSchedule.id != action.id) return fixedSchedule;
                    return {...fixedSchedule,
                        title: action.title
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_DATE':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(fixedSchedule => {
                    if (fixedSchedule.id != action.id) return fixedSchedule;
                    return {...fixedSchedule,
                        onFrom: action.date[0].toDate().toDateFormatString(),
                        onTo: action.date[1].toDate().toDateFormatString()
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_AT_FROM':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(fixedSchedule => {
                    if (fixedSchedule.id != action.id) return fixedSchedule;
                    return {...fixedSchedule,
                        atFrom: action.atFrom
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_AT_TO':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(fixedSchedule => {
                    if (fixedSchedule.id != action.id) return fixedSchedule;
                    return {...fixedSchedule,
                        atTo: action.atTo
                    }
                })
            }
        case 'CHANGE_FIXED_SCHEDULE_PARTICIPANT':
            return {...state,
                fixedSchedules: state.fixedSchedules.map(fixedSchedule => {
                    if (fixedSchedule.id != action.id) return fixedSchedule;
                    const participantIds = fixedSchedule.participants.map(participant => participant.id);
                    return {...fixedSchedule,
                        participants: (participantIds.includes(action.participant.id))
                            ? fixedSchedule.participants.filter(participant => participant.id != action.participant.id)
                            : fixedSchedule.participants.concat(action.participant).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    }
                })
            }
        case 'ADD_FIXED_SCHEDULE':
            return {...state,
                fixedSchedules: state.fixedSchedules.concat(
                    {
                        id: newPseudoUuid(),
                        title: '',
                        date: [undefined, undefined],
                        atFrom: "00:00",
                        atTo: "00:00",
                        participants: []
                    })
            }
        case 'REMOVE_FIXED_SCHEDULE':
            return {...state,
                fixedSchedules: state.fixedSchedules.filter(fixedSchedule => fixedSchedule.id != action.id)
            }
        default:
            return state
    }
}

export default monthYearSetting;