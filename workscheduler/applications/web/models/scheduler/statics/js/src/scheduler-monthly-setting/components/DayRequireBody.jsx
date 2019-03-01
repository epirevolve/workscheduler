import React from 'react';

import DayRequireRow from './DayRequireRow';

const dayRequireBody = ({ days, onRequireChange }) => {
    const requiresOfCategory = [];
    for (let day of days) {
        for (let detail of day.details) {
            if (!(detail.workCategory.id in requiresOfCategory)) requiresOfCategory[detail.workCategory.id] = []
            requiresOfCategory[detail.workCategory.id].push([day.day, detail.require])
        }
    }

    const dayRequireRow = [];
    for (let key in requiresOfCategory) {
        const requires = requiresOfCategory[key];
        const category = days[0].details.filter(x => x.workCategory.id == key)[0].workCategory;
        dayRequireRow.push(<DayRequireRow key={key} category={category} requires={requires}
            onRequireChange={onRequireChange} />)
    }

    return (
        <tbody>
            {dayRequireRow}
        </tbody>
    )
};

export default dayRequireBody;