import React from 'react';

import DayRequireRow from './DayRequireRow';

const dayRequireBody = ({ categories, onRequireChange }) => {
    const dayRequireRow = [];

    for (let [index, category] of categories.entries()) {
        dayRow.push(<DayRequireRow key={category.id} category={category} onRequireChange={onRequireChange} />)
    }

    return (
        <tbody>
            {dayRequireRow}
        </tbody>
    )
};

export default dayRequireBody;