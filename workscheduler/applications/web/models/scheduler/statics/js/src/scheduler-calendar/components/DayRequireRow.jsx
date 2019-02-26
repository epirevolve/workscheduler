import React from 'react';

import DayRequireCell from './DayRequireCell'

const dayRequireRow = ({ category, requires, onRequireChange }) => {
    const cells = [];
    for (let [index, require] of requires.entries()) {
        cells.push(<DayRequireCell key={index} require={require} onRequireChange={onRequireChange} />)
    }

    return (
        <tr>
            <th>{category.title}</th>
            {cells}
        </tr>
    )
};

export default dayRequireRow;