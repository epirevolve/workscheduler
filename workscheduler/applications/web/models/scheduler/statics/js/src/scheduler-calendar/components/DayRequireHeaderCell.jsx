import React from 'react';

const dayRequireHeaderCell = ({ day }) => {
    return (
        <th>
            <span className={day.dayName}>{day.dayName}</span>
            <br />
            <span>{day.day}</span>
        </th>
    )
}

export default dayRequireHeaderCell;