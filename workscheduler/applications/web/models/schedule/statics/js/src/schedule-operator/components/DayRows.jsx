import React from 'react';

import DayRow from './DayRow';

const dayRows = ({ schedules, ...other }) => {
    const dayRows = schedules.map(x =>
        <DayRow key={x.operator.id} {...x} />
    );

    return dayRows
}

export default dayRows;