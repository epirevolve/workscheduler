import React from 'react';

import MonthSelect from './MonthSelect';
import DisplayDaySettings from '../containers/DisplayDaySettings';
import AdjustMonthlyHolidayCount from '../containers/AdjustMonthlyHolidayCount';
import SetFixedSchedules from '../containers/SetFixedSchedules';
import MonthlySettingContainer from '../containers/MonthlySettingContainer';

const monthlySetting = () => (
    <>
        <MonthSelect />
        <DisplayDaySettings />
        <AdjustMonthlyHolidayCount />
        <SetFixedSchedules />
        <MonthlySettingContainer />
    </>
)

export default monthlySetting;