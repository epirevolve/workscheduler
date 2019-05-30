import React from 'react';

import Table from '@material-ui/core/Table';

import DayBody from './DayBody';
import DayHeaderRow from './DayHeaderRow';

const dayTable = ({ days, ...other }) => {
    return (
        <div id="date-set">
            <Table>
                <DayHeaderRow days={days} />
                <DayBody days={days} {...other} />
            </Table>
        </div>
    )
};

export default dayTable;