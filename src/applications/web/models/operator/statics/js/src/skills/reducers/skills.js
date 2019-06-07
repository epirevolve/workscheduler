const skills = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_SKILL':
            return state.concat([action.skill]);
        case 'EDIT_SKILL':
            return state.map((x) => {
                if (x.id != action.skill.id) return x;
                return action.skill;
            });
        case 'REMOVE_SKILL':
            return state.filter((x) => x.id != action.id);
        default:
            return state;
    }
};

export default skills;