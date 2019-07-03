import React from 'react';
import propTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = css({
    fontWeight: 'initial !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
});

const dayHeaderCell = ({ day }) => (
    <TableCell css={cellCss}>
        <span className={day.dayName}>{day.dayName}</span>
        <br />
        <span>{day.day}</span>
    </TableCell>
);

dayHeaderCell.propTypes = {
    day: propTypes.object
};

export default dayHeaderCell;