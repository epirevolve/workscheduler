import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DayIsHolidayCell from './DayIsHolidayCell';

const dayIsHolidayRow = ({ days, onIsHolidayChange }) => {
    const cells = [];
    for (const day of days) {
        cells.push(<DayIsHolidayCell key={day.day} isHoliday={day.isHoliday}
            onIsHolidayChange={ onIsHolidayChange(day.day) } />);
    }

    return (
        <TableRow>
            <TableCell>休日</TableCell>
            {cells}
        </TableRow>
    );
};

export default dayIsHolidayRow;