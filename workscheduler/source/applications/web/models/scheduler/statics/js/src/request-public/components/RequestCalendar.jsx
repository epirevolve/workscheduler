import React from 'react'

import Grid from '@material-ui/core/Grid';

import CalendarCell from './CalendarCell'

const requestCalendar = ({ requestCalendar, ...other }) => {
    const weeks = [];

    for (let [index1, week] of requestCalendar.entries()) {
        let week_ = [];
        for (let [index2, day] of week.entries()) {
            week_.push(<CalendarCell key={`${index1}-${index2}`} day={day} {...other} />);
        }
        weeks.push(<Grid container key={`${index1}`}>{week_}</Grid>);
    }

    return (
        <div style={{ margin: "0 1rem" }}>
            <div className="cl">
                <Grid container className="cl-header">
                    <Grid item xs className="cl-header-cell text-danger">Sun</Grid>
                    <Grid item xs className="cl-header-cell">Mon</Grid>
                    <Grid item xs className="cl-header-cell">Tue</Grid>
                    <Grid item xs className="cl-header-cell">Wed</Grid>
                    <Grid item xs className="cl-header-cell">Thu</Grid>
                    <Grid item xs className="cl-header-cell">Fri</Grid>
                    <Grid item xs className="cl-header-cell text-info">Sat</Grid>
                </Grid>
                <div className="cl-body">
                    {weeks}
                </div>
            </div>
        </div>
    )
}

export default requestCalendar;