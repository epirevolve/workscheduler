import React from 'react';

import TableRow from '@material-ui/core/TableRow';

import RowHeader from '../../common/components/RowHeader';
import SelectableCell from './SelectableCell';

import { zip } from 'arrayUtil';

const selectableRow = ({ headers, cells, onCategoryChange }) => (
    <TableRow>
        {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
        {cells.map(([a, b, c], i) => {
            const categories = c.fixedSchedules.concat(c.details.map((x) => x.workCategory));
            const category = categories.find((x) => x.id == a.workCategoryId);
            return <SelectableCell key={i} val={category ? category.title : a.workCategoryId} categories={b}
                onCategoryChange={onCategoryChange(a.day, c)} />
        })}
    </TableRow>
);

const areEqual = (prevProps, nextProps) => zip(prevProps["cells"], nextProps["cells"]).some(([x, y]) => x == y)
        && zip(prevProps["header"], nextProps["header"]).some(([x, y]) => x == y);

export default React.memo(selectableRow, areEqual);