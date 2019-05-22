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
                affiliation: action.affiliation
            }
        case 'CHANGE_WORK_CATEGORY':
            const oldCategoryName = state.schedules.find(x => x.operator.id == action.operator.id)
                .schedule.find(x => x.day == action.day).name;
            if (oldCategoryName == action.category) return state;

            const oldCategory = action.workCategories.find(x => x.title == oldCategoryName);
            const newCategory = action.workCategories.find(x => x.title == action.category);
            return {...state,
                schedules: state.schedules.map(x => {
                    if (x.operator.id != action.operator.id) return x;
                    return {...x,
                        totals: x.totals.map(y => {
                            if (y.workCategory.title == action.category)
                                return {...y,
                                    total: y.total+1}
                            else if (y.workCategory.title == oldCategoryName)
                                return {...y,
                                    total: y.total-1}
                            else
                                return y
                        }),
                        schedule: x.schedule.map(y => {
                            if (y.day != action.day) return y;
                            return {...y,
                                name: action.category}
                        })
                    }
                }),
                totals: state.totals.map(x => {
                    if (x.workCategory.title == action.category) {
                        return {...x,
                            totals: x.totals.map(y => {
                                if (y.day != action.day) return y;
                                const newCount = y.count+1
                                return {...y,
                                    count: newCount,
                                    state: getStateName(newCount, x.workCategory, action.daySetting)
                                }
                            })
                        }
                    }
                    else if (x.workCategory.title == oldCategoryName) {
                        return {...x,
                            totals: x.totals.map(y => {
                                if (y.day != action.day) return y;
                                const newCount = y.count-1
                                return {...y,
                                    count: newCount,
                                    state: getStateName(newCount, x.workCategory, action.daySetting)
                                }
                            })
                        }
                    }
                    else
                        return x
                })
            }
        default:
            return state
    }
}

const getStateName = (count, workCategory, daySetting) => {
    if (daySetting.isHoliday && count > workCategory.holidayMax ||
        !daySetting.isHoliday && count > workCategory.weekDayMax) return 'excess'
    const detail = daySetting.details.find(x => x.workCategory.id == workCategory.id);
    if (count > detail.require) return 'over'
    if (count < detail.require) return 'under'
    return ''
}

export default schedules;