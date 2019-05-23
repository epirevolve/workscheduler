import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import RowHeader from './RowHeader';
import TotalCell from './TotalCell';

import { zip } from 'array-util'

const css_ = {
    position: 'sticky',
    background: 'white',
    zIndex: 99,
    minHeight: '3rem',
    maxHeight: '3rem'
}

const totalRow = ({ headers, cells, bottom }) => {
    return (
        <TableRow css={css({...css_,
            bottom: 3.3*bottom+'rem'
        })}>
            {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
            {cells.map((x, i) => <TotalCell key={i} {...x} />)}
        </TableRow>
    )
}

const areEqual = (prevProps, nextProps) => {
    return zip(prevProps["cells"], nextProps["cells"]).some(([x, y]) => x == y)
        && zip(prevProps["headers"], nextProps["headers"]).some(([x, y]) => x == y)
}

export default React.memo(totalRow, areEqual);