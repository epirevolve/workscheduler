import * as actionTypes from '../actionTypes';

const ui = (state = {isProgressing: false}, action) => {
	switch (action.type) {
		case actionTypes.START_SAVE_SCHEDULES:
		case actionTypes.START_PUBLIC_SCHEDULES:
			return {...state,
				isProgressing: true
			};
		case actionTypes.SUCCESS_SAVE_SCHEDULES:
		case actionTypes.FAILURE_SAVE_SCHEDULES:
		case actionTypes.SUCCESS_PUBLIC_SCHEDULES:
		case actionTypes.FAILURE_PUBLIC_SCHEDULES:
			return {...state,
				isProgressing: false
			};
		default:
			return state;
	}
};

export default ui;