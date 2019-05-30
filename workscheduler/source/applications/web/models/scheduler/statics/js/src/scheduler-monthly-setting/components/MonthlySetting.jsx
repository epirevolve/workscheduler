import React from 'react';

import MonthSelect from './MonthSelect';
import DisplayDaySettings from '../containers/DisplayDaySettings';
import AdjustMonthlyHolidayCount from '../containers/AdjustMonthlyHolidayCount';
import SetFixedSchedules from '../containers/SetFixedSchedules';
import SaveAndPublicMonthlySetting from '../containers/SaveAndPublicMonthlySetting';

const monthlySetting = () => (
    <>
        <MonthSelect />
        <DisplayDaySettings />
        <AdjustMonthlyHolidayCount />
        <SetFixedSchedules />
        <SaveAndPublicMonthlySetting />
    </>
)

export default monthlySetting;