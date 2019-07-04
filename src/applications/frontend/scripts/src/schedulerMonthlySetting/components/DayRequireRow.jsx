import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DayRequireCell from './DayRequireCell';

const dayRequireRow = ({ category, requires, onRequireChange }) => {
    const cells = [];
    for (const [day, require] of requires) {
        cells.push(<DayRequireCell key={day} require={require}
            onRequireChange={onRequireChange(day, category.id)} />);
    }

    return (
        <TableRow>
            <TableCell>{category.title}</TableCell>
            {cells}
        </TableRow>
    );
};

export default dayRequireRow;