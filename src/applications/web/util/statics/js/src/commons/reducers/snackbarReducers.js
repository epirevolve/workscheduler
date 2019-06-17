import { SHOW_SNACKBAR, CLOSE_SNACKBAR } from '../actionTypes';

const snackbar = (state = {isOpen: false}, action) => {
	switch (action.type) {
		case SHOW_SNACKBAR:
			return {...state,
				isOpen: true,
				message: action.payload.message,
				status: action.payload.status
			};
		case CLOSE_SNACKBAR:
			return {...state,
				isOpen: false
			};
		default:
			return state;
	}
};

export default snackbar;