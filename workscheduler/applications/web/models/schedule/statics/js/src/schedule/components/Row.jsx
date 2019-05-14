import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import RowHeader from './RowHeader';

const row = ({ header, cells }) => {
    return (
        <TableRow>
            <RowHeader val={header} />
            {cells}
        </TableRow>
    )
}

export default row;