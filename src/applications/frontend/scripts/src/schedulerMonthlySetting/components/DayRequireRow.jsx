import React from 'react';
import propTypes from "prop-types";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DayRequireCell from './DayRequireCell';

const dayRequireRow = ({ category, requires, changeRequire }) => {
    const cells = [];
    for (const [ day, require ] of requires) {
        cells.push(<DayRequireCell key={day} require={require}
            changeRequire={changeRequire(day, category.id)} />);
    }

    return (
        <TableRow>
            <TableCell>{category.title}</TableCell>
            {cells}
        </TableRow>
    );
};

dayRequireRow.propTypes = {
    category: propTypes.object,
    requires: propTypes.array,
    changeRequire: propTypes.func.isRequired
};

export default dayRequireRow;