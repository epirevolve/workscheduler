import React from 'react';

import DayRequireBody from './DayRequireBody';
import DayRequireHeaderRow from './DayRequireHeaderRow';

const dayRequireTable = ({ days, categories, onRequireChange }) => {
    return (
        <div id="date-set">
            <table class="table table-striped">
                {<DayRequireHeaderRow days={days} />}
                {<DayRequireBody categories={categories} onRequireChange={onRequireChange} />}
            </table>
        </div>
    )
};

export default dayRequireTable;