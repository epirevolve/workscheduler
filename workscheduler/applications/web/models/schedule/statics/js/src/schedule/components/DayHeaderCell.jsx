import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const dayHeaderCell = ({ name, day, isHoliday, css_ }) => {
    let titleCss = {}
    if (name == 'Sun')
        titleCss = {
            color: 'red'
        }
    else if (name == 'Sat')
        titleCss = {
            color: 'deepskyblue'
        }
    else if (isHoliday)
        titleCss = {
            color: 'orangered'
        }
    return (
        <TableCell css={css({...css_,
                minWidth: '5rem',
                maxWidth: '5rem',
                padding: '1rem',
                verticalAlign: 'middle',
                textAlign: 'center'
            })}>
            <span css={css(titleCss)}>{name}</span>
            <br />
            <span>{day}</span>
        </TableCell>
    )
}

export default dayHeaderCell;