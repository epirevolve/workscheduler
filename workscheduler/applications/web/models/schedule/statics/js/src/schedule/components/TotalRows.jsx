import React from 'react';

import TableFooter from '@material-ui/core/TableFooter';

import TotalRow from './TotalRow';

const totalRows = ({ rows }) => {
    const count = rows.length;
    return (
        <TableFooter>
            {rows.map((x, i) => <TotalRow key={i} {...x} bottom={count-i-1} />)}
        </TableFooter>
    )
}

export default totalRows;