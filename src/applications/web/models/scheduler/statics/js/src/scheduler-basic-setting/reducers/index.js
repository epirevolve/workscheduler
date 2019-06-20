import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import scheduler from './scheduler';

const dataset = document.querySelector('script[src*="scheduler-basic-setting"]').dataset;
export const initValue = ({
    scheduler: JSON.parse(dataset.scheduler)
});

export default combineWithCommonReducer({scheduler});