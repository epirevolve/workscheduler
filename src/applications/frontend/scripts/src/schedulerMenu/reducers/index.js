import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import menu from './menu';

const dataset = document.querySelector('script[src*="schedulerMenu"]').dataset;

export const initValue = ({
    menu: { team: JSON.parse(dataset.teams)[0] }
});

export default combineWithCommonReducer({ menu });