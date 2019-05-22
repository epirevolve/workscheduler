import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class RowHeader extends React.PureComponent {
    render () {
        const { val } = this.props
        return (
            <TableCell component="th" scope="row"
                css={css`
                min-width: 7rem;
                max-width: 7rem;
                padding: 1rem;
                position: sticky;
                left: 0;
                background: white;
                z-index: 99;
            `}>
                {val}
            </TableCell>
        )
    }
}

export default RowHeader;