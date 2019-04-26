import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import DayIsHolidayCell from './DayIsHolidayCell'

const dayIsHolidayRow = ({ days, onIsHolidayChange }) => {
    const cells = [];
    for (let day of days) {
        cells.push(<DayIsHolidayCell key={day.day} isHoliday={day.isHoliday}
            onIsHolidayChange={ onIsHolidayChange(day.day) } />)
    }

    return (
        <TableRow>
            <TableCell>休日</TableCell>
            {cells}
        </TableRow>
    )
};

export default dayIsHolidayRow;