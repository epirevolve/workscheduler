import React from 'react';

import TableCell from '@material-ui/core/TableCell';

const dayHeaderCell = ({ day }) => {
    return (
        <TableCell>
            <span className={day.dayName}>{day.dayName}</span>
            <br />
            <span>{day.day}</span>
        </TableCell>
    )
}

export default dayHeaderCell;