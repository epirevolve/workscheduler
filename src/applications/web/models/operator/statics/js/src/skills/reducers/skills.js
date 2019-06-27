import * as actionTypes from '../actionTypes';

const skills = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.APPEND_SKILL:
            return state.concat([payload.skill]);
        case actionTypes.EDIT_SKILL:
            return state.map((x) => {
                if (x.id != payload.skill.id) return x;
                return payload.skill;
            });
        case actionTypes.REMOVE_SKILL:
            return state.filter((x) => x.id != payload.id);
        default:
            return state;
    }
};

export default skills;