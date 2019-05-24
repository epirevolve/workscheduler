import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayHeaderCell from './DayHeaderCell';
import RowHeader from './RowHeader';

const css_ = {
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 999
}

const dayHeaderRow = ({ headers }) => {
    return (
        <TableHead>
            <TableRow css={css(css_)}>
                <RowHeader />
                {headers}
            </TableRow>
        </TableHead>
    )
}

export default dayHeaderRow;