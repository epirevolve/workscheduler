import React from 'react';

const dayRequireHeaderCell = ({ day }) => {
    return (
        <th>
            <span class={day.dayName}>{day.dayName}</span>
            <br />
            <span>{day.day}</span>
        </th>
    )
}

export default dayRequireHeaderCell;