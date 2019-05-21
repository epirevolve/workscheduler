import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const cell = ({ val, css_ }) => {
    return (
        <TableCell css={css({...css_,
            minWidth: '5rem',
            maxWidth: '5rem',
            padding: '1rem',
            textAlign: 'center'
        })}>
            {val}
        </TableCell>
    )
}

export default cell;