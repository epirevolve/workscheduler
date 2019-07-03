import * as actionTypes from '../actionTypes';

const dialog = (state = { isOpen: false }, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.OPEN_DIALOG_EDIT: {
            return { ...state,
                id: payload.operator.id,
                name: payload.operator.user.name,
                team: payload.operator.user.team.name,
                skills: payload.operator.skills,
                ojt: payload.operator.ojt
            };
        }
        case actionTypes.CHANGE_SKILL: {
            const skillIds = state.skills.map((x) => x.id);
            return { ...state,
                skills:
                    (skillIds.includes(payload.skill.id))
                        ? state.skills.filter((x) => x.id != payload.skill.id)
                        : state.skills.concat(payload.skill)
            };
        }
        case actionTypes.CHANGE_OJT:
            return { ...state,
                ojt: payload.operator
            };
        default:
            return state;
    }
};

export default dialog;