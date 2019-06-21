import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import requestDialog from './request-dialog';
import requestCalendar from './request-calendar';

const dataset = document.querySelector('script[src*="requestPublic"]').dataset;
export const initValue = ({
    requestCalendar: JSON.parse(dataset.calendar),
    requestDialog: {isOpen: false}
});

export default combineWithCommonReducer({requestDialog, requestCalendar});