import * as actionTypes from '../actionTypes';

const users = (state = [], action) => {
    switch (action.type) {
        case actionTypes.APPEND_USER:
            return state.concat([action.user]);
        case actionTypes.EDIT_USER:
            return state.map((x) => {
                if (x.id != action.user.id) return x;
                return action.user;
            });
        case actionTypes.ACTIVATE_USER:
            return state.map((x) => {
                if (x.id != action.id) return x;
                return {...x, isInactivated: false};
            });
        case actionTypes.INACTIVATE_USER:
            return state.map((x) => {
                if (x.id != action.id) return x;
                return {...x, isInactivated: true};
            });
        default:
            return state;
    }
};

export default users;