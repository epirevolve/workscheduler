import * as actionTypes from "../actionTypes";

const teams = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_APPEND_TEAM:
            return state.concat([payload.team]);
        case actionTypes.SUCCESS_UPDATE_TEAM:
            return state.map((x) => {
                if (x.id != payload.team.id) return x;
                return payload.team;
            });
        case actionTypes.SUCCESS_REMOVE_TEAM:
            return state.filter((x) => x.id != payload.id);
        default:
            return state;
    }
};

export default teams;