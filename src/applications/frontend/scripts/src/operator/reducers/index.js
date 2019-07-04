import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import operator from './operator';

const dataset = document.querySelector('script[src*="operator"]').dataset;
export const initValue = ({
    operator: JSON.parse(dataset.operator)
});

export default combineWithCommonReducer({operator});