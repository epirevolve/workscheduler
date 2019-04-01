import React from 'react';

import Title from './Title';
import VacationsContainer from '../containers/VacationsContainer';
import YearlySettingContainer from '../containers/YearlySettingContainer';

const yearlySetting = () => (
    <React.Fragment>
        <Title />
        <VacationsContainer />
        <YearlySettingContainer />
    </React.Fragment>
)