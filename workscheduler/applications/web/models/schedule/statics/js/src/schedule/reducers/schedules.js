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
                scheduleOf: action.scheduleOf
            }
        case 'CHANGE_AFFILIATION':
            return {...state,
                daySettings: action.daySettings,
                schedules: action.schedules,
                totals: action.totals,
                isPublished: action.isPublished,
                affiliation: actions.affiliation
            }
        case 'CHANGE_WORK_CATEGORY':
            const oldCategoryName = state.schedules.map(x => x.schedule).filter(x => x.day == action.day)[0].name;
            const oldCategory = action.workCategories.filter(x => x.title == oldCategoryName)[0];
            const newCategory = action.workCategories.filter(x => x.title == action.category)[0];
            return {...state,
                schedules: state.schedules.map(x => {
                    if (x.operator != action.operator) return x;
                    const oldCategory = x.schedule.filter(y => y.day == action.day)[0].name
                    return {...x,
                        totals: x.totals(y => {
                            if (y.workCategory.title == action.category)
                                return {...y,
                                    total: y.total+1}
                            else if (y.workCategory.title == oldCategory)
                                return {...y,
                                    total: y.total-1}
                            else
                                return y
                        }),
                        schedule: x.schedule(y => {
                            if (y.day != action.day) return y;
                            return {...y,
                                name: action.category}
                        })
                    }
                }),
                totals: state.totals
            }
        default:
            return state
    }
}

export default schedules;