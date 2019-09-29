import * as actionTypes from '../actionTypes';

const users = (state = [], action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.SUCCESS_APPEND_USER:
            return state.concat([payload.user]);
        case actionTypes.SUCCESS_UPDATE_USER:
            return state.map((x) => {
                if (x.id != payload.user.id) return x;
                return payload.user;
            });
        case actionTypes.SUCCESS_ACTIVATE_USER:
            return state.map((x) => {
                if (x.id != payload.id) return x;
                return { ...x, isInactivated: false };
            });
        case actionTypes.SUCCESS_INACTIVATE_USER:
            return state.map((x) => {
                if (x.id != payload.id) return x;
                return { ...x, isInactivated: true };
            });
        default:
            return state;
    }
};

export default users;