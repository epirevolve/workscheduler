import { CHANGE_MAIN_TEAM } from '../actionTypes';

const affiliations = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case CHANGE_MAIN_TEAM:
            return {...state,
                affiliation: payload.affiliation
            };
        default:
            return state;
    }
}

export default affiliations;