const schedules = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_SCHEDULES':
            return {...state,
                daySettings: action.daySettings,
                schedules: action.schedules,
                totals: action.totals,
                isPublished: action.isPublished,
            }
        case 'CHANGE_SCHEDULE_OF':
            return {...state,
                daySettings: action.daySettings,
                schedules: action.schedules,
                totals: action.totals,
                isPublished: action.isPublished,
                scheduleOf: actions.scheduleOf
            }
        case 'CHANGE_AFFILIATION':
            return {...state,
                affiliation: actions.affiliation
            }
        default:
            return state
    }
}

export default schedules;