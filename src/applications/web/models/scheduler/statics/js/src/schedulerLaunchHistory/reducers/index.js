import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import controlTower from './controlTower';
import ui from './ui';

export default combineWithCommonReducer({controlTower, ui});