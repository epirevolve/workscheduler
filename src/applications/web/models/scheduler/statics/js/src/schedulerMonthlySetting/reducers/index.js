import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import monthlySetting from './monthly-setting';
import ui from './ui';

const dataset = document.querySelector('script[src*="schedulerMonthly"]').dataset;
export const initValue = ({
    monthlySetting: JSON.parse(dataset.monthlySetting)
});

export default combineWithCommonReducer({monthlySetting, ui});