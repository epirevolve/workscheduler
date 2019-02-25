import React from 'react';

const dayHeaderCell = ({ day }) => {
    return (
        <th>
            <span class={day.dayName}>{day.dayName}</span>
            <br />
            <span>{day.day}</span>
        </th>
    )
}

export default dayHeaderCell;