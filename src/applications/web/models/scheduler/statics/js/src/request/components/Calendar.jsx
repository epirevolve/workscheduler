import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import CalendarCell from './CalendarCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const headerCss = css({
    border: '.1rem solid #dee2e6',
    boxSizing: 'content-box',
    textAlign: 'center',
    fontSize: 'larger'
});

const redHeaderCss = css({
    color: '#dc3545 !important'
},headerCss);

const blueHeaderCss = css({
    color: '#17a2b8 !important'
},headerCss);

import {mx3} from 'margin';

const calendar = ({ calendar, ...other }) => {
    const weeks = [];

    for (const [index1, week] of calendar.entries()) {
        const week_ = [];
        for (const [index2, day] of week.entries()) {
            week_.push(<CalendarCell key={`${index1}-${index2}`} day={day} {...other} />);
        }
        weeks.push(<Grid container key={`${index1}`}>{week_}</Grid>);
    }

    return (
        <div css={mx3}>
            <Grid container>
                <Grid item xs css={redHeaderCss}>Sun</Grid>
                <Grid item xs css={headerCss}>Mon</Grid>
                <Grid item xs css={headerCss}>Tue</Grid>
                <Grid item xs css={headerCss}>Wed</Grid>
                <Grid item xs css={headerCss}>Thu</Grid>
                <Grid item xs css={headerCss}>Fri</Grid>
                <Grid item xs css={blueHeaderCss}>Sat</Grid>
            </Grid>
            {weeks}
        </div>
    );
};

calendar.propTypes = {
    calendar: propTypes.array
};

export default calendar;