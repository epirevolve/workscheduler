import { combineReducers } from 'redux';

import skillDialog from './skill-dialog';
import skills from './skills';

export default combineReducers({
    skillDialog,
    skills
})