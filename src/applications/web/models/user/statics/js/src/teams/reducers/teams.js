const teams = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_MAIN_TEAM':
            return state.concat([action.team]);
        case 'EDIT_MAIN_TEAM':
            return state.map((x) => {
                if (x.id != action.team.id) return x;
                return action.team;
            });
        case 'REMOVE_MAIN_TEAM':
            return state.filter((x) => x.id != id);
        default:
            return state;
    }
};

export default teams;