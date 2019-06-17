import React from 'react';

import TableRow from '@material-ui/core/TableRow';

import RowHeader from './RowHeader';
import Cell from './Cell';

import { zip } from 'array-util';

const row = ({ headers, cells }) => (
    <TableRow>
        {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
        {cells.map(([a, b], i) => {
            const categories = b.fixedSchedules.concat(b.details.map((x) => x.workCategory));
            const category = categories.find((x) => x.id == a.workCategoryId);
            return <Cell key={i} val={category ? category.title : a.workCategoryId} />
        })}
    </TableRow>
);

const areEqual = (prevProps, nextProps) => zip(prevProps["cells"], nextProps["cells"]).some(([x, y]) => x == y)
        && zip(prevProps["header"], nextProps["header"]).some(([x, y]) => x == y);

export default React.memo(row, areEqual);