const dialog = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG_EDIT':
            return {...state,
                isOpen: true,
                id: action.operator.id,
                name: action.operator.user.name,
                team: action.operator.user.team.name,
                skills: action.operator.skills,
                ojt: action.operator.ojt
            };
        case 'CLOSE_DIALOG':
            return {...state,
                isOpen: false
            };
        case 'CHANGE_SKILL':{
            const skillIds = state.skills.map((x) => x.id);
            return {...state,
                skills:
                    (skillIds.includes(action.skill.id))
                        ? state.skills.filter((x) => x.id != action.skill.id)
                        : state.skills.concat(action.skill)
            };
        }
        case 'CHANGE_OJT':
            return {...state,
                ojt: action.operator
            };
        default:
            return state;
    }
};

export default dialog;