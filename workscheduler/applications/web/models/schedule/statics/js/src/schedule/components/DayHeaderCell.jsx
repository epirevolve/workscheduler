import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const dayHeaderCell = ({ name, day, isHoliday }) => {
    let titleCss = {}
    if (name == 'Sat')
        titleCss = {
            color: '#17a2b8'
        }
    else if (name == 'Sun' || isHoliday)
        titleCss = {
            color: '#dc3545'
        }
    return (
        <TableCell css={css`
                font-weight: initial;
                vertical-align: middle !important;
                text-align: center;
            `}>
            <span css={css(titleCss)}>{name}</span>
            <br />
            <span>{day}</span>
        </TableCell>
    )
}

export default dayHeaderCell;