import React from 'react';

import TableFooter from '@material-ui/core/TableFooter';

import TotalRow from './TotalRow';

const rows = ({ rows }) => {
    const count = rows.length;

    return (
        <TableFooter>
            {rows.map((x, i) => <TotalRow key={x.key} {...x} bottom={count-i-1} />)}
        </TableFooter>
    )
}

export default rows;