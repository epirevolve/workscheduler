import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const cell = ({ val, css_ }) => {
    css_ = {...css_,
        minWidth: '5rem',
        maxWidth: '5rem',
        padding: '1rem',
        textAlign: 'center'
    }
    return (
        <TableCell css={css(css_)}>
            {val}
        </TableCell>
    )
}

export default cell;