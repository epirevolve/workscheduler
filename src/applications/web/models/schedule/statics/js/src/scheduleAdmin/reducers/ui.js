import base from '../../common/reducers/ui';

import * as actionTypes from '../actionTypes';

const ui = (state = {isProgressing: false}, action) => {
	switch (action.type) {
		case actionTypes.START_SAVE_SCHEDULES:
		case actionTypes.START_PUBLISH_SCHEDULES:
			return {...state,
				isProgressing: true
			};
		case actionTypes.SUCCESS_SAVE_SCHEDULES:
		case actionTypes.FAILURE_SAVE_SCHEDULES:
		case actionTypes.SUCCESS_PUBLISH_SCHEDULES:
		case actionTypes.FAILURE_PUBLISH_SCHEDULES:
			return {...state,
				isProgressing: false
			};
		default:
			return base(state, action);
	}
};

export default ui;