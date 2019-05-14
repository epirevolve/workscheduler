import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const totalCell = ({ val, state }) => {
    let css_ = {
        minWidth: '5rem',
        maxWidth: '5rem',
        padding: '1rem',
        textAlign: 'center'
    }
    if (state == 'over')
        css_ = {...css_,
            color: 'greenyellow'
        }
    else if (state == 'under')
        css_ = {...css_,
            color: 'red'
        }
    else if (state == 'excess')
        css_ = {...css_,
            color: 'deepskyblue'
        }
    return (
        <TableCell css={css(css_)}>
            {val}
        </TableCell>
    )
}

export default totalCell;