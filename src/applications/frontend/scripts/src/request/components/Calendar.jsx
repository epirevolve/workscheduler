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
}, headerCss);

const blueHeaderCss = css({
    color: '#17a2b8 !important'
}, headerCss);

import { mx3 } from 'margin';

const calendar = ({ monthlySetting, ...other }) => {
    const weeks = [];
    weeks.push([]);
    const firstDay = new Date(monthlySetting.year, monthlySetting.month, 1);
    if (firstDay.getDay() > 0) [...Array(firstDay).keys()].map((i) => weeks[weeks.length - 1].push(<></>));
    for (const [ index, daySetting ] of monthlySetting.days.entries()) {
        const currentDate = new Date(monthlySetting.year, monthlySetting.month, daySetting.day);
        if (currentDate.getDay() == 0) weeks.push([]);
        weeks[weeks.length - 1].push(<CalendarCell key={index} daySetting={daySetting} currentDate={currentDate} {...other} />);
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
            {weeks.map((x, i) => <Grid container key={i}>{x}</Grid>)}
        </div>
    );
};

calendar.propTypes = {
    monthlySetting: propTypes.object
};

export default calendar;