const users = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_USER':
            return state.concat([action.user])
        case 'EDIT_USER':
            return state.map(x => {
                if (x.id != action.user.id) return x;
                return action.user;
            })
        case 'INACTIVATE_USER':
            return state.map(x => {
                if (x.id != action.id) return x;
                return {...x,
                    isInactivated: true};
            })
        default:
            return state
    }
}

export default users;