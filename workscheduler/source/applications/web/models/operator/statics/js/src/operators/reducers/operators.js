const operators = (state = [], action) => {
    switch (action.type) {
        case 'EDIT_OPERATOR':
            return state.map((x) => {
                if (x.id != action.operator.id) return x;
                return action.operator;
            });
        default:
            return state;
    }
};

export default operators;