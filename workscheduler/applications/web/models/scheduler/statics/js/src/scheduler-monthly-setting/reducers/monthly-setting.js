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
        default:
            return state
    }
}

export default monthlySetting;