import * as actionTypes from '../actionTypes';

const user = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.CHANGE_PASSWORD:
            return { ...state,
                password: payload.password
            };
        case actionTypes.CHANGE_NAME:
            return { ...state,
                name: payload.name
            };
        default:
            return state;
    }
};

export default user;