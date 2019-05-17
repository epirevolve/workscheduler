const affiliations = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_AFFILIATION':
            return {...state,
                affiliation: actions.affiliation
            }
        default:
            return state
    }
}

export default affiliations;