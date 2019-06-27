import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import yearlySetting from './yearly-setting';

export const initValue = ({
    yearlySetting: []
});

export default combineWithCommonReducer({yearlySetting});