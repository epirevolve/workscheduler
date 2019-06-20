import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import skillDialog from './skill-dialog';
import skills from './skills';

const dataset = document.querySelector('script[src*="skills"]').dataset;
export const initValue = ({
    skills: JSON.parse(dataset.skills),
    skillDialog: {isOpen: false}
});

export default combineWithCommonReducer({skillDialog, skills});