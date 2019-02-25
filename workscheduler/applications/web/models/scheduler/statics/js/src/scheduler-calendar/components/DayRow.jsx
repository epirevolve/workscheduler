import React from 'react';

import DayCell from './DayCell'

const dayRow = ({ category, handleChange }) => {
    const cells = [];
    for (let [index, require] of category.requires) {
        cells.push(<DayCell key={index} require={require} handleChange={handleChange})
    }

    return (
        <tr>
            <th>{category.category.title}</th>
            {cells}
        </tr>
    )
};

export default dayRow;