import React from 'react';

import MonthSelect from '../../schedule/components/MonthSelect'

import Schedules from './Schedules';

const app = () => (
    <React.Fragment>
        <MonthSelect />
        <Schedules />
    </React.Fragment>
)

export default app;