const user = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD':
            return {...state,
                password: action.password
            }
        case 'CHANGE_NAME':
            return {...state,
                name: action.name
            }
        default:
            return state
    }
}

export default user;