import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import controlTower from './controlTower';
import ui from './ui';

export const initValue = ({
    controlTower: {
        currentRunners: [],
        launchHistories: []
    }
});

export default combineWithCommonReducer({ controlTower, ui });