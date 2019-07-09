import * as actionTypes from "../actionTypes";

const monthlySetting = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_FETCH_MONTHLY_SETTING:
            return { ...state,
                ...payload.monthlySetting
            };
        case actionTypes.CHANGE_REQUIRE:
            return { ...state,
                days: state.days.map((x) => {
                    if (x.day != payload.day) return x;
                    return { ...x,
                        details: x.details.map((detail) => {
                            if (detail.workCategory.id != payload.categoryId) return detail;
                            return { ...detail,
                                require: payload.require
                            };
                        })
                    };
                })
            };
        case actionTypes.CHANGE_IS_HOLIDAY:
            return { ...state,
                days: state.days.map((x) => {
                    if (x.day != payload.day) return x;
                    return { ...x,
                        isHoliday: payload.isHoliday
                    };
                })
            };
        case actionTypes.CHANGE_MONTHLY_HOLIDAY:
            return { ...state,
                holidays: payload.count
            };
        case actionTypes.APPEND_FIXED_SCHEDULE: {
            const onFrom = payload.fixedSchedule.onFrom.toDate().getDate();
            const onTo = payload.fixedSchedule.onTo.toDate().getDate();
            return { ...state,
                days: state.days.map((x) => {
                    if (x.day < onFrom || onTo < x.day) return x;
                    return { ...x,
                        fixedSchedules: x.fixedSchedules.concat([payload.fixedSchedule])
                    };
                })
            };
        }
        case actionTypes.UPDATE_FIXED_SCHEDULE: {
            const onFrom = payload.fixedSchedule.onFrom.toDate().getDate();
            const onTo = payload.fixedSchedule.onTo.toDate().getDate();
            return { ...state,
                days: state.days.map((x) => {
                    const fixedScheduleIds = x.fixedSchedules.map((y) => y.id);
                    if (x.day < onFrom || onTo < x.day) {
                        if (!fixedScheduleIds.includes(payload.fixedSchedule.id)) return x;
                        return { ...x,
                            fixedSchedules: x.fixedSchedules.filter((y) => y.id != payload.fixedSchedule.id)
                        };
                    }
                    return { ...x,
                        fixedSchedules: x.fixedSchedules.filter((y) => y.id != payload.fixedSchedule.id).concat([payload.fixedSchedule])
                    };
                })
            };
        }
        case actionTypes.REMOVE_FIXED_SCHEDULE:
            return { ...state,
                days: state.days.map((x) => {
                    if (!x.fixedSchedules.map((y) => y.id).includes(payload.id)) return x;
                    return { ...x,
                        fixedSchedules: x.fixedSchedules.filter((x) => x.id != payload.id)
                    };
                })
            };
        default:
            return state;
    }
};

export default monthlySetting;