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
        <Grid item xs={12} sm={3} key={fixedSchedule.id}>
            <FixedSchedule fixedSchedule={fixedSchedule}
                handleRemove={handleRemove} onTitleChange={onTitleChange} onDateChange={onDateChange}
                onAtFromChange={onAtFromChange} onAtToChange={onAtToChange} onParticipantChange={onParticipantChange} />
        </Grid>)
    }

    return (
        <div style={{ margin:'1rem' }}>
            <Grid container spacing={24}>
                <Fab color="primary" aria-label="Append" onClick={handleAppend}>
                    <AddIcon />
                </Fab>
                {fixedScheduleList}
            </Grid>
        </div>
    )
};
    
export default fixedScheduleList;