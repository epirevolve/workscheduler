import { reducerWrapper } from 'commonReducer';

import menu from './menu';

const dataset = document.querySelector('script[src*="schedulermenu"]').dataset;

export const initValue = ({
    menu: { team: JSON.parse(dataset.teams)[0] }
});

export default reducerWrapper({ menu });