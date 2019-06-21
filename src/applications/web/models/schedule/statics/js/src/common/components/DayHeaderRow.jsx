import React from 'react';

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
    <TableRow css={rowCss}>
        {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
        {cells.map((x, i) => <DayHeaderCell key={i} {...x} />)}
    </TableRow>
);

export default dayHeaderRow;