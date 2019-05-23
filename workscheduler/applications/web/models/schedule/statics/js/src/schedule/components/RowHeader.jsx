import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const css_ = css({
    minWidth: '7rem',
    maxWidth: '7rem',
    padding: '1rem',
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 99
})

const rowHeader = ({ val }) => {
    return (
        <TableCell component="th" scope="row" css={css_}>
            {val}
        </TableCell>
    )
}

export default React.memo(rowHeader);