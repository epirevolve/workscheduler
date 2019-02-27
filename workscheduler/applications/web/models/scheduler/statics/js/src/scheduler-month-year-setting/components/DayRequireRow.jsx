import React from 'react';

import DayRequireCell from './DayRequireCell'

const dayRequireRow = ({ category, requires, onRequireChange }) => {
    const cells = [];
    for (let [day, require] of requires) {
        cells.push(<DayRequireCell key={day} require={require} onRequireChange={onRequireChange(day, category.id)} />)
    }

    return (
        <tr>
            <th>{category.title}</th>
            {cells}
        </tr>
    )
};

export default dayRequireRow;