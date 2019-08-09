import * as actionTypes from "../actionTypes";

const scheduler = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CERTIFIED_SKILL:
            return { ...state,
                certifiedSkill: action.checked
            };
        case actionTypes.CHANGE_NOT_CERTIFIED_SKILL:
            return { ...state,
                notCertifiedSkill: action.checked
            };
        case actionTypes.CHANGE_WORK_CATEGORY_TITLE:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    return { ...x,
                        title: action.text
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_AT_FROM:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    return { ...x,
                        atFrom: `${action.time}:00`
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_AT_TO:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    return { ...x,
                        atTo: `${action.time}:00`
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_WEEK_DAY_REQUIRE:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    return { ...x,
                        weekDayRequire: action.count
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_HOLIDAY_REQUIRE:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    return { ...x,
                        holidayRequire: action.count
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_REST_DAYS:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    return { ...x,
                        dayOffs: action.count
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_MAX_TIMES:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    return { ...x,
                        maxTimes: action.count
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_WEEK_DAY_OPERATOR:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    const operatorIds = x.weekDayOperators.map((y) => y.id);
                    return { ...x,
                        weekDayOperators: (operatorIds.includes(action.operator.id))
                            ? x.weekDayOperators.filter((y) => y.id != action.operator.id)
                            : x.weekDayOperators.concat(action.operator).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_HOLIDAY_OPERATOR:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    const operatorIds = x.holidayOperators.map((y) => y.id);
                    return { ...x,
                        holidayOperators: (operatorIds.includes(action.operator.id))
                            ? x.holidayOperators.filter((y) => y.id != action.operator.id)
                            : x.holidayOperators.concat(action.operator).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_ESSENTIAL_SKILL:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    const skillIds = x.essentialSkills.map((y) => y.id);
                    return { ...x,
                        essentialSkills: (skillIds.includes(action.skill.id))
                            ? x.essentialSkills.filter((y) => y.id != action.skill.id)
                            : x.essentialSkills.concat(action.skill).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_EXCLUSIVE_OPERATOR:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    const operatorIds = x.exclusiveOperators.map((y) => y.id);
                    return { ...x,
                        exclusiveOperators: (operatorIds.includes(action.operator.id))
                            ? x.exclusiveOperators.filter((y) => y.id != action.operator.id)
                            : x.exclusiveOperators.concat(action.operator).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    };
                })
            };
        case actionTypes.CHANGE_WORK_CATEGORY_IMPOSSIBLE_OPERATOR:
            return { ...state,
                workCategories: state.workCategories.map((x) => {
                    if (x.id != action.id) return x;
                    const operatorIds = x.impossibleOperators.map((y) => y.id);
                    return { ...x,
                        impossibleOperators: (operatorIds.includes(action.operator.id))
                            ? x.impossibleOperators.filter((y) => y.id != action.operator.id)
                            : x.impossibleOperators.concat(action.operator).sort((a, b) => (a.id < b.id) ? -1 : 1)
                    };
                })
            };
        case actionTypes.ADD_WORK_CATEGORY:
            return { ...state,
                workCategories: state.workCategories.concat({
                    id: action.uuid,
                    title: '',
                    atFrom: "00:00:00",
                    atTo: "00:00:00",
                    weekDayRequire: 0,
                    weekDayMax: 0,
                    holidayRequire: 0,
                    holidayMax: 0,
                    dayOffs: 0,
                    maxTimes: 0,
                    weekDayOperators: [],
                    holidayOperators: [],
                    essentialSkills: [],
                    exclusiveOperators: [],
                    impossibleOperators: []
                })
            };
        case actionTypes.REMOVE_WORK_CATEGORY:
            return { ...state,
                workCategories: state.workCategories.filter((x) => x.id != action.id)
            };
        default:
            return state;
    }
};

export default scheduler;