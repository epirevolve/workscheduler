import React from 'react';
import propTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = css({
    fontWeight: 'initial !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
});

const dayIsHolidayCell = ({ isHoliday, changeIsHoliday }) => (
    <TableCell css={cellCss}>
        <Checkbox checked={isHoliday} onChange={changeIsHoliday} />
    </TableCell>
);

dayIsHolidayCell.propTypes = {
    isHoliday: propTypes.bool.isRequired,
    changeIsHoliday: propTypes.func.isRequired
};

const areEqual = (prevProps, nextProps) => prevProps["isHoliday"] == nextProps["isHoliday"];

export default React.memo(dayIsHolidayCell, areEqual);