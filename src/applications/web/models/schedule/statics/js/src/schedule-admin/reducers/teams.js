import { CHANGE_MAIN_TEAM } from '../actionTypes';

const teams = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case CHANGE_MAIN_TEAM:
            return {...state,
                team: payload.team
            };
        default:
            return state;
    }
};

export default teams;