import React from 'react';
import propTypes from "prop-types";

import TextField from '@material-ui/core/TextField';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const wrapperCss = css({
    marginTop: '1rem !important',
    marginBottom: '0.5rem !important',
});

const monthlyHoliday = ({ holidays, changeHolidayCount }) => (
    <TextField type="number" onChange={changeHolidayCount} value={holidays}
        label="holidays" InputProps={{ min:"0" }} css={wrapperCss} />
);

monthlyHoliday.propTypes = {
    holidays: propTypes.number,
    changeHolidayCount: propTypes.func.isRequired
};

export default monthlyHoliday;