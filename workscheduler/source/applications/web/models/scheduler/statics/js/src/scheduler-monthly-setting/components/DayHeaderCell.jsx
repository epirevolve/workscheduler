import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const cellCss = css({
	fontWeight: 'initial !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
})

const dayHeaderCell = ({ day }) => {
    return (
        <TableCell css={cellCss}>
            <span className={day.dayName}>{day.dayName}</span>
            <br />
            <span>{day.day}</span>
        </TableCell>
    )
}

export default dayHeaderCell;