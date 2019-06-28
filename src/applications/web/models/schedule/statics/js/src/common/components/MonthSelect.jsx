import React from 'react';
import propTypes from 'prop-types';

import MonthSelect from 'MonthSelect';

const monthSelect = ({team, monthYear, changeMonthYear}) => (
    <MonthSelect monthYear={monthYear} changeMonthYear={changeMonthYear(team)} />
);

monthSelect.propTypes = {
    team: propTypes.object.isRequired,
    monthYear: propTypes.string.isRequired,
    changeMonthYear: propTypes.func.isRequired
};

export default monthSelect;