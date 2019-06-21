import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import yearlySetting from './yearly-setting';

const dataset = document.querySelector('script[src*="schedulerYearly"]').dataset;
export const initValue = ({
    yearlySetting: JSON.parse(dataset.yearlySetting)
});

export default combineWithCommonReducer({yearlySetting});