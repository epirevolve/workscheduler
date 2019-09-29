const menu = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_TEAM':
            return { ...state,
                team: action.team
            };
        default:
            return state;
    }
};

export default menu;