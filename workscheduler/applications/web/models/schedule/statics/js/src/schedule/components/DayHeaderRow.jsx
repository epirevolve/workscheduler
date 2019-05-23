import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayHeaderCell from './DayHeaderCell';
import RowHeader from './RowHeader';

const dayHeaderRow = ({ headers, ...other }) => {
    return (
        <TableHead>
            <TableRow css={css`
                position: sticky;
                top: 0;
                background: white;
                z-index: 999;
            `}>
                <RowHeader />
                {headers}
            </TableRow>
        </TableHead>
    )
}

export default dayHeaderRow;