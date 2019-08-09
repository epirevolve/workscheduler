import { reducerWrapper } from 'commonReducer';

import controlTower from './controlTower';
import ui from './ui';

export const initValue = ({
    controlTower: {
        currentRunners: [],
        launchHistories: []
    }
});

export default reducerWrapper({ controlTower, ui });