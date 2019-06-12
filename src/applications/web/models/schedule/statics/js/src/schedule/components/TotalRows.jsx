import React from 'react';

import TableFooter from '@material-ui/core/TableFooter';

import TotalRow from './TotalRow';

const totalRows = ({ rows }) => (
    <TableFooter>
        {rows.map((x, i) => <TotalRow key={i} {...x} bottom={rows.length-i-1} />)}
    </TableFooter>
);

export default totalRows;