import { combineReducers } from 'redux';

import operatorDialog from './operator-dialog';
import operators from './operators';

export default combineReducers({
    operatorDialog,
    operators
})