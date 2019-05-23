import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import RowHeader from './RowHeader';
import Cell from './Cell';

import { zip } from 'array-util'

const row = ({ headers, cells }) => {
    return (
        <TableRow>
            {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
            {cells.map((x, i) => <Cell key={i} val={x.name} />)}
        </TableRow>
    )
}

const areEqual = (prevProps, nextProps) => {
    return zip(prevProps["cells"], nextProps["cells"]).some(([x, y]) => x == y)
        && zip(prevProps["header"], nextProps["header"]).some(([x, y]) => x == y)
}

export default React.memo(row, areEqual);