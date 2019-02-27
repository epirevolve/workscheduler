import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import FixedSchedule from './FixedSchedule';

const fixedScheduleList = ({ fixedSchedules, handleAppend, handleRemove, onTitleChange,
    onDateChange, onAtFromChange, onAtToChange, onParticipantChange }) => {
    const fixedScheduleList = [];
    for (let fixedSchedule of fixedSchedules) {
        fixedScheduleList.push(
        <Grid item xs={12} sm={3} key={fixedSchedule.id} className="mr-4">
            <FixedSchedule fixedSchedule={fixedSchedule}
                handleRemove={handleRemove(fixedSchedule.id)} onTitleChange={onTitleChange(fixedSchedule.id)}
                onDateChange={onDateChange(fixedSchedule.id)} onAtFromChange={onAtFromChange(fixedSchedule.id)}
                onAtToChange={onAtToChange(fixedSchedule.id)} onParticipantChange={onParticipantChange(fixedSchedule.id)} />
        </Grid>)
    }

    return (
        <div className="my-4">
            <Fab color="primary" aria-label="Append" className="add-fixed-schedule" onClick={handleAppend}>
                <AddIcon />
            </Fab>
            <Grid container>
                {fixedScheduleList}
            </Grid>
        </div>
    )
};
    
export default fixedScheduleList;