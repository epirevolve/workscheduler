import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayCell from './DayCell';
import DayRowHeader from './DayRowHeader';

const dayRow = ({ operator, schedule, ...other }) => {
    const days = schedule.map(x =>
        <DayCell key={x.day} val={x.name} />
    );

    return (
        <TableRow>
            <DayRowHeader val={operator.user.name} />
            {days}
        </TableRow>
    )
}

export default dayRow;