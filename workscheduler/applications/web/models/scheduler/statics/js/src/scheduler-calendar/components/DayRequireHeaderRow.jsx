import React from 'react';

import DayRequireHeader from './DayRequireHeader'

const dayRequireHeaderRow = ({ days }) => {

    const headers = [];
    for (let [index, day] of days.entries()) {
        headers.push(<DayHeader key={index} day={day})
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