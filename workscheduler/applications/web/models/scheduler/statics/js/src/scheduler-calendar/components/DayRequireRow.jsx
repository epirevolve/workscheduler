import React from 'react';

import DayRequireCell from './DayRequireCell'

const dayRequireRow = ({ category, onRequireChange }) => {
    const cells = [];
    for (let [index, require] of category.requires) {
        cells.push(<DayRequireCell key={index} require={require} onRequireChange={onRequireChange} />)
    }

    return (
        <tr>
            <th>{category.category.title}</th>
            {cells}
        </tr>
    )
};

export default dayRequireRow;