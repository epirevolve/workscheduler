const layout = (state = {}, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return {...state,
                opened: true
            };
        case 'CLOSE_DRAWER':
            return {...state,
                opened: false
            };
        default:
            return state;
    }
};

export default layout;