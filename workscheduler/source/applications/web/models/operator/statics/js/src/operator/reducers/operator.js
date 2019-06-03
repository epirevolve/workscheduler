const operator = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_SKILL':{
            const skillIds = state.skills.map((x) => x.id);
            return {...state,
                skills:
                    (skillIds.includes(action.skill.id))
                        ? state.skills.filter((x) => x.id != action.skill.id)
                        : state.skills.concat(action.skill)
            };
        }
        case 'CHANGE_REMAIN_PAID_HOLIDAY':
            return {...state,
                remainPaidHolidays: action.count
            };
        default:
            return state;
    }
};

export default operator;