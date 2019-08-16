import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

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

const margin10Css = css({
    margin: '10rem'
});

import { mx3 } from 'margin';

const calendar = ({ monthlySetting, ...other }) => {
    if (!monthlySetting.isPublished)
        return (<Typography variant="h5" css={margin10Css}>Sorry, this month setting is not published yet...</Typography>);
    if (monthlySetting.isFixed)
        return (<Typography variant="h5" css={margin10Css}>Sorry, this month schedule has already fixed. Please ask to your manager.</Typography>);
    const weeks = [];
    weeks.push([]);
    const firstDay = new Date(monthlySetting.year, monthlySetting.month-1, 1).getDay();
    if (firstDay > 0) [...Array(firstDay).keys()].map((i) => weeks[weeks.length - 1].push(<CalendarCell key={i} {...other} />));
    for (const [ index, daySetting ] of monthlySetting.days.entries()) {
        const currentDate = new Date(monthlySetting.year, monthlySetting.month-1, daySetting.day);
        if (currentDate.getDay() == 0) weeks.push([]);
        weeks[weeks.length - 1].push(<CalendarCell key={index+firstDay} daySetting={daySetting} currentDate={currentDate} {...other} />);
    }
    const lastRowCellCount = weeks[weeks.length - 1].length;
    for (const i in [...Array(7 - lastRowCellCount)]) weeks[weeks.length - 1].push(<CalendarCell key={i+41} {...other} />);
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