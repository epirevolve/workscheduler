import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayCell from './DayCell';
import DayRowHeader from './DayRowHeader';

const dayHeader = ({ schedule, ...other }) => {
    const days = schedule.map(x =>
        <DayCell key={x.day} val={x.day} />
    );

    return (
        <TableHead>
            <TableRow>
                <DayRowHeader />
                {days}
            </TableRow>
        </TableHead>
    )
}

export default dayHeader;