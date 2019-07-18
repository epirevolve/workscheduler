import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import scheduler from './scheduler';

const dataset = document.querySelector('script[src*="schedulerBasic"]').dataset;
export const initValue = ({
    scheduler: JSON.parse(dataset.scheduler)
});

export default combineWithCommonReducer({scheduler});