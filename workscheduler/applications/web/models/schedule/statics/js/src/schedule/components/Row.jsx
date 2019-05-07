import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import Cell from './Cell';
import RowHeader from './RowHeader';

const row = ({ header, cells }) => {
    const cells_ = cells.map(x =>
        <Cell key={x.key} val={x.val} />
    );

    return (
        <TableRow>
            <RowHeader val={header} />
            {cells_}
        </TableRow>
    )
}

export default row;