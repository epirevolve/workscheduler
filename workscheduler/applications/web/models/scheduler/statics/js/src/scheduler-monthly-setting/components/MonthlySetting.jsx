import React from 'react';

import MonthSelect from './MonthSelect';
import DayRequireContainer from '../containers/DayRequireContainer';
import MonthlyHolidayContainer from '../containers/MonthlyHolidayContainer';
import FixedSchedulesContainer from '../containers/FixedSchedulesContainer';
import MonthlySettingContainer from '../containers/MonthlySettingContainer';

const monthlySetting = () => (
    <React.Fragment>
        <MonthSelect />
        <DayRequireContainer />
        <MonthlyHolidayContainer />
        <FixedSchedulesContainer />
        <MonthlySettingContainer />
    </React.Fragment>
)

export default monthlySetting;