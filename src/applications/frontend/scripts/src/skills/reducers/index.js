import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import skills from './skills';
import skillDialog from './skill-dialog';
import ui from './ui';

const dataset = document.querySelector('script[src*="skills"]').dataset;
export const initValue = ({
    skills: JSON.parse(dataset.skills),
    skillDialog: {},
    ui: { dialogOpen: false }
});

export default combineWithCommonReducer({ skills, skillDialog, ui });