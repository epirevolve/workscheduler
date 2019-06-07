const mainTeams = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_MAIN_TEAM':
            return state.concat([action.mainTeam]);
        case 'EDIT_MAIN_TEAM':
            return state.map((x) => {
                if (x.id != action.mainTeam.id) return x;
                return action.mainTeam;
            });
        case 'REMOVE_MAIN_TEAM':
            return state.filter((x) => x.id != id);
        default:
            return state;
    }
};

export default mainTeams;