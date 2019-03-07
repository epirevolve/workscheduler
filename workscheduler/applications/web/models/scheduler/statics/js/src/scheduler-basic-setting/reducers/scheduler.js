import { newPseudoUuid } from 'id-util';

const scheduler = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_CERTIFIED_SKILL':
            return {...state,
                certifiedSkill: action.checked
            }
        case 'CHANGE_NOT_CERTIFIED_SKILL':
            return {...state,
                notCertifiedSkill: action.checked
            }
        case 'CHANGE_WORK_CATEGORY_TITLE':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        title: action.text
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_AT_FROM':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        atFrom: action.time + ':00'
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_AT_TO':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        atTo: action.time + ':00'
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_WEEK_DAY_REQUIRE':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        weekDayRequire: action.count
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_WEEK_DAY_MAX':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        weekDayMax: action.count
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_HOLIDAY_REQUIRE':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        holidayRequire: action.count
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_HOLIDAY_MAX':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        holidayMax: action.count
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_REST_DAYS':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        restDays: action.count
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_MAX_TIMES':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        maxTimes: action.count
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_ESSENTIAL_SKILL':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    const skillIds = x.essentialSkills.map(y => y.id);
                    return {...x,
                        essentialSkills: (skillIds.includes(action.skill.id))
                            ? x.essentialSkills.filter(y => y.id != action.skill.id)
                            : x.essentialSkills.concat(action.skill).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_ESSENTIAL_OPERATOR':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    const operatorIds = x.essentialOperators.map(y => y.id);
                    return {...x,
                        essentialOperators: (operatorIds.includes(action.operator.id))
                            ? x.essentialOperators.filter(y => y.id != action.operator.id)
                            : x.essentialOperators.concat(action.operator).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    }
                })
            }
        case 'CHANGE_WORK_CATEGORY_IMPOSSIBLE_OPERATOR':
            return {...state,
                workCategories: state.workCategories.map(x => {
                    if (x.id != action.id) return x;
                    const operatorIds = x.impossibleOperators.map(y => y.id);
                    return {...x,
                        impossibleOperators: (operatorIds.includes(action.operator.id))
                            ? x.impossibleOperators.filter(y => y.id != action.operator.id)
                            : x.impossibleOperators.concat(action.operator).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    }
                })
            }
        case 'ADD_WORK_CATEGORY':
            return {...state,
                workCategories: state.workCategories.concat({
                    id: newPseudoUuid(),
                    title: '',
                    atFrom: "00:00:00",
                    atTo: "00:00:00",
                    weekDayRequire: 0,
                    weekDayMax: 0,
                    holidayRequire: 0,
                    holidayMax: 0,
                    restDays: 0,
                    maxTimes: 0,
                    essentialSkills: [],
                    essentialOperators: [],
                    impossibleOperators: []
                })
            }
        case 'REMOVE_WORK_CATEGORY':
            return {...state,
                workCategories: state.workCategories.filter(x => x.id != action.id)
            }
        default:
            return state
    }
}

export default scheduler;