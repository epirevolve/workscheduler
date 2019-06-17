import React from 'react';

import Grid from '@material-ui/core/Grid';

import CalendarCell from './CalendarCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const headerCss = css({
    border: '.1rem solid #dee2e6',
});

const requestCalendar = ({ requestCalendar, ...other }) => {
    const weeks = [];

    for (const [index1, week] of requestCalendar.entries()) {
        const week_ = [];
        for (const [index2, day] of week.entries()) {
            week_.push(<CalendarCell key={`${index1}-${index2}`} day={day} {...other} />);
        }
        weeks.push(<Grid container key={`${index1}`}>{week_}</Grid>);
    }

    return (
        <div style={{ margin: "0 1rem" }}>
            <div className="cl">
                <Grid container className="cl-header">
                    <Grid item xs css={headerCss} className="cl-header-cell text-danger">Sun</Grid>
                    <Grid item xs css={headerCss}>Mon</Grid>
                    <Grid item xs css={headerCss}>Tue</Grid>
                    <Grid item xs css={headerCss} className="cl-header-cell">Wed</Grid>
                    <Grid item xs css={headerCss} className="cl-header-cell">Thu</Grid>
                    <Grid item xs css={headerCss} className="cl-header-cell">Fri</Grid>
                    <Grid item xs css={headerCss} className="cl-header-cell text-info">Sat</Grid>
                </Grid>
                <div className="cl-body">
                    {weeks}
                </div>
            </div>
        </div>
    );
};

export default requestCalendar;