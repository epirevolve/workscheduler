import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const dayCell = ({ val }) => {
    return (
        <TableCell css={css`
            min-width: 5rem;
            max-width: 5rem;
            padding: 1rem;
            text-align: center;
        `}>
            {val}
        </TableCell>
    )
}

export default dayCell;