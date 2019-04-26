import React from 'react';

import MonthSelect from './MonthSelect';
import DayTableContainer from '../containers/DayTableContainer';
import MonthlyHolidayContainer from '../containers/MonthlyHolidayContainer';
import FixedSchedulesContainer from '../containers/FixedSchedulesContainer';
import MonthlySettingContainer from '../containers/MonthlySettingContainer';

const monthlySetting = () => (
    <React.Fragment>
        <MonthSelect />
        <DayTableContainer />
        <MonthlyHolidayContainer />
        <FixedSchedulesContainer />
        <MonthlySettingContainer />
    </React.Fragment>
)

export default monthlySetting;