import React from 'react';
import propTypes from 'prop-types';

import TableBody from '@material-ui/core/TableBody';

import DayRequireRow from './DayRequireRow';
import DayIsHolidayRow from './DayIsHolidayRow';

const dayRequireBody = ({ days, changeRequire, changeIsHoliday }) => {
    const requiresOfCategory = [];
    for (const day of days) {
        for (const detail of day.details) {
            if (!(detail.workCategory.id in requiresOfCategory)) requiresOfCategory[detail.workCategory.id] = [];
            requiresOfCategory[detail.workCategory.id].push([ day.day, detail.require ]);
        }
    }

    const dayRequireRow = [];
    for (const key in requiresOfCategory) {
        const requires = requiresOfCategory[key];
        const category = days[0].details.find((x) => x.workCategory.id == key).workCategory;
        dayRequireRow.push(<DayRequireRow key={key} category={category}
            requires={requires} changeRequire={changeRequire} />);
    }

    return (
        <TableBody>
            <DayIsHolidayRow days={days} changeIsHoliday={changeIsHoliday} />
            {dayRequireRow}
        </TableBody>
    );
};

dayRequireBody.propTypes = {
    days: propTypes.array,
    changeRequire: propTypes.func.isRequired,
    changeIsHoliday: propTypes.func.isRequired
};

export default dayRequireBody;