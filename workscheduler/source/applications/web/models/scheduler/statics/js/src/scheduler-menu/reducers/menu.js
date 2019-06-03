const menu = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_AFFILIATION':
            return {...state,
                affiliation: action.affiliation
            };
        default:
            return state;
    }
};

export default menu;