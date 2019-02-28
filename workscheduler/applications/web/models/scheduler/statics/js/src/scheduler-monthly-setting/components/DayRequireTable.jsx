import React from 'react';

import DayRequireBody from './DayRequireBody';
import DayRequireHeaderRow from './DayRequireHeaderRow';

const dayRequireTable = ({ days, onRequireChange }) => {
    return (
        <div id="date-set">
            <table className="table table-striped">
                {<DayRequireHeaderRow days={days} />}
                {<DayRequireBody days={days} onRequireChange={onRequireChange} />}
            </table>
        </div>
    )
};

export default dayRequireTable;