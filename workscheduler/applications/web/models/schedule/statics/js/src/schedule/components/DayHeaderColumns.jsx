import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayHeaderCell from './DayHeaderCell';
import RowHeader from './RowHeader';

const dayColumnHeaders = ({ headers, ...other }) => {
    const cells = headers.map(x =>
        <DayHeaderCell key={x.day} {...x} />
    );

    return (
        <TableHead>
            <TableRow>
                <RowHeader />
                {cells}
            </TableRow>
        </TableHead>
    )
}

export default dayColumnHeaders;