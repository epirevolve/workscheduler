import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import RowHeader from './RowHeader';

import { zip } from 'array-util'

const css_ = {
    position: 'sticky',
    background: 'white',
    zIndex: 99,
    minHeight: '3rem',
    maxHeight: '3rem'
}

const totalRow = ({ header, cells, bottom }) => {
    return (
        <TableRow css={css({...css_,
            bottom: 3.3*bottom+'rem'
        })}>
            <RowHeader val={header} />
            {cells}
        </TableRow>
    )
}

const areEqual = (prevProps, nextProps) => {
    return zip(prevProps["cells"], nextProps["cells"]).some(([x, y]) => x == y)
        && prevProps["header"] == nextProps["header"]
}

export default React.memo(totalRow, areEqual);