const operators = (state = [], action) => {
    switch (action.type) {
        case 'EDIT_SKILL':
            return state.map(x => {
                if (x.id != action.operator.id) return operator;
                return action.operator;
            })
        default:
            return state
    }
}

export default operators;