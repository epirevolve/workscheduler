import React from 'react';
import propTypes from "prop-types";

import TableCell from '@material-ui/core/TableCell';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = css({
    minWidth: '5rem',
    maxWidth: '5rem',
    padding: '1rem !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
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
            <Box css={titleCss}>{name}</Box>
            <br />
            <Box>{day}</Box>
        </TableCell>
    );
};

dayHeaderCell.propTypes = {
    name: propTypes.string.isRequired,
    day: propTypes.string,
    isHoliday: propTypes.bool,
};

export default React.memo(dayHeaderCell);