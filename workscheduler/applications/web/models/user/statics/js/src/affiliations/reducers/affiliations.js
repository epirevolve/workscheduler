const affiliations = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_AFFILIATION':
            return state.concat([action.affiliation]);
        case 'EDIT_AFFILIATION':
            return state.map(x => {
                if (x.id != action.affiliation.id) return x;
                return action.affiliation;
            });
        case 'REMOVE_AFFILIATION':
            return state.filter(x => x.id != id);
        default:
            return state;
    }
}

export default affiliations;