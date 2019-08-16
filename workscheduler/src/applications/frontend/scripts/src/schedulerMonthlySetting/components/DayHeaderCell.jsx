import React from 'react';
import propTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = {
    fontWeight: 'initial !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
};

const getCssByHoliday = (name) => {
    if (name == 'Sun')
        return {
            color: 'red'
        };
    else if (name == 'Sat')
        return {
            color: 'deepskyblue'
        };
    return {};
};

const dayHeaderCell = ({ day }) => {
    const titleCss = css(getCssByHoliday(day.dayName));
    return (
        <TableCell css={cellCss}>
            <Box css={titleCss}>{day.dayName}</Box>
            <br />
            <Box>{day.day}</Box>
        </TableCell>
    );
};

dayHeaderCell.propTypes = {
    day: propTypes.object
};

export default dayHeaderCell;