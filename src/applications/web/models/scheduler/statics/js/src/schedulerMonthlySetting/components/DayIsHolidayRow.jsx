import React from 'react';
import propTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DayIsHolidayCell from './DayIsHolidayCell';

const dayIsHolidayRow = ({ days, changeIsHoliday }) => {
    const cells = [];
    for (const day of days) {
        cells.push(<DayIsHolidayCell key={day.day} isHoliday={day.isHoliday}
            changeIsHoliday={ changeIsHoliday(day.day) } />);
    }

    return (
        <TableRow>
            <TableCell>休日</TableCell>
            {cells}
        </TableRow>
    );
};

dayIsHolidayRow.propTypes = {
    days: propTypes.array,
    changeIsHoliday: propTypes.func.isRequired
};

export default dayIsHolidayRow;