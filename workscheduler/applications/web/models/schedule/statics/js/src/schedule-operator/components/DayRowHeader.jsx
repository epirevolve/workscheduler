import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const dayRowHeader = ({ val }) => {
    return (
        <TableCell component="th" scope="row"
            css={css`
                min-width: 7rem;
                max-width: 7rem;
                padding: 1rem;
            `}>
            {val}
        </TableCell>
    )
}

export default dayRowHeader;