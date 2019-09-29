import * as actionTypes from "../actionTypes";

const operator = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.CHANGE_SKILL: {
            const skillIds = state.skills.map((x) => x.id);
            return { ...state,
                skills:
                    (skillIds.includes(payload.skill.id))
                        ? state.skills.filter((x) => x.id != payload.skill.id)
                        : state.skills.concat(payload.skill)
            };
        }
        case actionTypes.CHANGE_REMAIN_PAID_HOLIDAY:
            return { ...state,
                remainPaidHolidays: payload.count
            };
        default:
            return state;
    }
};

export default operator;