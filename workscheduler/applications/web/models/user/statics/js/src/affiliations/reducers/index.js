import { combineReducers } from 'redux';

import affiliationDialog from './affiliation-dialog';
import affiliations from './affiliations';

export default combineReducers({
    affiliationDialog,
    affiliations
})