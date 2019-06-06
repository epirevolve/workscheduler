import { START_UPDATE_MONTHLY_SETTING, START_PUBLIC_MONTHLY_SETTING,
	SUCCESS_UPDATE_MONTHLY_SETTING, FAILURE_UPDATE_MONTHLY_SETTING,
	SUCCESS_PUBLIC_MONTHLY_SETTING, FAILURE_PUBLIC_MONTHLY_SETTING } from '../actionTypes';

const ui = (state = {isProgressing: false}, action) => {
	switch (action.type) {
		case START_UPDATE_MONTHLY_SETTING:
		case START_PUBLIC_MONTHLY_SETTING:
			return {...state,
				isProgressing: true
			};
		case SUCCESS_UPDATE_MONTHLY_SETTING:
		case FAILURE_UPDATE_MONTHLY_SETTING:
		case SUCCESS_PUBLIC_MONTHLY_SETTING:
		case FAILURE_PUBLIC_MONTHLY_SETTING:
			return {...state,
				isProgressing: false
			};
		default:
			return state;
	}
};

export default ui;