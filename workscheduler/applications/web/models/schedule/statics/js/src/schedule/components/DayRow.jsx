import React from 'react';

import Day from 'Day';

const dayRow = ({ schedule, ...other }) => {
    const dayRow = schedule.map(x =>
        <Day key={x.day} day={x} />
    );

    return (
        <div>
            {dayRow}
        </div>
    )
}

export default dayRow;