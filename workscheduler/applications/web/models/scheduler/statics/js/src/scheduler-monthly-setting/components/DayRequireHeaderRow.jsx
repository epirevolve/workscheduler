import React from 'react';

import DayRequireHeaderCell from './DayRequireHeaderCell'

const dayRequireHeaderRow = ({ days }) => {

    const headers = [];
    for (let [index, day] of days.entries()) {
        headers.push(<DayRequireHeaderCell key={index} day={day} />)
    }

    return (
        <thead>
            <tr>
                <td></td>
                {headers}
            </tr>
        </thead>
    )
}

export default dayRequireHeaderRow;