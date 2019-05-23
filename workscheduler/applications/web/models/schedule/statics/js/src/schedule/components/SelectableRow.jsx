import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import RowHeader from './RowHeader';
import SelectableCell from './SelectableCell';

import { zip } from 'array-util'

const selectableRow = ({ headers, cells, onCategoryChange }) => {
    return (
        <TableRow>
            {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
            {cells.map(([a, b, c], i) => <SelectableCell key={i} val={a.name} categories={b}
                onCategoryChange={onCategoryChange(a.day, c)} />)}
        </TableRow>
    )
}

const areEqual = (prevProps, nextProps) => {
    return zip(prevProps["cells"], nextProps["cells"]).some(([x, y]) => x == y)
        && zip(prevProps["header"], nextProps["header"]).some(([x, y]) => x == y)
}

export default React.memo(selectableRow);