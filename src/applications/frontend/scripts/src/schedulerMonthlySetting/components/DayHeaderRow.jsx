import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import DayHeaderCell from './DayHeaderCell';

const dayHeaderRow = ({ days }) => {
    const headers = [];
    for (const [index, day] of days.entries()) {
        headers.push(<DayHeaderCell key={index} day={day} />);
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                {headers}
            </TableRow>
        </TableHead>
    );
};

export default dayHeaderRow;