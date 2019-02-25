import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import FixedSchedule from './FixedSchedule';

const fixedScheduleList = ({ fixedSchedules, handleAppend, handleRemove }) => {
    const fixedScheduleList = [];
    for (let fixedSchedule of fixedSchedules) {
        fixedScheduleList.push(<FixedSchedule key={fixedSchedule.id} fixedSchedule={fixedSchedule}
            handleRemove={handleRemove} />)
    }

    return (
        <React.Fragment>
            <Fab color="primary" aria-label="Append" onClick={handleAppend}>
                <AddIcon />
            </Fab>
            {fixedScheduleList}
        </React.Fragment>
    )
};

export default fixedScheduleList;