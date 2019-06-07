import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderCell from './DayHeaderCell';
import RowHeader from './RowHeader';

const rowCss = css({
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 999
});

const dayHeaderRow = ({ headers, cells }) => (
    <TableHead>
        <TableRow css={rowCss}>
            {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
            {cells.map((x, i) => <DayHeaderCell key={i} {...x} />)}
        </TableRow>
    </TableHead>
);

export default dayHeaderRow;