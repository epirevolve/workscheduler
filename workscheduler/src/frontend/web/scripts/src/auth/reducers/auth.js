import * as pageActions from "../actions/page";

const auth = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case pageActions.CHANGE_LOGIN_ID:
            return { ...state,
                logInId: payload.text
            };
        case pageActions.CHANGE_PASSWORD:
            return { ...state,
                password: payload.text
            };
        default:
            return state;
    }
};

export default auth;