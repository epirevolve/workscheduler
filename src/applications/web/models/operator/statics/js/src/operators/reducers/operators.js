import * as actionTypes from '../actionTypes';

const operators = (state = [], action) => {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.SUCCESS_SAVE_OPERATOR:
            return state.map((x) => {
                if (x.id != payload.operator.id) return x;
                return payload.operator;
            });
        default:
            return state;
    }
};

export default operators;