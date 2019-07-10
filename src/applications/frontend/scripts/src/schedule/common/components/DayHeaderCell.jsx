import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = css({
    minWidth: '5rem',
    maxWidth: '5rem',
    padding: '1rem',
    verticalAlign: 'middle',
    textAlign: 'center'
});

const getCssByHoliday = (name, isHoliday) => {
    if (name == 'Sun')
        return {
            color: 'red'
        };
    else if (name == 'Sat')
        return {
            color: 'deepskyblue'
        };
    if (isHoliday)
        return {
            color: 'orangered'
        };
    return {};
};

const dayHeaderCell = ({ name, day, isHoliday }) => {
    const titleCss = css(getCssByHoliday(name, isHoliday));
    return (
        <TableCell css={cellCss}>
            <span css={titleCss}>{name}</span>
            <br />
            <span>{day}</span>
        </TableCell>
    );
};

export default React.memo(dayHeaderCell);