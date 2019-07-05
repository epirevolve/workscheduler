import * as actionTypes from '../actionTypes';

const user = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_PASSWORD:
            return { ...state,
                password: action.password
            };
        case actionTypes.CHANGE_NAME:
            return { ...state,
                name: action.name
            };
        default:
            return state;
    }
};

export default user;