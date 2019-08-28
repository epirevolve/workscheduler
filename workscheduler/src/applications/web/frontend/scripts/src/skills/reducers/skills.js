import * as actionTypes from '../actionTypes';

const skills = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_APPEND_SKILL:
            return state.concat([payload.skill]);
        case actionTypes.SUCCESS_UPDATE_SKILL:
            return state.map((x) => {
                if (x.id != payload.skill.id) return x;
                return payload.skill;
            });
        case actionTypes.SUCCESS_REMOVE_SKILL:
            return state.filter((x) => x.id != payload.id);
        default:
            return state;
    }
};

export default skills;