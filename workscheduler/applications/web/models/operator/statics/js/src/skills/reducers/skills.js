const calendar = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_SKILL':
            return state.concat([action.skill])
        case 'EDIT_SKILL':
            return state.map(skill => {
                if (skill.id != action.skill.id) return skill;
                return action.skill;
            })
        case 'REMOVE_SKILL':
            return state.filter(x => x.id != action.id)
        default:
            return state
    }
}

export default calendar;