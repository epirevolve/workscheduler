import React from 'react';

import DayHeader from './DayHeader'

const dayHeaderRow = ({ days }) => {

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

export default dayHeaderRow;