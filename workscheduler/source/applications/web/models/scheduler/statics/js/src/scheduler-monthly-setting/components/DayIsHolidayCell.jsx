import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const dayIsHolidayCell = ({ isHoliday, onIsHolidayChange }) => {
    return (
        <TableCell>
            <FormControlLabel className="m-0"
                control={<Checkbox checked={isHoliday} onChange={onIsHolidayChange} />} />
        </TableCell>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps["isHoliday"] == nextProps["isHoliday"];
}

export default React.memo(dayIsHolidayCell, areEqual);