import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const css_ = {
    minWidth: '7rem',
    maxWidth: '7rem',
    padding: '1rem',
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 99,
    fontWeight: 'initial'
}

const rowHeader = ({ val, left }) => {
    return (
        <TableCell component="th" scope="row" css={css({...css_,
            left: left ? 7+5*(left-1)+'rem' : '0',
            minWidth: left ? '5rem' : '7rem',
            maxWidth: left ? '5rem' : '7rem',
            textAlign: left ? 'center' : 'left',
        })}>
            {val}
        </TableCell>
    )
}

export default React.memo(rowHeader);