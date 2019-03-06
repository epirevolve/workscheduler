import React from 'react';

import OptionsContainer from '../containers/OptionsContainer';
import WorkCategoriesContainer from '../containers/WorkCategoriesContainer';
import BasicSettingContainer from '../containers/BasicSettingContainer';

const basicSetting = () => (
    <React.Fragment>
        <OptionsContainer />
        <WorkCategoriesContainer />
        <BasicSettingContainer />
    </React.Fragment>
)

export default basicSetting;