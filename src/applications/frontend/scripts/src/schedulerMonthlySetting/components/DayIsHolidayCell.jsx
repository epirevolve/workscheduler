import React from 'react';
import propTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { m0 } from "margin";

const cellCss = css({
    fontWeight: 'initial !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
});

const dayIsHolidayCell = ({ isHoliday, changeIsHoliday }) => (
    <TableCell css={cellCss}>
        <FormControlLabel css={m0} control={<Checkbox checked={isHoliday} onChange={changeIsHoliday} />} />
    </TableCell>
);

dayIsHolidayCell.propTypes = {
    isHoliday: propTypes.bool.isRequired,
    changeIsHoliday: propTypes.func.isRequired
};

const areEqual = (prevProps, nextProps) => prevProps["isHoliday"] == nextProps["isHoliday"];

export default React.memo(dayIsHolidayCell, areEqual);